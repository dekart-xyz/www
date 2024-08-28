var suggestions=document.getElementById("suggestions"),userinput=document.getElementById("userinput");document.addEventListener("keydown",inputFocus);function inputFocus(e){e.keyCode===191&&(e.preventDefault(),userinput.focus()),e.keyCode===27&&(userinput.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.querySelectorAll("a"),o=[...s],t=o.indexOf(document.activeElement);let n=0;e.keyCode===38?(e.preventDefault(),n=t>0?t-1:0,s[n].focus()):e.keyCode===40&&(e.preventDefault(),n=t+1<o.length?t+1:t,s[n].focus())}(function(){var e=new FlexSearch({preset:"score",cache:!0,doc:{id:"id",field:["title","description","content"],store:["href","title","description"]}}),n=[{id:0,href:"https://dekart.xyz/docs/self-hosting/app-engine/",title:"Google App Engine",description:"Deploying Dekart to Google App Engine",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Project\u003c/li\u003e
\u003cli\u003eBigQuery API Enabled\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eIn this guide you will create:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eCloud SQL DB\u003c/li\u003e
\u003cli\u003eCloud Storage Bucket\u003c/li\u003e
\u003cli\u003eApp Engine App (Flexible environment)\u003c/li\u003e
\u003cli\u003eConfigure Access to specific Google Accounts with Google IAP\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="steps"\u003eSteps\u003c/h2\u003e
\u003col\u003e
\u003cli\u003eCreate db instance\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003egcloud sql instances create \u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDB_INSTANCE_NAME\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e    --database-version\u003cspan class="o"\u003e=\u003c/span\u003ePOSTGRES_12 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e    --tier\u003cspan class="o"\u003e=\u003c/span\u003edb-f1-micro\u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e    --region\u003cspan class="o"\u003e=\u003c/span\u003eeurope-west1
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003col start="2"\u003e
\u003cli\u003eCreate database\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003egcloud sql databases create dekart --instance=\${DB_INSTANCE_NAME}
\u003c/code\u003e\u003c/pre\u003e\u003col start="3"\u003e
\u003cli\u003eSet password; can be not secret, because there is one more layer of encryption and authorization in Cloud SQL\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003egcloud sql users set-password postgres --instance=\${DB_INSTANCE_NAME} --password=dekart
\u003c/code\u003e\u003c/pre\u003e\u003col start="4"\u003e
\u003cli\u003eCreate storage\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003egsutil mb -b on -l europe-west1 gs://\${BUCKET}/
\u003c/code\u003e\u003c/pre\u003e\u003col start="5"\u003e
\u003cli\u003eCreate App Engine App\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003egcloud app create --region=europe-west
\u003c/code\u003e\u003c/pre\u003e\u003col start="6"\u003e
\u003cli\u003e
\u003cp\u003eCreate \u003ca href="https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/Dockerfile"\u003eDockerfile\u003c/a\u003e\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eCreate \u003ca href="https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/app.example.yaml"\u003eapp.yaml\u003c/a\u003e\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eDeploy app\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003egcloud app deploy app.yaml
\u003c/code\u003e\u003c/pre\u003e\u003col start="9"\u003e
\u003cli\u003e\u003ca href="https://cloud.google.com/iap/docs/app-engine-quickstart"\u003eConfigure Google IAP\u003c/a\u003e (works only with web console)\u003c/li\u003e
\u003c/ol\u003e
\u003ch2 id="example"\u003eExample\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eAll gcloud commands in \u003ca href="https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/Makefile"\u003eMakefile\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eFull \u003ca href="https://github.com/dekart-xyz/dekart/tree/main/install/app-engine"\u003eexample\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eConfiguration \u003ca href="/docs/configuration/environment-variables/"\u003edetails\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:1,href:"https://dekart.xyz/docs/self-hosting/aws-ecs-terraform/",title:"Amazon ECS",description:"Example of deploying Dekart to Amazon Elastic Container Service (ECS) with Terraform.",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eAWS Credentials and Terraform installed\u003c/li\u003e
\u003cli\u003eRoute 53 zone where Dekart will be hosted in subdomains\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003cli\u003eAthena Catalog, \u003ca href="https://aws.amazon.com/blogs/big-data/querying-openstreetmap-with-amazon-athena/" target="_blank"\u003eexample adding OpenStreetMap\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eCognito User Pool, \u003ca href="https://beabetterdev.com/2021/08/16/how-to-add-google-social-sign-on-to-your-amazon-cognito-user-pool/" target="_blank"\u003eexample with Cognito and Google SSO\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="resources"\u003eResources\u003c/h2\u003e
\u003cp\u003eResources created in this guide\u003c/p\u003e
\u003cul\u003e
\u003cli\u003enetwork configuration (VPC, public and private subnets)\u003c/li\u003e
\u003cli\u003esecurity groups\u003c/li\u003e
\u003cli\u003eroles\u003c/li\u003e
\u003cli\u003eRDS db instance\u003c/li\u003e
\u003cli\u003eS3 bucket (for query storage and results cache)\u003c/li\u003e
\u003cli\u003eload balancer including HTTPS and SSO with Cognito\u003c/li\u003e
\u003cli\u003eECS cluster, service, and task running on FARGATE\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="setup-with-terraform"\u003eSetup with Terraform\u003c/h2\u003e
\u003ch3 id="basics"\u003eBasics\u003c/h3\u003e
\u003cp\u003eBefore we can start talking to an AWS account, we have to set up the Terraform provider:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-tf" data-lang="tf"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="nx"\u003eterraform\u003c/span\u003e \u003cspan class="p"\u003e{\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e  \u003cspan class="nx"\u003erequired_providers\u003c/span\u003e \u003cspan class="p"\u003e{\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e    \u003cspan class="na"\u003eaws\u003c/span\u003e = \u003cspan class="p"\u003e{\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e      \u003cspan class="na"\u003esource\u003c/span\u003e  = \u003cspan class="s2"\u003e\u0026#34;hashicorp/aws\u0026#34;\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e      \u003cspan class="na"\u003eversion\u003c/span\u003e = \u003cspan class="s2"\u003e\u0026#34;~\u0026gt; 4.16\u0026#34;\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e    \u003cspan class="p"\u003e}\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e  \u003cspan class="p"\u003e}\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e  \u003cspan class="na"\u003erequired_version\u003c/span\u003e = \u003cspan class="s2"\u003e\u0026#34;\u0026gt;= 1.2.0\u0026#34;\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="p"\u003e}\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="kr"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="kr"\u003eprovider\u003c/span\u003e \u003cspan class="s2"\u003e\u0026#34;aws\u0026#34;\u003c/span\u003e \u003cspan class="p"\u003e{\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e  \u003cspan class="na"\u003eregion\u003c/span\u003e = \u003cspan class="nb"\u003evar\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="nx"\u003eregion\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="p"\u003e}\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003eThis is an example, so no terraform backend configuration.\u003c/p\u003e
\u003ch3 id="network"\u003eNetwork\u003c/h3\u003e
\u003cp\u003eHere we will set up as an example VPC with public and private networks in 2 availability zones. This setup following best practices described in \u003ca href="https://aws.amazon.com/de/blogs/compute/task-networking-in-aws-fargate/" target="_blank"\u003eTask Networking in AWS Fargate\u003c/a\u003e. Note that in the private subnet, outbound traffic has to go through a NAT gateway. AWS charges a considerable cost for NAT per hour, plus traffic. Dekart considerable amount of traffics in form of query results. Instead, we keep tasks in the public subnet and only the RDS instance in the private subnet. This setup does not require NAT configuration.\u003c/p\u003e
\u003cp\u003eExample VPC setup:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_vpc\u0026#34; \u0026#34;main\u0026#34; {
  cidr_block = \u0026#34;172.31.0.0/16\u0026#34;
}

resource \u0026#34;aws_internet_gateway\u0026#34; \u0026#34;main\u0026#34; {
  vpc_id = aws_vpc.main.id
}

data \u0026#34;aws_availability_zones\u0026#34; \u0026#34;available\u0026#34; {
  state = \u0026#34;available\u0026#34;
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003ePublic and private subnets:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_subnet\u0026#34; \u0026#34;private\u0026#34; {
  vpc_id            = aws_vpc.main.id
  cidr_block        = element([\u0026#34;172.31.0.0/24\u0026#34;, \u0026#34;172.31.1.0/24\u0026#34;], count.index)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  count             = 2
}

resource \u0026#34;aws_subnet\u0026#34; \u0026#34;public\u0026#34; {
  vpc_id            = aws_vpc.main.id
  cidr_block        = element([\u0026#34;172.31.2.0/24\u0026#34;, \u0026#34;172.31.3.0/24\u0026#34;], count.index)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  count             = 2
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eRoute public subnet via internet gateway:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_route_table\u0026#34; \u0026#34;public\u0026#34; {
  vpc_id = aws_vpc.main.id
}

resource \u0026#34;aws_route\u0026#34; \u0026#34;public\u0026#34; {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = \u0026#34;0.0.0.0/0\u0026#34;
  gateway_id             = aws_internet_gateway.main.id
}

resource \u0026#34;aws_route_table_association\u0026#34; \u0026#34;public\u0026#34; {
  count          = 2
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public.id
}
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="security-groups"\u003eSecurity Groups\u003c/h3\u003e
\u003cp\u003ePrivate security groups will let ECS Task, RDS db instance and Load Balancer to connect to each other. We also allow outbound traffic, so Docker images can be fetched.\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003e# let the ecs, rds and alb to connect to each other
resource \u0026#34;aws_security_group\u0026#34; \u0026#34;dekart_private\u0026#34; {
  name   = \u0026#34;\${var.dekart_deployment_name}-private\u0026#34;
  vpc_id = aws_vpc.main.id

  # connection within the group
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = \u0026#34;-1\u0026#34;
    self      = true
  }

  # connecting to outside
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = \u0026#34;-1\u0026#34;
    cidr_blocks      = [\u0026#34;0.0.0.0/0\u0026#34;]
    ipv6_cidr_blocks = [\u0026#34;::/0\u0026#34;]
  }

  # https://github.com/hashicorp/terraform-provider-aws/issues/265
  lifecycle { create_before_destroy = true }
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eNote the lifecycle rule necessary for security groups because of known issue \u003ca href="https://github.com/hashicorp/terraform-provider-aws/issues/265" target="_blank"\u003eDestroying Security Groups Takes Forever with Attached SG\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eLoad balancer security group allows inbound traffic.\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003e# allow connections to load balancer
resource \u0026#34;aws_security_group\u0026#34; \u0026#34;dekart_alb\u0026#34; {
  name   = \u0026#34;\${var.dekart_deployment_name}-alb\u0026#34;
  vpc_id = aws_vpc.main.id

  ingress {
    protocol         = \u0026#34;tcp\u0026#34;
    from_port        = 80
    to_port          = 80
    cidr_blocks      = [\u0026#34;0.0.0.0/0\u0026#34;]
    ipv6_cidr_blocks = [\u0026#34;::/0\u0026#34;]
  }

  ingress {
    protocol         = \u0026#34;tcp\u0026#34;
    from_port        = 443
    to_port          = 443
    cidr_blocks      = [\u0026#34;0.0.0.0/0\u0026#34;]
    ipv6_cidr_blocks = [\u0026#34;::/0\u0026#34;]
  }

  lifecycle { create_before_destroy = true }
}
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="s3-bucket"\u003eS3 bucket\u003c/h3\u003e
\u003cp\u003eBucket to store queries and cache query results\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_s3_bucket\u0026#34; \u0026#34;dekart_output\u0026#34; {
  bucket = \u0026#34;\${var.dekart_deployment_name}-output\u0026#34;
}
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="roles"\u003eRoles\u003c/h3\u003e
\u003cp\u003eEcs task role requires access to output S3 bucket and sufficient access to run Athena jobs.\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_iam_role\u0026#34; \u0026#34;dekart_task\u0026#34; {
  name = \u0026#34;\${var.dekart_deployment_name}-task\u0026#34;
  assume_role_policy = jsonencode({
    Version = \u0026#34;2012-10-17\u0026#34;
    Statement = [
      {
        Effect = \u0026#34;Allow\u0026#34;,
        Action = \u0026#34;sts:AssumeRole\u0026#34;,
        Sid    = \u0026#34;\u0026#34;,
        Principal = {
          Service = \u0026#34;ecs-tasks.amazonaws.com\u0026#34;
        }
      },
    ]
  })
  inline_policy {
    name = \u0026#34;\${var.dekart_deployment_name}-task-policy\u0026#34;
    policy = jsonencode({
      Version = \u0026#34;2012-10-17\u0026#34;,
      Statement = [
        {
          Effect = \u0026#34;Allow\u0026#34;,
          Action = [
            \u0026#34;s3:*\u0026#34;
          ]
          Resource = [
            aws_s3_bucket.dekart_output.arn,
            \u0026#34;\${aws_s3_bucket.dekart_output.arn}/*\u0026#34;,
          ]
        },
        {
          Effect = \u0026#34;Allow\u0026#34;,
          Action = [
            \u0026#34;athena:CancelQueryExecution\u0026#34;,
            \u0026#34;athena:Get*\u0026#34;,
            \u0026#34;athena:StartQueryExecution\u0026#34;,
            \u0026#34;athena:StopQueryExecution\u0026#34;,
            \u0026#34;glue:Get*\u0026#34;,
          ],
          Resource = [
            \u0026#34;*\u0026#34;
          ]
        },
        {
          \u0026#34;Effect\u0026#34; : \u0026#34;Allow\u0026#34;,
          \u0026#34;Action\u0026#34; : [
            \u0026#34;s3:ListBucket\u0026#34;,
            \u0026#34;s3:GetBucketLocation\u0026#34;,
            \u0026#34;s3:ListAllMyBuckets\u0026#34;
          ],
          \u0026#34;Resource\u0026#34; : [
            \u0026#34;*\u0026#34;
          ]
        },
        {
          \u0026#34;Effect\u0026#34; : \u0026#34;Allow\u0026#34;,
          \u0026#34;Action\u0026#34; : [
            \u0026#34;lakeformation:GetDataAccess\u0026#34;
          ],
          \u0026#34;Resource\u0026#34; : [
            \u0026#34;*\u0026#34;
          ]
        },
        {
          \u0026#34;Effect\u0026#34; : \u0026#34;Allow\u0026#34;,
          \u0026#34;Action\u0026#34; : [
            \u0026#34;s3:GetObject\u0026#34;
          ],
          \u0026#34;Resource\u0026#34; : flatten([
            [for bucket in var.athena_s3_data_source : \u0026#34;arn:aws:s3:::\${bucket}\u0026#34;]
          ])
        },
      ]
    })
  }
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eEcs execution role:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_iam_role\u0026#34; \u0026#34;dekart_execution\u0026#34; {
  name = \u0026#34;\${var.dekart_deployment_name}-execution\u0026#34;
  managed_policy_arns = [
    \u0026#34;arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy\u0026#34;,
  ]
  assume_role_policy = jsonencode({
    Version = \u0026#34;2012-10-17\u0026#34;
    Statement = [
      {
        Effect = \u0026#34;Allow\u0026#34;,
        Action = \u0026#34;sts:AssumeRole\u0026#34;,
        Sid    = \u0026#34;\u0026#34;,
        Principal = {
          Service = \u0026#34;ecs-tasks.amazonaws.com\u0026#34;
        }
      },
    ]
  })
}
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="rds"\u003eRDS\u003c/h3\u003e
\u003cp\u003eGenerate password and store it in secret manager:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;random_password\u0026#34; \u0026#34;dekart_rds\u0026#34; {
  length  = 16
  special = false
}

