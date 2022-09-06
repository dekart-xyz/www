---
title: "Amazon ECS"
description: "Example of deploying Dekart to Amazon Elastic Container Service (ECS) with Terraform."
draft: false
weight: 2
images: []
menu:
  docs:
    parent: "self-hosting"
---

## Prerequisites

* AWS Credentials and Terraform installed
* Route 53 zone where Dekart will be hosted in subdomains
* Mapbox Token
* Athena Catalog, <a href="https://aws.amazon.com/blogs/big-data/querying-openstreetmap-with-amazon-athena/" target="_blank">example adding OpenStreetMap</a>
* Cognito User Pool, <a href="https://beabetterdev.com/2021/08/16/how-to-add-google-social-sign-on-to-your-amazon-cognito-user-pool/" target="_blank">example with Cognito and Google SSO</a>

## Resources

Resources created in this guide

* network configuration (VPC, public and private subnets)
* security groups
* roles
* RDS db instance
* S3 bucket (for query storage and results cache)
* load balancer including HTTPS and SSO with Cognito
* ECS cluster, service, and task running on FARGATE

## Setup with Terraform

### Basics

Before we can start talking to an AWS account, we have to set up the Terraform provider:

```tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}
```

This is an example, so no terraform backend configuration.

### Network

Here we will set up as an example VPC with public and private networks in 2 availability zones. This setup following best practices described in <a href="https://aws.amazon.com/de/blogs/compute/task-networking-in-aws-fargate/" target="_blank">Task Networking in AWS Fargate</a>. Note that in the private subnet, outbound traffic has to go through a NAT gateway. AWS charges a considerable cost for NAT per hour, plus traffic. Dekart considerable amount of traffics in form of query results. Instead, we keep tasks in the public subnet and only the RDS instance in the private subnet. This setup does not require NAT configuration.

Example VPC setup:

```
resource "aws_vpc" "main" {
  cidr_block = "172.31.0.0/16"
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

data "aws_availability_zones" "available" {
  state = "available"
}
```

Public and private subnets:

```
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(["172.31.0.0/24", "172.31.1.0/24"], count.index)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  count             = 2
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(["172.31.2.0/24", "172.31.3.0/24"], count.index)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  count             = 2
}

```

Route public subnet via internet gateway:

```
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "public" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public.id
}
```

### Security Groups

Private security groups will let ECS Task, RDS db instance and Load Balancer to connect to each other. We also allow outbound traffic, so Docker images can be fetched.

```
# let the ecs, rds and alb to connect to each other
resource "aws_security_group" "dekart_private" {
  name   = "${var.dekart_deployment_name}-private"
  vpc_id = aws_vpc.main.id

  # connection within the group
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }

  # connecting to outside
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  # https://github.com/hashicorp/terraform-provider-aws/issues/265
  lifecycle { create_before_destroy = true }
}
```
Note the lifecycle rule necessary for security groups because of known issue <a href="https://github.com/hashicorp/terraform-provider-aws/issues/265" target="_blank">Destroying Security Groups Takes Forever with Attached SG</a>

Load balancer security group allows inbound traffic.
```
# allow connections to load balancer
resource "aws_security_group" "dekart_alb" {
  name   = "${var.dekart_deployment_name}-alb"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol         = "tcp"
    from_port        = 80
    to_port          = 80
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    protocol         = "tcp"
    from_port        = 443
    to_port          = 443
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  lifecycle { create_before_destroy = true }
}
```

### S3 bucket

Bucket to store queries and cache query results
```
resource "aws_s3_bucket" "dekart_output" {
  bucket = "${var.dekart_deployment_name}-output"
}
```

### Roles

Ecs task role requires access to output S3 bucket and sufficient access to run Athena jobs.

```
resource "aws_iam_role" "dekart_task" {
  name = "${var.dekart_deployment_name}-task"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow",
        Action = "sts:AssumeRole",
        Sid    = "",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
  inline_policy {
    name = "${var.dekart_deployment_name}-task-policy"
    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [
        {
          Effect = "Allow",
          Action = [
            "s3:*"
          ]
          Resource = [
            aws_s3_bucket.dekart_output.arn,
            "${aws_s3_bucket.dekart_output.arn}/*",
          ]
        },
        {
          Effect = "Allow",
          Action = [
            "athena:CancelQueryExecution",
            "athena:Get*",
            "athena:StartQueryExecution",
            "athena:StopQueryExecution",
            "glue:Get*",
          ],
          Resource = [
            "*"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "s3:ListBucket",
            "s3:GetBucketLocation",
            "s3:ListAllMyBuckets"
          ],
          "Resource" : [
            "*"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "lakeformation:GetDataAccess"
          ],
          "Resource" : [
            "*"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "s3:GetObject"
          ],
          "Resource" : flatten([
            [for bucket in var.athena_s3_data_source : "arn:aws:s3:::${bucket}"]
          ])
        },
      ]
    })
  }
}
```

Ecs execution role:

```
resource "aws_iam_role" "dekart_execution" {
  name = "${var.dekart_deployment_name}-execution"
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
  ]
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow",
        Action = "sts:AssumeRole",
        Sid    = "",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
}
```

### RDS

Generate password and store it in secret manager:

```
resource "random_password" "dekart_rds" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "dekart_rds" {
  name = "${var.dekart_deployment_name}-rds"
}

resource "aws_secretsmanager_secret_version" "dekart_rds" {
  secret_id     = aws_secretsmanager_secret.dekart_rds.id
  secret_string = random_password.dekart_rds.result
  lifecycle {
    ignore_changes = [
      secret_string
    ]
  }
}
```

Subnet group

```
resource "aws_db_subnet_group" "dekart_rds" {
  name       = "${var.dekart_deployment_name}-rds"
  subnet_ids = aws_subnet.private.*.id
}
```

Example DB instance configuration. It does not follow all the best practices in terms to back up and protection from deletion.

```
resource "aws_db_instance" "dekart" {
  identifier                  = var.dekart_deployment_name
  allocated_storage           = 20 # min size for gp2 storage_type type
  storage_type                = "gp2"
  engine                      = "postgres"
  engine_version              = "14.1"
  instance_class              = "db.t3.micro"
  db_name                     = var.dekart_rds_db_name
  username                    = var.dekart_rds_username
  password                    = aws_secretsmanager_secret_version.dekart_rds.secret_string
  allow_major_version_upgrade = false
  auto_minor_version_upgrade  = true
  port                        = 5432
  publicly_accessible         = false
  storage_encrypted           = true
  vpc_security_group_ids      = [aws_security_group.dekart_private.id]
  db_subnet_group_name        = aws_db_subnet_group.dekart_rds.name
  skip_final_snapshot         = true

  lifecycle {
    ignore_changes = [
      password
    ]
  }
}
```

### Load Balancer

Create a load balancer and target group. In real configuration, you may use already existing balancer:

```
resource "aws_alb" "dekart" {
  name               = var.dekart_deployment_name
  load_balancer_type = "application"
  security_groups    = [aws_security_group.dekart_private.id, aws_security_group.dekart_alb.id]
  subnets            = aws_subnet.public.*.id
}

resource "aws_alb_target_group" "dekart" {
  name        = var.dekart_deployment_name
  port        = "8080"
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
}
```

DNS zone record:

```
data "aws_route53_zone" "main" {
  name = var.zone_name
}

resource "aws_route53_record" "dekart" {
  name    = "${var.dekart_deployment_name}.${data.aws_route53_zone.main.name}"
  zone_id = data.aws_route53_zone.main.zone_id
  type    = "A"

  alias {
    name                   = aws_alb.dekart.dns_name
    zone_id                = aws_alb.dekart.zone_id
    evaluate_target_health = false
  }
}
```

ACM certificate for HTTPS with validation over DNS

```
resource "aws_acm_certificate" "dekart" {

  domain_name       = aws_route53_record.dekart.name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "dekart_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.dekart.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_record.dekart.zone_id
}

resource "aws_acm_certificate_validation" "dekart" {
  certificate_arn         = aws_acm_certificate.dekart.arn
  validation_record_fqdns = [for record in aws_route53_record.dekart_certificate_validation : record.fqdn]
}

```

Listeners for HTTP and HTTPS requests:

```
resource "aws_alb_listener" "dekart_http" {
  load_balancer_arn = aws_alb.dekart.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "dekart_https" {
  load_balancer_arn = aws_alb.dekart.arn
  port              = 443
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = aws_acm_certificate.dekart.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.dekart.arn
  }
}
```


Load balancer rule with Cognito authentication. For this configuration, you need to create a Cognito user pool. Check this example for user pool configuration <a href="https://beabetterdev.com/2021/08/16/how-to-add-google-social-sign-on-to-your-amazon-cognito-user-pool/">How to add Google Social Sign On To Your Amazon Cognito User Pool</a>