resource \u0026#34;aws_secretsmanager_secret\u0026#34; \u0026#34;dekart_rds\u0026#34; {
  name = \u0026#34;\${var.dekart_deployment_name}-rds\u0026#34;
}

resource \u0026#34;aws_secretsmanager_secret_version\u0026#34; \u0026#34;dekart_rds\u0026#34; {
  secret_id     = aws_secretsmanager_secret.dekart_rds.id
  secret_string = random_password.dekart_rds.result
  lifecycle {
    ignore_changes = [
      secret_string
    ]
  }
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eSubnet group\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_db_subnet_group\u0026#34; \u0026#34;dekart_rds\u0026#34; {
  name       = \u0026#34;\${var.dekart_deployment_name}-rds\u0026#34;
  subnet_ids = aws_subnet.private.*.id
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eExample DB instance configuration. It does not follow all the best practices in terms to back up and protection from deletion.\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_db_instance\u0026#34; \u0026#34;dekart\u0026#34; {
  identifier                  = var.dekart_deployment_name
  allocated_storage           = 20 # min size for gp2 storage_type type
  storage_type                = \u0026#34;gp2\u0026#34;
  engine                      = \u0026#34;postgres\u0026#34;
  engine_version              = \u0026#34;14.1\u0026#34;
  instance_class              = \u0026#34;db.t3.micro\u0026#34;
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
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="load-balancer"\u003eLoad Balancer\u003c/h3\u003e
\u003cp\u003eCreate a load balancer and target group. In real configuration, you may use already existing balancer:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_alb\u0026#34; \u0026#34;dekart\u0026#34; {
  name               = var.dekart_deployment_name
  load_balancer_type = \u0026#34;application\u0026#34;
  security_groups    = [aws_security_group.dekart_private.id, aws_security_group.dekart_alb.id]
  subnets            = aws_subnet.public.*.id
}

resource \u0026#34;aws_alb_target_group\u0026#34; \u0026#34;dekart\u0026#34; {
  name        = var.dekart_deployment_name
  port        = \u0026#34;8080\u0026#34;
  protocol    = \u0026#34;HTTP\u0026#34;
  vpc_id      = aws_vpc.main.id
  target_type = \u0026#34;ip\u0026#34;
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eDNS zone record:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003edata \u0026#34;aws_route53_zone\u0026#34; \u0026#34;main\u0026#34; {
  name = var.zone_name
}

resource \u0026#34;aws_route53_record\u0026#34; \u0026#34;dekart\u0026#34; {
  name    = \u0026#34;\${var.dekart_deployment_name}.\${data.aws_route53_zone.main.name}\u0026#34;
  zone_id = data.aws_route53_zone.main.zone_id
  type    = \u0026#34;A\u0026#34;

  alias {
    name                   = aws_alb.dekart.dns_name
    zone_id                = aws_alb.dekart.zone_id
    evaluate_target_health = false
  }
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eACM certificate for HTTPS with validation over DNS\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_acm_certificate\u0026#34; \u0026#34;dekart\u0026#34; {

  domain_name       = aws_route53_record.dekart.name
  validation_method = \u0026#34;DNS\u0026#34;

  lifecycle {
    create_before_destroy = true
  }
}