```
resource "aws_alb_listener_rule" "dekart_listener_rule" {

  listener_arn = aws_alb_listener.dekart_https.arn

  action {
    type = "authenticate-cognito"

    authenticate_cognito {
      scope               = "email openid"
      user_pool_arn       = var.user_pool_arn
      user_pool_client_id = var.user_pool_client_id
      user_pool_domain    = var.user_pool_domain
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.dekart.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}
```

### ECS

Optional, Cloud Watch log group configuration

```
resource "aws_cloudwatch_log_group" "dekart" {
  name              = var.dekart_deployment_name
  retention_in_days = 7
}
```

ECS task for Dekart. In this example, we configure Dekart to work with Amazon Athena. See <a href="/docs/configuration/environment-variables/">environment variables documentation</a> for details:

```
resource "aws_ecs_task_definition" "dekart" {
  family                   = "dekart"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  task_role_arn            = aws_iam_role.dekart_task.arn
  execution_role_arn       = aws_iam_role.dekart_execution.arn
  container_definitions    = <<TASK_DEFINITION
[
    {
       "name": "${var.dekart_deployment_name}",
       "image": "dekartxyz/dekart:${var.dekart_version}",
       "portmappings": [
          {
            "hostport": 8080,
            "protocol": "tcp",
            "containerport": 8080
          }
        ],
       "environment": [
          {
             "name": "AWS_REGION",
             "value": "${var.region}"
          },
          {
             "name": "DEKART_POSTGRES_HOST",
             "value": "${aws_db_instance.dekart.address}"
          },
          {
             "name": "DEKART_POSTGRES_PORT",
             "value": "${aws_db_instance.dekart.port}"
          },
          {
             "name": "DEKART_POSTGRES_DB",
             "value": "${aws_db_instance.dekart.db_name}"
          },
          {
             "name": "DEKART_POSTGRES_USER",
             "value": "dekart"
          },
          {
             "name": "DEKART_POSTGRES_PASSWORD",
             "value": "${aws_secretsmanager_secret_version.dekart_rds.secret_string}"
          },
          {
             "name": "DEKART_STORAGE",
             "value": "S3"
          },
          {
             "name": "DEKART_DATASOURCE",
             "value": "ATHENA"
          },
          {
             "name": "DEKART_CLOUD_STORAGE_BUCKET",
             "value": "${aws_s3_bucket.dekart_output.id}"
          },
          {
             "name": "DEKART_ATHENA_CATALOG",
             "value": "${var.athena_catalog}"
          },
          {
             "name": "DEKART_ATHENA_S3_OUTPUT_LOCATION",
             "value": "${aws_s3_bucket.dekart_output.id}"
          },
          {
             "name": "DEKART_MAPBOX_TOKEN",
             "value": "${var.mapbox_token}"
          }
       ],
       "logconfiguration": {
          "logdriver": "awslogs",
          "secretoptions": null,
          "options": {
             "awslogs-group": "${aws_cloudwatch_log_group.dekart.name}",
             "awslogs-region": "${var.region}",
             "awslogs-stream-prefix": "dekart"
          }
       }
    }
 ]
   TASK_DEFINITION
}
```

ECS cluster configuration:

```
resource "aws_ecs_cluster" "dekart" {
  name = var.dekart_deployment_name
}
```

Finally, ECS service configuration. For cost efficiency, we launch this service using FARGATE. Currently, Dekart does not support horizontal scaling, so we need to set `desired_count = 1`.

Because we avoid creating NAT and proxy query results through it, we need to put task in the public subnet. Task also needs a public IP address in order to make outbound requests like fetch docker image. However, as it is part of the private security group, inbound traffic is not allowed to the task. The only way to access it is via load balancer. 

```
resource "aws_ecs_service" "dekart" {
  name                 = var.dekart_deployment_name
  cluster              = aws_ecs_cluster.dekart.id
  task_definition      = "${aws_ecs_task_definition.dekart.family}:${aws_ecs_task_definition.dekart.revision}"
  desired_count        = 1 # important, dekart does not scale horizontally
  force_new_deployment = true
  launch_type          = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.dekart_private.id]
    subnets          = aws_subnet.public.*.id
    assign_public_ip = true # it is necessarily to access Internet from task without NAT
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.dekart.arn
    container_name   = var.dekart_deployment_name
    container_port   = 8080
  }
}

```

## Complete example

Here you can find <a href="https://github.com/dekart-xyz/dekart/tree/main/install/ecs" target="_blank">complete example</a>

To run it:

* create `./terraform.tfvars.json`
* define required variables, see `./variables.tf` for details
* run `terraform apply`