resource \u0026#34;aws_route53_record\u0026#34; \u0026#34;dekart_certificate_validation\u0026#34; {
  for_each = {
    for dvo in aws_acm_certificate.dekart.domain_validation_options : dvo.domain_name =\u0026gt; {
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

resource \u0026#34;aws_acm_certificate_validation\u0026#34; \u0026#34;dekart\u0026#34; {
  certificate_arn         = aws_acm_certificate.dekart.arn
  validation_record_fqdns = [for record in aws_route53_record.dekart_certificate_validation : record.fqdn]
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eListeners for HTTP and HTTPS requests:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_alb_listener\u0026#34; \u0026#34;dekart_http\u0026#34; {
  load_balancer_arn = aws_alb.dekart.arn
  port              = \u0026#34;80\u0026#34;
  protocol          = \u0026#34;HTTP\u0026#34;

  default_action {
    type = \u0026#34;redirect\u0026#34;

    redirect {
      port        = 443
      protocol    = \u0026#34;HTTPS\u0026#34;
      status_code = \u0026#34;HTTP_301\u0026#34;
    }
  }
}

resource \u0026#34;aws_alb_listener\u0026#34; \u0026#34;dekart_https\u0026#34; {
  load_balancer_arn = aws_alb.dekart.arn
  port              = 443
  protocol          = \u0026#34;HTTPS\u0026#34;

  ssl_policy      = \u0026#34;ELBSecurityPolicy-2016-08\u0026#34;
  certificate_arn = aws_acm_certificate.dekart.arn

  default_action {
    type             = \u0026#34;forward\u0026#34;
    target_group_arn = aws_alb_target_group.dekart.arn
  }
}
\u003c/code\u003e\u003c/pre\u003e\u003ch4 id="cognito-authentication"\u003eCognito authentication\u003c/h4\u003e
\u003cp\u003eLoad balancer rule with Cognito authentication. For this configuration, you need to create a Cognito user pool. Check this example for user pool configuration \u003ca href="https://beabetterdev.com/2021/08/16/how-to-add-google-social-sign-on-to-your-amazon-cognito-user-pool/"\u003eHow to add Google Social Sign On To Your Amazon Cognito User Pool\u003c/a\u003e\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_alb_listener_rule\u0026#34; \u0026#34;dekart_listener_rule\u0026#34; {

  listener_arn = aws_alb_listener.dekart_https.arn

  action {
    type = \u0026#34;authenticate-cognito\u0026#34;

    authenticate_cognito {
      scope               = \u0026#34;email openid\u0026#34;
      user_pool_arn       = var.user_pool_arn
      user_pool_client_id = var.user_pool_client_id
      user_pool_domain    = var.user_pool_domain
    }
  }

  action {
    type             = \u0026#34;forward\u0026#34;
    target_group_arn = aws_alb_target_group.dekart.arn
  }

  condition {
    path_pattern {
      values = [\u0026#34;/*\u0026#34;]
    }
  }
}
\u003c/code\u003e\u003c/pre\u003e\u003ch3 id="ecs"\u003eECS\u003c/h3\u003e
\u003cp\u003eOptional, Cloud Watch log group configuration\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_cloudwatch_log_group\u0026#34; \u0026#34;dekart\u0026#34; {
  name              = var.dekart_deployment_name
  retention_in_days = 7
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eECS task for Dekart. In this example, we configure Dekart to work with Amazon Athena. See \u003ca href="/docs/configuration/environment-variables/"\u003eenvironment variables documentation\u003c/a\u003e for details:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_ecs_task_definition\u0026#34; \u0026#34;dekart\u0026#34; {
  family                   = \u0026#34;dekart\u0026#34;
  requires_compatibilities = [\u0026#34;FARGATE\u0026#34;]
  network_mode             = \u0026#34;awsvpc\u0026#34;
  cpu                      = \u0026#34;256\u0026#34;
  memory                   = \u0026#34;512\u0026#34;
  task_role_arn            = aws_iam_role.dekart_task.arn
  execution_role_arn       = aws_iam_role.dekart_execution.arn
  container_definitions    = \u0026lt;\u0026lt;TASK_DEFINITION
[
    {
       \u0026#34;name\u0026#34;: \u0026#34;\${var.dekart_deployment_name}\u0026#34;,
       \u0026#34;image\u0026#34;: \u0026#34;dekartxyz/dekart:\${var.dekart_version}\u0026#34;,
       \u0026#34;portmappings\u0026#34;: [
          {
            \u0026#34;hostport\u0026#34;: 8080,
            \u0026#34;protocol\u0026#34;: \u0026#34;tcp\u0026#34;,
            \u0026#34;containerport\u0026#34;: 8080
          }
        ],
       \u0026#34;environment\u0026#34;: [
          {
             \u0026#34;name\u0026#34;: \u0026#34;AWS_REGION\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${var.region}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_POSTGRES_HOST\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_db_instance.dekart.address}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_POSTGRES_PORT\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_db_instance.dekart.port}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_POSTGRES_DB\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_db_instance.dekart.db_name}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_POSTGRES_USER\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;dekart\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_POSTGRES_PASSWORD\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_secretsmanager_secret_version.dekart_rds.secret_string}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_STORAGE\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;S3\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_DATASOURCE\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;ATHENA\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_CLOUD_STORAGE_BUCKET\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_s3_bucket.dekart_output.id}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_ATHENA_CATALOG\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${var.athena_catalog}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_ATHENA_S3_OUTPUT_LOCATION\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${aws_s3_bucket.dekart_output.id}\u0026#34;
          },
          {
             \u0026#34;name\u0026#34;: \u0026#34;DEKART_MAPBOX_TOKEN\u0026#34;,
             \u0026#34;value\u0026#34;: \u0026#34;\${var.mapbox_token}\u0026#34;
          }
       ],
       \u0026#34;logconfiguration\u0026#34;: {
          \u0026#34;logdriver\u0026#34;: \u0026#34;awslogs\u0026#34;,
          \u0026#34;secretoptions\u0026#34;: null,
          \u0026#34;options\u0026#34;: {
             \u0026#34;awslogs-group\u0026#34;: \u0026#34;\${aws_cloudwatch_log_group.dekart.name}\u0026#34;,
             \u0026#34;awslogs-region\u0026#34;: \u0026#34;\${var.region}\u0026#34;,
             \u0026#34;awslogs-stream-prefix\u0026#34;: \u0026#34;dekart\u0026#34;
          }
       }
    }
 ]
   TASK_DEFINITION
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eECS cluster configuration:\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_ecs_cluster\u0026#34; \u0026#34;dekart\u0026#34; {
  name = var.dekart_deployment_name
}
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eFinally, ECS service configuration. For cost efficiency, we launch this service using FARGATE. Currently, Dekart does not support horizontal scaling, so we need to set \u003ccode\u003edesired_count = 1\u003c/code\u003e.\u003c/p\u003e
\u003cp\u003eBecause we avoid creating NAT and proxy query results through it, we need to put task in the public subnet. Task also needs a public IP address in order to make outbound requests like fetch docker image. However, as it is part of the private security group, inbound traffic is not allowed to the task. The only way to access it is via load balancer.\u003c/p\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eresource \u0026#34;aws_ecs_service\u0026#34; \u0026#34;dekart\u0026#34; {
  name                 = var.dekart_deployment_name
  cluster              = aws_ecs_cluster.dekart.id
  task_definition      = \u0026#34;\${aws_ecs_task_definition.dekart.family}:\${aws_ecs_task_definition.dekart.revision}\u0026#34;
  desired_count        = 1 # important, dekart does not scale horizontally
  force_new_deployment = true
  launch_type          = \u0026#34;FARGATE\u0026#34;

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
\u003c/code\u003e\u003c/pre\u003e\u003ch2 id="complete-example"\u003eComplete example\u003c/h2\u003e
\u003cp\u003eHere you can find \u003ca href="https://github.com/dekart-xyz/dekart/tree/main/install/ecs" target="_blank"\u003ecomplete example\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eTo run it:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003ecreate \u003ccode\u003e./terraform.tfvars.json\u003c/code\u003e\u003c/li\u003e
\u003cli\u003edefine required variables, see \u003ccode\u003e./variables.tf\u003c/code\u003e for details\u003c/li\u003e
\u003cli\u003erun \u003ccode\u003eterraform apply\u003c/code\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:2,href:"https://dekart.xyz/docs/self-hosting/docker/",title:"Docker",description:"Running Dekart for BigQuery as in Docker",content:`\u003ch2 id="requirements"\u003eRequirements\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Storage or AWS S3 bucket for storing cache\u003c/li\u003e
\u003cli\u003ePostgreSQL or similar (Cloud SQL, Amazon RDS, etc)\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="supported-data-warehouses"\u003eSupported data warehouses\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eAmazon Athena\u003c/li\u003e
\u003cli\u003eGoogle BigQuery\u003c/li\u003e
\u003cli\u003eSnowflake\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="amazon-athena"\u003eAmazon Athena\u003c/h3\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003edocker run \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003ehost.docker.internal \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_STORAGE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eS3 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_DATASOURCE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eATHENA \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_ATHENA_CATALOG\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_ATHENA_CATALOG\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.16
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch3 id="google-bigquery"\u003eGoogle BigQuery\u003c/h3\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003edocker run \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -v \u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e:\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_STORAGE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eGCS \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_DATASOURCE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eBQ \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_BIGQUERY_PROJECT_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_BIGQUERY_PROJECT_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.16
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch3 id="snowflake"\u003eSnowflake\u003c/h3\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003edocker run -it --rm \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003ehost.docker.internal \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_STORAGE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eS3 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_DATASOURCE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eSNOWFLAKE \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_SNOWFLAKE_ACCOUNT_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_SNOWFLAKE_ACCOUNT_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_SNOWFLAKE_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_SNOWFLAKE_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_SNOWFLAKE_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_SNOWFLAKE_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.16
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch3 id="postgresql"\u003ePostgreSQL\u003c/h3\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003edocker run \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_REGION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_ACCESS_KEY_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eAWS_SECRET_ACCESS_KEY\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003ehost.docker.internal \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_STORAGE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eS3 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_DATASOURCE\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003ePG \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_DATA_CONNECTION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DATA_CONNECTION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.16
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch2 id="example"\u003eExample\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eRun with \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile"\u003eMakefile\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eSee details on \u003ca href="/docs/configuration/environment-variables"\u003eenvironment variables\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:3,href:"https://dekart.xyz/docs/self-hosting/docker-compose/",title:"Docker Compose",description:"Run Dekart locally with docker-compose",content:`\u003ch2 id="aws-athena"\u003eAWS Athena\u003c/h2\u003e
\u003ch3 id="prerequisites"\u003ePrerequisites\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eAWS Account\u003c/li\u003e
\u003cli\u003eAWS Athena Workspace\u003c/li\u003e
\u003cli\u003eAWS S3 bucket\u003c/li\u003e
\u003cli\u003ePostgreSQL\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="steps"\u003eSteps\u003c/h3\u003e
\u003col\u003e
\u003cli\u003eCopy \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml"\u003edocker-compose.yaml\u003c/a\u003e file\u003c/li\u003e
\u003cli\u003eCreate \u003ccode\u003e.env\u003c/code\u003e file\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eDEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
DEKART_ATHENA_CATALOG=
DEKART_ATHENA_S3_OUTPUT_LOCATION=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DEKART_CORS_ORIGIN=
\u003c/code\u003e\u003c/pre\u003e\u003col start="3"\u003e
\u003cli\u003eRun\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003edocker-compose  --env-file .env up dekart-athena
\u003c/code\u003e\u003c/pre\u003e\u003ch2 id="bigquery"\u003eBigQuery\u003c/h2\u003e
\u003ch3 id="prerequisites-1"\u003ePrerequisites\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Project\u003c/li\u003e
\u003cli\u003eBigQuery API Enabled\u003c/li\u003e
\u003cli\u003eCloud Storage Bucket\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="steps-1"\u003eSteps\u003c/h3\u003e
\u003col\u003e
\u003cli\u003eCopy \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml"\u003edocker-compose.yaml\u003c/a\u003e file\u003c/li\u003e
\u003cli\u003eCreate \u003ccode\u003e.env\u003c/code\u003e file\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eDEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
GOOGLE_APPLICATION_CREDENTIALS=
DEKART_CORS_ORIGIN=
\u003c/code\u003e\u003c/pre\u003e\u003col start="3"\u003e
\u003cli\u003eRun\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003edocker-compose  --env-file .env up dekart-bigquery
\u003c/code\u003e\u003c/pre\u003e\u003ch2 id="snowflake"\u003eSnowflake\u003c/h2\u003e
\u003ch3 id="prerequisites-2"\u003ePrerequisites\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eSnowflake Account and User\u003c/li\u003e
\u003cli\u003eAmazon S3 Bucket\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="steps-2"\u003eSteps\u003c/h3\u003e
\u003col\u003e
\u003cli\u003eCopy \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml"\u003edocker-compose.yaml\u003c/a\u003e file\u003c/li\u003e
\u003cli\u003eCreate \u003ccode\u003e.env\u003c/code\u003e file\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003eDEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
DEKART_SNOWFLAKE_ACCOUNT_ID=
DEKART_SNOWFLAKE_USER=
DEKART_SNOWFLAKE_PASSWORD=
DEKART_CORS_ORIGIN=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
\u003c/code\u003e\u003c/pre\u003e\u003col start="3"\u003e
\u003cli\u003eRun\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003edocker-compose  --env-file .env up dekart-snowflake
\u003c/code\u003e\u003c/pre\u003e`},{id:4,href:"https://dekart.xyz/docs/self-hosting/upgrade/",title:"Upgrade to new version",description:"How to upgrade and migration notes",content:`\u003cp\u003e\u003cdiv class="alert alert-primary" role="alert"\u003e
Before you begin: it is always recommended to back up your Postgres database before upgrading Dekart. On the first run, Dekart applies migrations to the database and you won't be able to downgrade.
\u003c/div\u003e\u003c/p\u003e
\u003cp\u003eFor all Docker-based deployments, update the docker tag, for example \u003ccode\u003edekartxyz/\u003c/code\u003edekart:0.15\u003ccode\u003e-\u0026gt;\u003c/code\u003edekartxyz/dekart:0.16\`\u003c/p\u003e
\u003ch2 id="migration-instructions"\u003eMigration instructions\u003c/h2\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.15\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.16\u003c/code\u003e\u003c/strong\u003e
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.14\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.15\u003c/code\u003e\u003c/strong\u003e
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.13\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.14\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eNo breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.12\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.13\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eNo breaking changes, just update the docker tag.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.11\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.12\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eConfigure \u003ccode\u003eDEKART_CORS_ORIGIN\u003c/code\u003e environment variable to ensure the security of your instance and prevent warnings in logs.\u003c/p\u003e
\u003cp\u003eThen redeploy application\u003c/p\u003e
`},{id:5,href:"https://dekart.xyz/docs/contributing/architecture-overview/",title:"Architecture",description:"Build Dekart from Source",content:`\u003ch2 id="overview"\u003eOverview\u003c/h2\u003e
\u003cp\u003e\u003ca href="./dekart-architecture-overview.png"\u003e\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_512x0_resize_box_3.png 512w"
    width="1990"
    height="830"
    alt="Dekart Architecture Overview"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview.png" width="1990" height="830" alt="Dekart Architecture Overview"\u003e\u003c/noscript\u003e
  \u003cfigcaption class="figure-caption"\u003eClick for big picture\u003c/figcaption\u003e
\u003c/figure\u003e


\u003c/a\u003e\u003c/p\u003e
\u003ch3 id="client"\u003eClient\u003c/h3\u003e
\u003cp\u003eDekart Client is based on \u003ca href="https://create-react-app.dev/docs/getting-started"\u003eCreate React App\u003c/a\u003e project setup, javascript Redux application utilizing Actions and Store. Components are build on top of \u003ca href="https://ant.design/components/overview/"\u003eAnd Design\u003c/a\u003e components framework.\u003c/p\u003e
\u003cp\u003eKeplrer.gl (fork) is used to render maps and configure visualizations. It is integrated via redux \u003ca href="https://docs.kepler.gl/docs/api-reference/actions/actions"\u003eactions\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eCommunication with server is happening via GRPC. Query results are fetched via HTTP in CSV format.\u003c/p\u003e
\u003ch3 id="server"\u003eServer\u003c/h3\u003e
\u003cp\u003eServer is a golang application. API is based on GRPC and described in \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/proto/dekart.proto"\u003eproto file\u003c/a\u003e. Browser support is implemented via \u003ca href="https://github.com/improbable-eng/grpc-web"\u003egrpc-web\u003c/a\u003e package.\u003c/p\u003e
\u003cp\u003eGRPC Server Streams are using long pull pattern for backwards compatibility with proxies and load balancers:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eclient subscribes on stream and waits for the first message\u003c/li\u003e
\u003cli\u003eserver sends messages and immediately closes a stream\u003c/li\u003e
\u003cli\u003eclient receives message and reopens stream\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003esee client \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/src/client/lib/grpc.js"\u003eimplementation details\u003c/a\u003e\u003c/p\u003e
\u003ch3 id="service-dependencies"\u003eService Dependencies\u003c/h3\u003e
\u003cp\u003e\u003cstrong\u003ePostgres Database\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eIs uses to store query metadata:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eDekart report ids\u003c/li\u003e
\u003cli\u003eSQL queries associated with report\u003c/li\u003e
\u003cli\u003eBigQuery Job ids\u003c/li\u003e
\u003cli\u003eKepler Map Configuration\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eGoogle Cloud Store\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eIs used to store query results\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eBigQuery\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eIs used to perform queries on datasets. Once Job is ready data is fetched from BigQuery and stored on GCS.\u003c/p\u003e
\u003ch2 id="bigquery-query-flow"\u003eBigQuery Query Flow\u003c/h2\u003e
\u003cp\u003e\u003ca href="./making-query.png"\u003e\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_512x0_resize_box_3.png 512w"
    width="2134"
    height="770"
    alt="BigQuery Query Flow"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/contributing/architecture-overview/making-query.png" width="2134" height="770" alt="BigQuery Query Flow"\u003e\u003c/noscript\u003e
  \u003cfigcaption class="figure-caption"\u003eClick for big picture\u003c/figcaption\u003e
\u003c/figure\u003e


\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eThis diagram explains BigQuery query flow step by step:\u003c/p\u003e
\u003col\u003e
\u003cli\u003eClient subscribes on Report GRPC Stream to watch all report updates. Multiple clients can subscribe on report and will see synchronized status.\u003c/li\u003e
\u003cli\u003eClient sends \u003ccode\u003eRunQuery\u003c/code\u003e command (unary GRPC call)\u003c/li\u003e
\u003cli\u003eServer updates report status in Postgres DB and starts BigQuery Job\u003c/li\u003e
\u003cli\u003eServer waits for BigQuery Job to complete\u003c/li\u003e
\u003cli\u003eOnce Job is Ready Server fetches Job Results and streams it to Google Cloud Storage\u003c/li\u003e
\u003cli\u003eOnce Result is saved in Cloud Storage update with result id is received by the client\u003c/li\u003e
\u003cli\u003eClient requests result by separate HTTP endpoint from server\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003eGoogle IAP (Identity Aware Proxy) is supported to authenticate user requests.\u003c/p\u003e
`},{id:6,href:"https://dekart.xyz/docs/contributing/build-from-source/",title:"Build from Source",description:"Build Dekart from Source",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Project\u003c/li\u003e
\u003cli\u003eBigQuery API Enabled\u003c/li\u003e
\u003cli\u003eCloud Storage Bucket\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003cli\u003eGitHub Account and \u003ca href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token"\u003eGitHub Token\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="steps"\u003eSteps\u003c/h2\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003eCheckout \u003ca href="https://github.com/dekart-xyz/dekart"\u003eDekart from GitHub\u003c/a\u003e; navigate to project directory;\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eGet your\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eCreate \u003ccode\u003e.npmrc\u003c/code\u003e file in the project directory with the following content and your github token\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003e//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@dekart-xyz:registry=https://npm.pkg.github.com
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eThis step is required because dekart is using github packages\u003c/p\u003e
\u003col start="4"\u003e
\u003cli\u003eInstall frontend dependencies\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003enpm install
\u003c/code\u003e\u003c/pre\u003e\u003col start="5"\u003e
\u003cli\u003eCreate and edit \u003ccode\u003e.env\u003c/code\u003e; see \u003ca href="/docs/configuration/environment-variables/"\u003eenvironment variables\u003c/a\u003e for details\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003ecp .env.example .env
\u003c/code\u003e\u003c/pre\u003e\u003col start="6"\u003e
\u003cli\u003eRun Postgres DB locally\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003emake up
\u003c/code\u003e\u003c/pre\u003e\u003col start="7"\u003e
\u003cli\u003eRun Server\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003emake server
\u003c/code\u003e\u003c/pre\u003e\u003col start="8"\u003e
\u003cli\u003eRun frontend\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003enpm start
\u003c/code\u003e\u003c/pre\u003e`},{id:7,href:"https://dekart.xyz/docs/self-hosting/from-source/",title:"Build from Source",description:"Build Dekart from Source",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Project\u003c/li\u003e
\u003cli\u003eBigQuery API Enabled\u003c/li\u003e
\u003cli\u003eCloud Storage Bucket\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003cli\u003eGitHub Account and \u003ca href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token"\u003eGitHub Token\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="steps"\u003eSteps\u003c/h2\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003eCheckout \u003ca href="https://github.com/dekart-xyz/dekart"\u003eDekart from GitHub\u003c/a\u003e; navigate to project directory;\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eGet your\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eCreate \u003ccode\u003e.npmrc\u003c/code\u003e file in the project directory with the following content and your github token\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003e//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@dekart-xyz:registry=https://npm.pkg.github.com
\u003c/code\u003e\u003c/pre\u003e\u003cp\u003eThis step is required because dekart is using github packages\u003c/p\u003e
\u003col start="4"\u003e
\u003cli\u003eInstall frontend dependencies\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003enpm install
\u003c/code\u003e\u003c/pre\u003e\u003col start="5"\u003e
\u003cli\u003eCreate and edit \u003ccode\u003e.env\u003c/code\u003e; see \u003ca href="/docs/configuration/environment-variables/"\u003eenvironment variables\u003c/a\u003e for details\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003ecp .env.example .env
\u003c/code\u003e\u003c/pre\u003e\u003col start="6"\u003e
\u003cli\u003eRun Postgres DB locally\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003emake docker-compose-up
\u003c/code\u003e\u003c/pre\u003e\u003col start="7"\u003e
\u003cli\u003eRun Server\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003emake run-dev-server
\u003c/code\u003e\u003c/pre\u003e\u003col start="8"\u003e
\u003cli\u003eRun frontend\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003enpm start
\u003c/code\u003e\u003c/pre\u003e`},{id:8,href:"https://dekart.xyz/docs/about/overture-maps-examples/",title:"Overture Maps Examples",description:"Collection of kepler.gl maps created from Overture Data in BigQuery public dataset using SQL and Dekart.",content:`\u003cp\u003eCollection of kepler.gl maps created from Overture Data in BigQuery public dataset using BigQuery SQL and Dekart. Each example includes a SQL query and a visualized map.\u003c/p\u003e
\u003ch2 id="segment"\u003eSegment\u003c/h2\u003e
\u003cp\u003eThe Overture Maps \u003ccode\u003esegment\u003c/code\u003e table represents paths, roads, and transportation segments, storing their geospatial data as LineStrings along with attributes like class, surface, speed limits, and access restrictions​.\u003c/p\u003e
\u003ch3 id="nevada-roads-by-speed-and-class"\u003eNevada Roads by Speed and Class\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_512x0_resize_box_3.png 512w"
    width="1512"
    height="851"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb_hu0fce0e9b3ddb2c00bed2bdc0b15b3dc9_1528539_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb.png" width="1512" height="851" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Step 1: Get the geometry of Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US-NV\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 2: Select roads within Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eroad\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eSAFE_CAST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eJSON_EXTRACT_SCALAR\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eroad\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;\$.restrictions.speed_limits[0].max_speed.value\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eINT64\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003espeed_limit\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esegment\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eand\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enot\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ein\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;track\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;driveway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;path\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;footway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;sidewalk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;pedestrian\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;cycleway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;steps\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;crosswalk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;bridleway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;alley\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:77dc6f7f-c91c-4099-8dc3-8f043d46cdfb]%20%200xc000e8d300%20%3cnil%3e%20try-query-cloud%20true%201%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%201647%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="berlin-roads"\u003eBerlin Roads\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_512x0_resize_box_3.png 512w"
    width="3024"
    height="1701"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650_hu178bb851d0f8ebdde70d6af3644e890c_1249045_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/410b857a-aad1-4f05-8ddd-551d0f0fe650.png" width="3024" height="1701" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/410b857a-aad1-4f05-8ddd-551d0f0fe650" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eberlin_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;berlin\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;DE\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esegment\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eberlin_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_CONTAINS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Spatial filter for roads inside Berlin boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;primary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;secondary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;tertiary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e);\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:410b857a-aad1-4f05-8ddd-551d0f0fe650]%20%200xc000e8d800%20%3cnil%3e%20try-query-cloud%20true%203%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%202313%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="nevada-highways-and-main-roads"\u003eNevada highways and main roads\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_512x0_resize_box_3.png 512w"
    width="3024"
    height="1701"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1_hu1b5f3f8640cf1dcff58bc3db76d8bfaa_1631257_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1.png" width="3024" height="1701" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Step 1: Get the simplified geometry of Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e01\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__DIVISIONS\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eDIVISION_AREA\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US-NV\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 2: Select main roads and highways within simplified Nevada geometry and convert geometry to WKT
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eST_ASWKT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeo\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__TRANSPORTATION\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eSEGMENT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;primary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;secondary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;tertiary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;trunk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;motorway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:db0e26c2-00b0-4f6b-8f21-a26ab312f9e1]%20%200xc0003f0680%20%3cnil%3e%20try-query-cloud%20true%205%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%203179%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="germany--france-road-networks"\u003eGermany \u0026amp; France Road Networks\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50_hue13c4128df380c992373cefe2e73bf5c_1481648_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/a4e308a3-b2e8-4183-bfd6-b68866209f50.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/a4e308a3-b2e8-4183-bfd6-b68866209f50" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry_boundaries\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Define the boundaries for Germany and France
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;DE\u0026#34;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;FR\u0026#34;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;country\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure we\u0026#39;re selecting the entire country boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003efiltered_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Filter the roads inside the Germany and France boundaries that are accessible to cars, including main roads but excluding highways
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e           \u003c/span\u003e\u003cspan class="n"\u003eST_LENGTH\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e/\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Convert road length to kilometers
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esegment\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry_boundaries\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_CONTAINS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Spatial filter for roads inside Germany and France boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;primary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;secondary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;tertiary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Main roads for traffic, excluding highways
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003ehexagonized_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Assign each road segment to an H3 hexagon at level 7
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eST_CENTROID\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e7\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- H3 hexagon for each road segment at level 5
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Use the length in kilometers
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003efiltered_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Aggregate the total length of roads for each hexagon and country
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eSUM\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etotal_road_length_km\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ehexagonized_roads\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eORDER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etotal_road_length_km\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDESC\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:a4e308a3-b2e8-4183-bfd6-b68866209f50]%20%200xc000e8dbc0%20%3cnil%3e%20try-query-cloud%20true%207%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%204895%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="road-density-us"\u003eRoad density US\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8_hu0c63b10073d48710a5eef68c058225ee_2224200_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/eb5b25bf-4c62-44bc-9e69-f0257134e3f8.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/eb5b25bf-4c62-44bc-9e69-f0257134e3f8" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry_boundaries\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Define the boundaries for the US
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;US\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;country\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure we\u0026#39;re selecting the entire country boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003efiltered_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Filter the roads inside the US boundaries that are accessible to cars, including main roads but excluding highways
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e           \u003c/span\u003e\u003cspan class="n"\u003eST_LENGTH\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e/\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Convert road length to kilometers
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esegment\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry_boundaries\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_CONTAINS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Spatial filter for roads inside US boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;primary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;secondary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;tertiary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Main roads for traffic, excluding highways
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003ehexagonized_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Assign each road segment to an H3 hexagon at level 6
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eST_CENTROID\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e6\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- H3 hexagon for each road segment at level 5
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Use the length in kilometers
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003efiltered_roads\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Aggregate the total length of roads for each hexagon and country
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eSUM\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eroad_length_km\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etotal_road_length_km\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ehexagonized_roads\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_hexagon\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eORDER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etotal_road_length_km\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDESC\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:eb5b25bf-4c62-44bc-9e69-f0257134e3f8]%20%200xc000e8de80%20%3cnil%3e%20try-query-cloud%20true%209%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%206541%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch2 id="division-area"\u003eDivision Area\u003c/h2\u003e
\u003cp\u003eThe Overture Maps division_area table contains boundary polygons for administrative areas, such as cities, countries, and neighborhoods, along with related attributes like subtype, population, and country codes​.\u003c/p\u003e
\u003ch3 id="berlin-boundary"\u003eBerlin Boundary\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659_hu5f00ddb62d8ae713fd92758fbf7a7209_597479_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/5f7144cd-24f0-4698-ba7e-a63e872a4659.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/5f7144cd-24f0-4698-ba7e-a63e872a4659" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;Berlin\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DE\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:5f7144cd-24f0-4698-ba7e-a63e872a4659]%20%200xc001132800%20%3cnil%3e%20try-query-cloud%20true%2011%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%207144%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003c!-- ffbe0a05-7794-465c-ab5b-de54d69cdb38 --\u003e
\u003ch3 id="regions-and-cities-in-france"\u003eRegions and Cities in France\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38_hu59acd3243704f616782fd55d18f670f0_939831_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/ffbe0a05-7794-465c-ab5b-de54d69cdb38.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/ffbe0a05-7794-465c-ab5b-de54d69cdb38" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003edivision_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003edivision_name\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FR\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- ISO code for France
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;city\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Filtering for regions and cities
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eORDER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:ffbe0a05-7794-465c-ab5b-de54d69cdb38]%20%200xc001132b80%20%3cnil%3e%20try-query-cloud%20true%2013%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%207685%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch2 id="land-use"\u003eLand Use\u003c/h2\u003e
\u003cp\u003eThe Overture Maps \u003ccode\u003eland_use\u003c/code\u003e table represents different types of land use, such as residential, agricultural, industrial, and others, by storing their spatial data as polygons or multipolygons, along with attributes like subtype, class, surface, and names.\u003c/p\u003e
\u003c!-- 34d0ba2c-0fd5-4323-a677-d5b05b65d86d --\u003e
\u003ch3 id="berlin-playgrounds"\u003eBerlin Playgrounds\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d_hu4860c348c3de838e3b9fbab12f0307ee_784191_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/34d0ba2c-0fd5-4323-a677-d5b05b65d86d.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/34d0ba2c-0fd5-4323-a677-d5b05b65d86d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esurface\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003elevel\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eland_use\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_GEOGFROMTEXT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;POLYGON((13.08835 52.33826, 13.76116 52.33826, 13.76116 52.67551, 13.08835 52.67551, 13.08835 52.33826))\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;playground\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:34d0ba2c-0fd5-4323-a677-d5b05b65d86d]%20%200xc001132e40%20%3cnil%3e%20try-query-cloud%20true%2015%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%208500%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="all-parks-in-london"\u003eAll parks in London\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a_huf0385bac58b44ba541b690246c390c66_1049981_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/8cb1566f-0237-4d99-9cc4-bdd70859763a.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/8cb1566f-0237-4d99-9cc4-bdd70859763a" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eprimary_name\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;London\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;GB\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- ISO code for the United Kingdom
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;locality\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure we are selecting a city or locality
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:8cb1566f-0237-4d99-9cc4-bdd70859763a]%20%200xc001132ec0%20%3cnil%3e%20try-query-cloud%20true%2017%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%209044%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="ukraine-schools"\u003eUkraine Schools\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d_hu7d83ef9858c8b294c5ff88af9ff091e5_670446_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/f0941a67-350f-4a80-a9d0-27594f2f853d.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/f0941a67-350f-4a80-a9d0-27594f2f853d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eukraine_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ukraine\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;country\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eland_use\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eukraine_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eu\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eu\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;education\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003el\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;school\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:f0941a67-350f-4a80-a9d0-27594f2f853d]%20%200xc001133180%20%3cnil%3e%20try-query-cloud%20true%2019%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%209665%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch2 id="places"\u003ePlaces\u003c/h2\u003e
\u003cp\u003eThe \u003ccode\u003eplace\u003c/code\u003e table in the Overture Maps dataset contains points of interest (POIs) such as businesses, amenities, and public facilities.\u003c/p\u003e
\u003ch3 id="london-ev-charging-density"\u003eLondon EV Charging Density\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b_hu6a7f412c3e074252d0061661be069396_948847_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/af836766-9ec4-40fc-afbe-fc6b32d6593b.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/af836766-9ec4-40fc-afbe-fc6b32d6593b" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elondon_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;london\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;GB\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003eev_charging_stations\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplace\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elondon_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elb\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elb\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecategories\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLIKE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;%charging%\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eev\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e6\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_cell\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eCOUNT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="o"\u003e*\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003estation_count\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eev_charging_stations\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eev\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eh3_cell\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:af836766-9ec4-40fc-afbe-fc6b32d6593b]%20%200xc0011335c0%20%3cnil%3e%20try-query-cloud%20true%2021%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%2010574%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="las-vegas-ev-charging"\u003eLas Vegas EV Charging\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_512x0_resize_box_3.png 512w"
    width="2024"
    height="1139"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122_hu0be7362a5c7e17e00f83c537e4ee00cd_347956_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/72781fb6-8bc5-4c41-839f-66f5bcf7c122.png" width="2024" height="1139" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/72781fb6-8bc5-4c41-839f-66f5bcf7c122" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e


\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elas_vegas_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;Las Vegas\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;US-NV\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;locality\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003estation_name\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eaddresses\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ewebsites\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ephones\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplace\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elas_vegas_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elv\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecategories\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLIKE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;%charging%\u0026#34;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eOR\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecategories\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLIKE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s2"\u003e\u0026#34;%ev%\u0026#34;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elv\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href="https://cloud.dekart.xyz/reports/%7bmap[report:72781fb6-8bc5-4c41-839f-66f5bcf7c122]%20%200xc0003b3700%20%3cnil%3e%20try-query-cloud%20true%2023%20%20%7b0%20%7b0%200%7d%7d%20%20%7b0%20%7b0%200%7d%7d%2011278%20%7b%200%200%200%7d%20%3cnil%3e%7d" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
`},{id:9,href:"https://dekart.xyz/docs/about/public-dataset-examples/",title:"Examples with Public Datasets",description:"Learn how to use BigQuery SQL to visualize spatial datasets",content:`\u003cp\u003eLearn how to use BigQuery SQL to visualize spatial datasets. Below are some examples of public datasets that you can explore and visualize with Dekart.\u003c/p\u003e
\u003ch2 id="large-datasets"\u003eLarge datasets\u003c/h2\u003e
\u003cp\u003eExplore large datasets with millions of rows and visualize them on a map\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/8f2da1e3-9769-4654-abb8-983afd2a2795"\u003eAll (400k) Toronto Buildings (100Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/f63fb537-800e-48f6-8c18-8d542a0fed30"\u003e1M points (30Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b818f41a-5bd2-4b3b-87b8-4797a390a2a6"\u003eAll ramps in Illinois \u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="population-density"\u003ePopulation density\u003c/h2\u003e
\u003cp\u003eVisualize population density anywhere in the world and at any level of detail\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b099fbd3-d0ae-4636-aa44-217c0bac53f6"\u003ePopulation over 10k \u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/a70515ee-ecbb-4aac-8ce1-cf508483e2dc/source"\u003eEU Population Density\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/f4c55a02-88a1-4a38-a8ab-48a6237dfee9/source"\u003eBerlin Population Density\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="openstreetmap"\u003eOpenStreetMap\u003c/h2\u003e
\u003cp\u003eExport OpenStreetMap data\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/e539b5f6-cec2-45d5-97b3-d5bf541a9389"\u003eAll German schools from OSM data\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://dekart.xyz/blog/admin-boundaries-in-bigquery-public-datasets/"\u003eAdmin Boundaries\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/556330cb-e7ba-4e34-89df-5644cd0ec8b2"\u003eAll roads in Nevada excluding parking and service roads (26Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e"\u003eEvery parking lot in Nevada from the OSM\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55/source"\u003eUS States Borders\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="geospatial-analytics"\u003eGeospatial analytics\u003c/h2\u003e
\u003cp\u003ePerform geospatial analytics with Spatial SQL\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/aeefb6e0-d83a-489a-b371-50b306535e2d"\u003eLocate empty building plots\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:10,href:"https://dekart.xyz/docs/about/kepler-gl-map-examples/",title:"Kepler.gl maps examples",description:"Kepler.gl maps examples created on Dekart with public BigQuery datasets, Overture Data, and OpenStreetMap data",content:`\u003cp\u003eDekart allows user create and share Kepler.gl maps from private and public BigQuery datasets, using SQL. It works particularly well with BigQuery GIS functions.\u003c/p\u003e
\u003ch2 id="population-density"\u003ePopulation density\u003c/h2\u003e
\u003cp\u003eVisualize population density anywhere in the world and at any level of detail\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b099fbd3-d0ae-4636-aa44-217c0bac53f6"\u003ePopulation over 10k \u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/a70515ee-ecbb-4aac-8ce1-cf508483e2dc/source"\u003eEU Population Density\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/f4c55a02-88a1-4a38-a8ab-48a6237dfee9/source"\u003eBerlin Population Density\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="overture-maps"\u003eOverture Maps\u003c/h2\u003e
\u003cp\u003eExamples of Kepler.gl maps created using Overture Data in BigQuery, focusing on geospatial visualizations from the segment, division_area, land_use, and place tables.\u003c/p\u003e
\u003cp\u003e👉 \u003ca href="/docs/about/overture-maps-examples/"\u003eOverture Map Example\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="openstreetmap"\u003eOpenStreetMap\u003c/h2\u003e
\u003cp\u003eExamples of extracting and creating kepler.gl maps from OpenStreetMap data in BigQuery public dataset\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/e539b5f6-cec2-45d5-97b3-d5bf541a9389"\u003eAll German schools from OSM data\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://dekart.xyz/blog/admin-boundaries-in-bigquery-public-datasets/"\u003eAdmin Boundaries\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/556330cb-e7ba-4e34-89df-5644cd0ec8b2"\u003eAll roads in Nevada excluding parking and service roads (26Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e"\u003eEvery parking lot in Nevada from the OSM\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55/source"\u003eUS States Borders\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/5825b784-cd3c-4030-b3c5-94a8f4dd47b0"\u003eUkrainian Schools vs Russian Invasion\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="geospatial-analytics"\u003eGeospatial analytics\u003c/h2\u003e
\u003cp\u003ePerform geospatial analytics with Spatial SQL and Kepler.gl\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/aeefb6e0-d83a-489a-b371-50b306535e2d"\u003eLocate empty building plots\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="keplergl-maps-with-large-datasets"\u003eKepler.gl maps with large datasets\u003c/h2\u003e
\u003cp\u003eBenchmarking Kepler.gl with large datasets\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/8f2da1e3-9769-4654-abb8-983afd2a2795"\u003eAll (400k) Toronto Buildings (100Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/f63fb537-800e-48f6-8c18-8d542a0fed30"\u003e1M points (30Mb)\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://cloud.dekart.xyz/reports/b818f41a-5bd2-4b3b-87b8-4797a390a2a6"\u003eAll ramps in Illinois \u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:11,href:"https://dekart.xyz/docs/contributing/",title:"Contributing",description:"Contributing to the project",content:""},{id:12,href:"https://dekart.xyz/docs/configuration/environment-variables/",title:"Environment Variables",description:"Environment Variables",content:`\u003ch2 id="main-configuration"\u003eMain configuration\u003c/h2\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_MAPBOX_TOKEN\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003ca href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/"\u003eMapbox Token\u003c/a\u003e to show a map\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_DB\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eDatabase name. Dekart needs Postgres Database to store query meta information. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003edekart\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_HOST\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003elocalhost\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_PORT\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e5432\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_USER\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003epostgres\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_PASSWORD\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e******\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_PORT\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e8080\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_URL\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.13\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAlternatively to specify \u003ccode\u003eDEKART_POSTGRES_DB\u003c/code\u003e, \u003ccode\u003eDEKART_POSTGRES_HOST\u003c/code\u003e, \u003ccode\u003eDEKART_POSTGRES_PORT\u003c/code\u003e, \u003ccode\u003eDEKART_POSTGRES_USER\u003c/code\u003e, \u003ccode\u003eDEKART_POSTGRES_PASSWORD\u003c/code\u003e, configure PostgreSQL by passing the connection string. If both specified \u003ccode\u003eDEKART_POSTGRES_URL\u003c/code\u003e is used. \u003cbr/\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003epostgres://user:pass@hostname:5432/dekart?sslmode=verify-full\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DATASOURCE=BQ\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eWhich datasource to use: \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eBQ\u003c/code\u003e BigQuery, default\u003c/li\u003e\u003cli\u003e\u003ccode\u003eATHENA\u003c/code\u003e AWS Athena\u003c/li\u003e\u003cli\u003e\u003ccode\u003eSNOWFLAKE\u003c/code\u003e Snowflake \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.12\u003c/small\u003e\u003c/li\u003e\u003cli\u003e\u003ccode\u003ePG\u003c/code\u003e Postgres \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_STORAGE=GCS\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eWhich storage backend to use for storing queries and query results \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eGCS\u003c/code\u003e Google Cloud Storage, default, works only with BigQuery data source\u003c/li\u003e\u003cli\u003e\u003ccode\u003eS3\u003c/code\u003e AWS S3, works with BigQuery and AWS Athena\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eGoogle Cloud Storage or AWS S3 bucket name where Dekart Query results will be stored. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003edekart-bucket\u003c/code\u003e \u003cbr\u003e\u003cbr\u003e  If value is empty, users will be able to define storage bucket via UI. Supported datasource \u003ccode\u003eDEKART_DATASOURCE\u003c/code\u003e: \u003cul\u003e\u003cli\u003e\u003ccode\u003eBQ\u003c/code\u003e BigQuery from \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CORS_ORIGIN=\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.10\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eCORS Origin to be allowed by Dekart backend and set in \u003ccode\u003eAccess-Control-Allow-Origin\u003c/code\u003e header. If not set or set incorrectly, warning will appear in logs. If set incorrectly. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003ehttps://dekart.example.com\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="aws"\u003eAWS\u003c/h2\u003e
\u003cp\u003eDekart support started AWS SDK environment variables. Required to query AWS Athena and use AWS S3.\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eAWS_REGION\u003c/code\u003e\u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eThe AWS SDK compatible environment variable that specifies the AWS Region to send the request to\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eAWS_ACCESS_KEY_ID\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSpecifies an AWS access key associated with an IAM user or role.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eAWS_SECRET_ACCESS_KEY\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSpecifies the secret key associated with the access key. This is essentially the \u0026ldquo;password\u0026rdquo; for the access key.\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="aws-athena"\u003eAWS Athena\u003c/h2\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ATHENA_CATALOG\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eData source (group of databases) for AWS Athena to reference when executing queries. Default value is usually \u003ccode\u003eAwsDataCatalog\u003c/code\u003e. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003emy-athena-catalog\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e and then copied to \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e.  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eathena-results\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAmazon S3 query result location required by Athena SDK. This is different from  \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e. First query results are stored in \u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e and then copied to \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e.  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eathena-results\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ATHENA_WORKGROUP\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.13\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAWS Athena workgroup to use when executing Athena queries. If not specified, the default \u003ccode\u003eprimary\u003c/code\u003e workgroup will be used. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003emy-athena-workgroup\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="google-cloud"\u003eGoogle Cloud\u003c/h2\u003e
\u003cp\u003eRequired to query BigQuery and use Cloud Storage\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eCredentials for \u003ca href="https://cloud.google.com/docs/authentication/getting-started"\u003eGoogle Cloud API\u003c/a\u003e \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e/.../service-account-123456.json\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="bigquery"\u003eBigQuery\u003c/h2\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_BIGQUERY_PROJECT_ID\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eUnique identifier for your Google Cloud project with BigQuery API Enabled. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003emy-project\u003c/code\u003e \u003cbr\u003e\u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e If value is empty, users will be able to define project ID via UI.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_BIGQUERY_MAX_BYTES_BILLED\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.7\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSets \u003ccode\u003emaximumBytesBilled\u003c/code\u003e in BigQuery Job Configuration to implement  \u003ca href="https://cloud.google.com/bigquery/docs/best-practices-costs#limit_query_costs_by_restricting_the_number_of_bytes_billed"\u003eBest Practices for Controlling Query Cost\u003c/a\u003e.\u003cbr\u003e If not set warning message will appear in logs.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_GCP_EXTRA_OAUTH_SCOPES\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.14\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSet additional scopes for the GCP OAuth token when connecting to BigQuery.\u003cbr\u003e The value is interpreted as a comma-delimited list.\u003cbr\u003e E.g., in order to query a BigQuery table backed by a Google Sheet in Google Drive, the value needs to be set to \u003ccode\u003ehttps://www.googleapis.com/auth/drive\u003c/code\u003e.\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="snowflake"\u003eSnowflake\u003c/h2\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SNOWFLAKE_ACCOUNT_ID\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.12\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003e\u003ca target="_blank" href="https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-name-as-an-identifier"\u003eSnowflake Account Identifier\u003c/a\u003e  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eorgname-account_name\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SNOWFLAKE_USER\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.12\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSnowflake user with default warehouse configured  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eexample_user\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SNOWFLAKE_PASSWORD\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.12\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSnowflake user password  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e******\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="postgres-as-a-data-source"\u003ePostgres (as a data source)\u003c/h2\u003e
\u003cp\u003ePostgres can be used as a data source for Dekart. Do not confuse with Dekart\u0026rsquo;s Postgres database, which is used to store query meta information.\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_DATA_CONNECTION\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003ePostgres DB to be used as data source  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003epostgres://user:password@host:port/db\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="file-upload"\u003eFile upload\u003c/h2\u003e
\u003cp\u003eStarting from version 0.10 Dekart supports file upload. File upload is disabled by default. Once uploaded files are stored in the same storage as query results. Both AWS S3 and Google Cloud Storage are supported. The recommended max file size is 100MB.\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ALLOW_FILE_UPLOAD\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.10\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eEnable file upload \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="user-authorization-via-google-oauth-20-flow"\u003eUser authorization via Google OAuth 2.0 flow\u003c/h2\u003e
\u003cp\u003eDekart can authorize users via Google OAuth 2.0 and use users\u0026rsquo; credentials to access BigQuery and Cloud Storage. When this option is enabled, Dekart does not require a service account and \u003ccode\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/code\u003e to be set. The user token is retrieved from Google OAuth 2.0 flow and stored in only in the browser memory. When the page is refreshed, the token is retrieved again. User short-lived token is then passed via Authorization header Dekart backend to access BigQuery and Cloud Storage.\u003c/p\u003e
\u003cp\u003eNo token is stored in the Dekart backend, database, or logs.\u003c/p\u003e
\u003cp\u003eEach user needs to have access to BigQuery and Cloud Storage with following permissions:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eBigQuery Data Viewer\u003c/li\u003e
\u003cli\u003eBigQuery Job User\u003c/li\u003e
\u003cli\u003eBigQuery Read Session User\u003c/li\u003e
\u003cli\u003eStorage Object User\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eThis option is only supported for BigQuery and Cloud Storage. It is not supported for AWS and Snowflake Data Sources.\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_GOOGLE_OAUTH\u003c/code\u003e  \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eEnables Google OAuth 2.0 flow. Requires users to be authenticated. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_GOOGLE_OAUTH_CLIENT_ID\u003c/code\u003e\u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eGoogle OAuth 2.0 Client ID. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1234567890-abcde.apps.googleusercontent.com\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_GOOGLE_OAUTH_SECRET\u003c/code\u003e\u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eGoogle OAuth 2.0 Client Secret. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e******\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003cp\u003eCreating Google OAuth 2.0 Client ID and Client Secret:\u003c/p\u003e
\u003col\u003e
\u003cli\u003eConfigure \u003ca href="https://console.cloud.google.com/apis/credentials/consent"\u003eOAuth Consent Screen\u003c/a\u003e in your Google Cloud Project\u003c/li\u003e
\u003cli\u003eCreate \u003ca href="https://console.cloud.google.com/apis/credentials"\u003eOAuth 2.0 Client ID\u003c/a\u003e with \u003ccode\u003eWeb application\u003c/code\u003e type\u003c/li\u003e
\u003cli\u003eAdd \u003ccode\u003ehttps://your-dekart-url.com/api/v1/authenticate\u003c/code\u003e to \u003ccode\u003eAuthorized redirect URIs\u003c/code\u003e\u003c/li\u003e
\u003c/ol\u003e
\u003ch2 id="user-authorization-via-google-iap"\u003eUser authorization via Google IAP\u003c/h2\u003e
\u003cp\u003eDekart can read \u003ca target="_blank" href="https://cloud.google.com/iap/docs/signed-headers-howto"\u003eclaims provided by Google IAP\u003c/a\u003e and authorize users to:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003elist and edit only their own reports\u003c/li\u003e
\u003cli\u003eread-only access to other users reports\u003c/li\u003e
\u003c/ul\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_IAP\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eEnables validation Google IAP JWT. Required users to be authenticated. ENables user management policies. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_IAP_JWT_AUD\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eSigned Header JWT Audience (\u003ccode\u003eaud\u003c/code\u003e). You can get the values for the aud string mentioned above by accessing the Cloud Console, or you can use the gcloud command-line tool. \u003ca href="https://cloud.google.com/iap/docs/signed-headers-howto#verifying_the_jwt_payload"\u003eSee details\u003c/a\u003e.  \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e/projects/PROJECT_NUMBER/apps/PROJECT_ID\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="user-authorization-via-amazon-load-balancer"\u003eUser authorization via Amazon Load Balancer\u003c/h2\u003e
\u003cp\u003eDekart can read \u003ca target="_blank" href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html"\u003eclaims provided by Amazon Load Balancer\u003c/a\u003e and authorize users to:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003elist and edit only their reports\u003c/li\u003e
\u003cli\u003eread-only access to other user\u0026rsquo;s reports\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003ca href="/docs/self-hosting/aws-ecs-terraform/#cognito-authentication"\u003eAmazon Load Balancer configuration example with Terraform\u003c/a\u003e\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_AMAZON_OIDC\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eEnables users authorization. Requires users to be authenticated and \u003ccode\u003ex-amzn-oidc-data\u003c/code\u003e to be passed from Load Balancer. Requires \u003ccode\u003eAWS_REGION\u003c/code\u003e. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="user-experience"\u003eUser Experience\u003c/h2\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_UX_HOMEPAGE\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eChange URL linked from Dekart logo\u003cbr\u003e \u003cem\u003eDefault value\u003c/em\u003e: \u003ccode\u003e/\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_UX_DATA_DOCUMENTATION\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eAllows provide URL to dataset documentation. It will appear in Dekart UI.\u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003ehttps://my.company/dataset/schema.html\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_HTML_CUSTOM_CODE\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eAllows to add custom HTML code to \u003ccode\u003e\u0026lt;head\u0026gt;\u003c/code\u003e. Can be used for adding trackers.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DISABLE_USAGE_STATS\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.11\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eBy default, Dekart appends certain information to the referrer of external links. This information includes the version number, the SHA256 hash of the hostname, the name of the data source, and the total number of reports, queries, files, and authors. No other information is collected. The source code for this implementation can be found \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/src/client/lib/ref.js#L25"\u003ehere\u003c/a\u003e. This behavior can be turned off by setting this variable to \u003ccode\u003e1\u003c/code\u003e.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_UX_ACCESS_ERROR_INFO_HTML\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAllows to provide custom HTML code to be shown on the access error page.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_UX_NOT_FOUND_ERROR_INFO_HTML\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAllows to provide custom HTML code to be shown on the not found error page.\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_UX_SAMPLE_QUERY_SQL\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAllows to provide a sample SQL query to be shown in the query editor.\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="development-specific"\u003eDevelopment specific\u003c/h2\u003e
\u003cp\u003eDo not change for production\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_LOG_DEBUG\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eSet Dekart log level to debug \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_LOG_PRETTY\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003ePrint pretty colorful logs in console. By default Dekart formats logs as JSON \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_STATIC_FILES\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003e\u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e./build\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
`},{id:13,href:"https://dekart.xyz/docs/cloud/cloud-security-faq/",title:"Security Considerations",description:"Why Dekart Cloud is Secure",content:`\u003cp class="lead text-left"\u003e\u003ca href="/"\u003eDekart Cloud\u003c/a\u003e is designed to make your cybersecurity and legal teams happy. We achieve it by never storing tokens, and query results in Dekart Cloud backend.\u003c/p\u003e
\u003c!-- * **Passthrough Authentication**: Short-lived Google OAuth token is passed from your browser to Google APIs and never stored on Dekart Cloud backend.

* **No User Data Storage**: Query results are stored on Google Cloud Storage bucket provided by you.

* **Compliance Friendly**: We comply with [Google API Services User Data Policy](https://cloud.google.com/terms/services) and verified by Google's Trust \u0026 Safety team. --\u003e
\u003ch3 id="what-permissions-am-i-granting-to-dekart-and-why-are-they-necessary"\u003eWhat permissions am I granting to Dekart, and why are they necessary?\u003c/h3\u003e
\u003cp\u003eYou are granting Dekart the following scopes:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003ehttps://www.googleapis.com/auth/bigquery\u003c/code\u003e this scope grants Dekart the ability to manage user data in Google BigQuery, encompassing actions like running queries, managing datasets, and configuring settings.\u003c/li\u003e
\u003cli\u003e\u003ccode\u003ehttps://www.googleapis.com/auth/devstorage.read_write\u003c/code\u003e this scope allows Dekart to read and write user data in Google Cloud Storage, enabling it to manage files and potentially other data storage elements.\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eThese permissions are necessary for Dekart to run queries and store results in your Google Cloud Storage bucket.\u003c/p\u003e
\u003ch3 id="how-will-my-data-be-used-and-protected"\u003eHow will my data be used and protected?\u003c/h3\u003e
\u003cp\u003eSQL queries and their results are stored in Google Cloud Storage bucket \u003cem\u003eprovided by you!\u003c/em\u003e We never store tokens, and query results in Dekart Cloud backend. Nobody at Dekart can access your BigQuery data or Google Cloud Storage bucket.\u003c/p\u003e
\u003ch3 id="can-i-revoke-dekarts-access-if-i-change-my-mind"\u003eCan I revoke Dekart\u0026rsquo;s access if I change my mind?\u003c/h3\u003e
\u003cp\u003eYes, you can revoke Dekart\u0026rsquo;s access to your Google Cloud resources by signing out of Dekart Cloud. This will remove Dekart\u0026rsquo;s access to your Google Cloud resources and prevent Dekart from running queries or storing results in your Google Cloud Storage bucket.\u003c/p\u003e
\u003ch3 id="does-dekart-comply-with-data-protection-regulations"\u003eDoes Dekart comply with data protection regulations?\u003c/h3\u003e
\u003cp\u003eWe are committed to upholding the principles of GDPR and ensuring that your data rights are respected. We also comply with \u003ca href="https://cloud.google.com/terms/services"\u003eGoogle API Services User Data Policy\u003c/a\u003e and verified by Google\u0026rsquo;s Trust \u0026amp; Safety team.\u003c/p\u003e
\u003ch3 id="what-support-is-available-if-i-have-issues-or-questions-about-data-access"\u003eWhat support is available if I have issues or questions about data access?\u003c/h3\u003e
\u003cp\u003eIf you have any questions or issues about data access, please contact us via email at \u003ca href="mailto:support@dekart.xyz"\u003esupport@dekart.xyz\u003c/a\u003e or via \u003ca href="https://slack.dekart.xyz/"\u003eSlack\u003c/a\u003e.\u003c/p\u003e
`},{id:14,href:"https://dekart.xyz/docs/about/playground/",title:"BigQuery Playground",description:"Dekart BigQuery Playground: Create data-driven geospatial visualizations from BigQuery Public Datasets",content:`\u003cp\u003eTry Dekart in \u003ca target="_blank" href="https://cloud.dekart.xyz/playground"\u003ePlayground Mode\u003c/a\u003e with one of many \u003ca target="_blank" href="https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset" role="button"\u003ePublic Datasets\u003c/a\u003e available on BigQuery.\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/playground" role="button"\u003eGo to BigQuery Playground\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="quick-start"\u003eQuick Start\u003c/h2\u003e
\u003cimg class="img-simple img-fluid lazyload" src="https://dekart.xyz/docs/about/playground/screencast_hubcb05f9855198997eaa919acc67d2bb4_11376295_20x0_resize_box.gif" data-src="https://dekart.xyz/docs/about/playground/screencast.gif" width="1024" height="640" alt="Screencast"\u003e


\u003col\u003e
\u003cli\u003e
\u003cp\u003eGo to \u003ca target="_blank" href="https://cloud.dekart.xyz/playground"\u003ecloud.dekart.xyz/playground\u003c/a\u003e\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eAuthorize with Gmail Account. Dekart Playground access only your email to store Maps you created on Playground. Emails are not used for any marketing purposes. You are not charge for anything.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eClick Create Report\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_512x0_resize_box_3.png 512w"
    width="3224"
    height="2094"
    alt="Create Report"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/playground/quick-start-1.png" width="3224" height="2094" alt="Create Report"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003col start="4"\u003e
\u003cli\u003eType example query (uses \u003ca href="https://console.cloud.google.com/marketplace/product/city-of-chicago-public-data/chicago-crime?project=dekart-playground\u0026amp;folder=\u0026amp;organizationId="\u003eChicago Crime Data\u003c/a\u003e)\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eprimary_type\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003edistrict\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elatitude\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elongitude\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="nb"\u003edate\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003echicago_crime\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecrime\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eRand\u003c/span\u003e\u003cspan class="p"\u003e()\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e5\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e/\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e100\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003col start="5"\u003e
\u003cli\u003eRun query (click Execute button)\u003c/li\u003e
\u003c/ol\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_512x0_resize_box_3.png 512w"
    width="3224"
    height="2094"
    alt="Report Edit"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/playground/quick-start-2.png" width="3224" height="2094" alt="Report Edit"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003col start="6"\u003e
\u003cli\u003eStyle a map (see \u003ca href="https://docs.kepler.gl/docs/user-guides"\u003eKepler Docs\u003c/a\u003e for details)\u003c/li\u003e
\u003c/ol\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_512x0_resize_box_3.png 512w"
    width="3224"
    height="2094"
    alt="Style Visualization"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/playground/quick-start-3.png" width="3224" height="2094" alt="Style Visualization"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003col start="7"\u003e
\u003cli\u003eNow you can save and share you beautiful Map!\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/playground" role="button"\u003eGo to BigQuery Playground\u003c/a\u003e\u003c/p\u003e
`},{id:15,href:"https://dekart.xyz/docs/about/your-datasets/",title:"Query Private Datasets",description:"Using Dekart with your team/company internal/private datasets",content:`\u003cp\u003eDekart offers 2 different options to work with private datasets:\u003c/p\u003e
\u003cp class="lead text-left"\u003e✨\u003ca href="/cloud"\u003e\u003cb\u003eDekart Cloud\u003c/b\u003e\u003c/a\u003e. We host and manage Dekart instance for you. Free for single person use. Subscription plan for teams at the cost of self-hosting.\u003c/p\u003e
\u003cp\u003e⚙️ \u003ca href="https://cloud.dekart.xyz/"\u003eConfigure access to private BigQuery datasets\u003c/a\u003e
⚙️ \u003ca href="https://cloud.dekart.xyz/"\u003eConfigure access to private Snowflake datasets\u003c/a\u003e\u003c/p\u003e
\u003chr/\u003e
\u003cp class="lead text-left"\u003e\u003cb\u003e🏰 Self-hosted\u003c/b\u003e. You host the Dekart instance (open-source, MIT License) on your Google Cloud, AWS account or your server.
\u003cp\u003e👉 \u003ca href="/docs/"\u003eDocumentation\u003c/a\u003e.\u003c/p\u003e
\u003chr/\u003e
\u003ch2 id="requirements"\u003eRequirements\u003c/h2\u003e
\u003cp\u003e✨\u003cstrong\u003eDekart Cloud\u003c/strong\u003e:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eGoogle BigQuery or Snowflake data source\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003csmall\u003e⚙️ \u003ca href="https://cloud.dekart.xyz"\u003eConfigure\u003c/a\u003e\u003c/small\u003e\u003c/p\u003e
\u003cp\u003e🏰 \u003cstrong\u003eSelf-hosted\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003ePostgres DB (like Amazon RDS or Google Cloud SQL) to store metadata\u003c/li\u003e
\u003cli\u003eMapbox token to load the map\u003c/li\u003e
\u003cli\u003eAmazon S3 bucket or Google Cloud Storage bucket to store query cache\u003c/li\u003e
\u003cli\u003eAmazon Athena, Google BigQuery or Snowflake data source\u003c/li\u003e
\u003cli\u003eEnvironment to run docker container (for example, Google App Engine, Amazon ECS)\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eSecure self-hosted instance with SSO:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eAWS: \u003ca href="/docs/configuration/environment-variables/#user-authorization-via-amazon-load-balancer"\u003econfigure authorization with Amazon Cognito\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eGoogle Cloud: \u003ca href="/docs/configuration/environment-variables/#user-authorization-via-google-iap"\u003econfigure authorization with Google IAP\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:16,href:"https://dekart.xyz/docs/",title:"Documentation",description:"Dekart Documentation",content:""},{id:17,href:"https://dekart.xyz/docs/about/screencast/",title:"Dekart Screencast",description:"Screencast: Querying Chicago Crime Dataset from BigQuery Public Data",content:`\u003cimg class="img-simple img-fluid lazyload" src="https://dekart.xyz/docs/about/screencast/screencast_hubcb05f9855198997eaa919acc67d2bb4_11376295_20x0_resize_box.gif" data-src="https://dekart.xyz/docs/about/screencast/screencast.gif" width="1024" height="640" alt="Querying Chicago Crime Dataset from BigQuery Public Data"\u003e
\u003cdiv class="img-simple-caption"\u003eQuerying Chicago Crime Dataset from BigQuery Public Data\u003c/div\u003e

\u003cdiv class="text-center"\u003e
      \u003cp class="mt-5"\u003e\u003ca class="btn btn-primary" href="/docs/about/playground/" role="button"\u003eTry Live on Playground\u003c/a\u003e\u003c/p\u003e
      \u003cp\u003e\u003ca href="/docs/about/your-datasets/"\u003eUse with Private Datasets\u003c/a\u003e\u003c/p\u003e
    \u003c/div\u003e
`}];e.add(n),userinput.addEventListener("input",s,!0),suggestions.addEventListener("click",o,!0);function s(){var n,i=this.value,s=e.search(i,5),o=suggestions.childNodes,r=0,c=s.length;for(suggestions.classList.remove("d-none"),s.forEach(function(e){n=document.createElement("div"),n.innerHTML="<a href><span></span><span></span></a>",a=n.querySelector("a"),t=n.querySelector("span:first-child"),d=n.querySelector("span:nth-child(2)"),a.href=e.href,t.textContent=e.title,d.textContent=e.description,suggestions.appendChild(n)});o.length>c;)suggestions.removeChild(o[r])}function o(){for(;suggestions.lastChild;)suggestions.removeChild(suggestions.lastChild);return!1}})()