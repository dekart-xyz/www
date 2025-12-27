var suggestions=document.getElementById("suggestions"),userinput=document.getElementById("userinput");userinput&&document.addEventListener("keydown",inputFocus);function inputFocus(e){if(!userinput)return;e.keyCode===191&&(e.preventDefault(),userinput.focus()),e.keyCode===27&&(userinput.blur(),suggestions&&suggestions.classList.add("d-none"))}suggestions&&document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),suggestions&&document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){if(!suggestions)return;const s=suggestions.querySelectorAll("a"),o=[...s],t=o.indexOf(document.activeElement);let n=0;e.keyCode===38?(e.preventDefault(),n=t>0?t-1:0,s[n].focus()):e.keyCode===40&&(e.preventDefault(),n=t+1<o.length?t+1:t,s[n].focus())}(function(){var e=new FlexSearch({preset:"score",cache:!0,doc:{id:"id",field:["title","description","content"],store:["href","title","description"]}}),n=[{id:0,href:"https://dekart.xyz/docs/self-hosting/app-engine/",title:"Google App Engine",description:"Deploying Dekart to Google App Engine",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
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
`},{id:2,href:"https://dekart.xyz/docs/self-hosting/docker/",title:"Docker",description:"Running Dekart for BigQuery as in Docker",content:`








  
  
  
  








\u003cdiv class="dekart-cta-banner p-3 mb-3" \u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Save time. Get ready-to-use configs for \u003cb\u003eAWS\u003c/b\u003e and \u003cb\u003eGoogle Cloud\u003c/b\u003e
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="https://mailchi.mp/team/request-self-hosting-documentation?ref=deployment-templates" role="button"\u003eRequest Access\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

\u003ch2 id="requirements"\u003eRequirements\u003c/h2\u003e
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
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.19
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
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.19
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
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.19
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
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e	-e \u003cspan class="nv"\u003eDEKART_POSTGRES_DATASOURCE_CONNECTION\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DATASOURCE_CONNECTION\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CORS_ORIGIN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.19
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch2 id="example"\u003eExample\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eRun with \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile"\u003eMakefile\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eSee details on \u003ca href="/docs/configuration/environment-variables"\u003eenvironment variables\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:3,href:"https://dekart.xyz/docs/self-hosting/docker-compose/",title:"Docker Compose",description:"Run Dekart locally with docker-compose",content:`








  
  
  
  








\u003cdiv class="dekart-cta-banner p-3 mb-3" \u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Save time. Get ready-to-use configs for \u003cb\u003eAWS\u003c/b\u003e and \u003cb\u003eGoogle Cloud\u003c/b\u003e
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="https://mailchi.mp/team/request-self-hosting-documentation?ref=deployment-templates" role="button"\u003eRequest Access\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

\u003ch2 id="aws-athena"\u003eAWS Athena\u003c/h2\u003e
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
\u003c/code\u003e\u003c/pre\u003e`},{id:4,href:"https://dekart.xyz/docs/self-hosting/upgrade/",title:"Upgrade to new version",description:"How to upgrade and migration notes",content:`








  
  
  
  








\u003cdiv class="dekart-cta-banner p-3 mb-3" \u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Save time. Get ready-to-use configs for \u003cb\u003eAWS\u003c/b\u003e and \u003cb\u003eGoogle Cloud\u003c/b\u003e
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="https://mailchi.mp/team/request-self-hosting-documentation?ref=deployment-templates" role="button"\u003eRequest Access\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

\u003ch2 id="before-you-begin"\u003eBefore you begin\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003e
\u003cp\u003eBack up your Postgres database before upgrading Dekart. On the first run, Dekart applies migrations to the database and you won\u0026rsquo;t be able to downgrade.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eDo not skip version when upgrading. For example, never go from \u003ccode\u003e0.17 → 0.19\u003c/code\u003e\u003c/p\u003e
\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="migration-instructions"\u003eMigration instructions\u003c/h2\u003e
\u003cp\u003eUpdate the docker tag.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.18\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.19\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003eYou must now explicitly set both \u003ccode\u003eDEKART_STORAGE\u003c/code\u003e and \u003ccode\u003eDEKART_DATASOURCE\u003c/code\u003e.
Dekart 0.19 will refuse to start if these two variables are not set.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.17\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.18\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eNote:\u003c/strong\u003e when authentication enabled, all current users and maps will be migrated to \u0026ldquo;Default\u0026rdquo; workspace. You can manage and rename via UX afterwards.
To fine-tune workspace permissions and default roles, we’ve added following configuration variables\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003eDEKART_ALLOW_WORKSPACE_CREATION\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eWhen set to \u003ccode\u003etrue\u003c/code\u003e, users can create new workspaces. Set to \u003ccode\u003efalse\u003c/code\u003e new users will be automatically added to Default workspace.\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ADMIN\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eEmail that designates a default admin for Default workspace. When not provided all new users will be Admin. When provided all users will be viewers, unless specified differently with \u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ROLE\u003c/code\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ROLE\u003c/code\u003e\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eRole assigned by default to new users (e.g., \u003ccode\u003eviewer\u003c/code\u003e, \u003ccode\u003eeditor\u003c/code\u003e, \u003ccode\u003eadmin\u003c/code\u003e). Requires \u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ADMIN\u003c/code\u003e to be specified\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003e\u003ccode\u003edekartxyz/dekart:0.16\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.17\u003c/code\u003e\u003c/strong\u003e
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.\u003c/p\u003e
\u003cp\u003eNote, after update private reports will not be available to other users. You need to give access explicitly in new Share dialog.\u003c/p\u003e
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
\u003c/code\u003e\u003c/pre\u003e`},{id:8,href:"https://dekart.xyz/docs/about/ev-charging-analytics/",title:"EV Charging Analytics Maps",description:"Explore how to plan smarter EV charging infrastructure using open and premium data.",content:`\u003cp\u003eThis curated collection of interactive maps—built with SQL in BigQuery and Snowflake—helps analysts, planners, and EV operators uncover high-opportunity locations, optimize deployments, and benchmark market presence.\u003c/p\u003e
\u003ch3 id="where-ev-drivers-risk-running-empty"\u003eWhere EV Drivers Risk Running Empty\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eMap created by DLP Labs\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_512x0_resize_box_3.png 512w"
    width="3044"
    height="1986"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c_hu03fbf7de7ccfee414ca0fd713f2d8c1b_1341189_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/c440beac-5858-43b6-8ce2-5773e976485c.png" width="3044" height="1986" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/c440beac-5858-43b6-8ce2-5773e976485c/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map highlights where EV drivers risk running empty — locations where Teslas dropped below 25% state of charge (SoC) while more than 30 km from their “home base.”\u003c/p\u003e
\u003cp\u003eThe dataset is built from DLP Connected Tesla telemetry (May 21–June 18, 2025). For each vehicle, the primary anchor (where most trips begin) is identified, then low-SoC events away from that anchor are aggregated into H3 hexagons.\u003c/p\u003e
\u003cp\u003eEach hex includes key fields:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003evehicleId_nunique\u003c/strong\u003e – unique vehicles observed with low SoC\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003etrip_count\u003c/strong\u003e – number of low-SoC trips (\u0026gt;30 km from anchor)\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003esoc_ffill_min / 50 / 90\u003c/strong\u003e – min, median, and 90th percentile SoC observed\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eEV registrations \u0026amp; coverage\u003c/strong\u003e – regional EV counts and estimated % captured\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eThis lets charging operators spot demand hotspots, quantify risk, and prioritize investments in locations where drivers most need support.\u003c/p\u003e
\u003ch3 id="electric-vehicle-ownership-affinity-index"\u003eElectric Vehicle Ownership Affinity Index\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eDataset provided by Echo Analytics.\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_512x0_resize_box_3.png 512w"
    width="3216"
    height="2080"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6_hu66578941326ae447ba92d5cb30a6526c_3351260_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/ad09c66c-9389-4810-bc61-09258d2b3ee6.png" width="3216" height="2080" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/ad09c66c-9389-4810-bc61-09258d2b3ee6/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map visualizes \u003cem\u003eelectric vehicle (EV) adoption\u003c/em\u003e in France using the \u003cstrong\u003eEV Affinity Index\u003c/strong\u003e, which shows how concentrated EV ownership is in each postcode compared to national and regional averages.\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eDarker green\u003c/strong\u003e = Above-average adoption\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eLighter green/white\u003c/strong\u003e = Below-average adoption\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eData sources (Google BigQuery):\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003e• \u003cem\u003eEV Ownership – Echo Analytics\u003c/em\u003e
\u003ccode\u003edekart-data-samples.echo_analytics.electric_vehicle_owners\u003c/code\u003e
– \u003ccode\u003epostcode\u003c/code\u003e, \u003ccode\u003eaffinity_index_nation\u003c/code\u003e, \u003ccode\u003eaffinity_index_region\u003c/code\u003e\u003c/p\u003e
\u003cp\u003e• \u003cem\u003eGeolocation – Overture Maps\u003c/em\u003e
\u003ccode\u003ebigquery-public-data.overture_maps.address\u003c/code\u003e
– \u003ccode\u003epostcode\u003c/code\u003e, \u003ccode\u003egeometry\u003c/code\u003e\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eJoining process:\u003c/strong\u003e\u003c/p\u003e
\u003col\u003e
\u003cli\u003eFilter relevant postcodes from EV dataset\u003c/li\u003e
\u003cli\u003eGet coordinates from Overture Maps\u003c/li\u003e
\u003cli\u003eJoin on \u003ccode\u003epostcode\u003c/code\u003e\u003c/li\u003e
\u003cli\u003eSample 4% for performance using \u003ccode\u003eRAND() \u0026lt;= 0.04\u003c/code\u003e\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003e\u003cstrong\u003eHow to interpret the map:\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003e• \u003cstrong\u003eAffinity Index \u0026gt; 1.19\u003c/strong\u003e → High EV adoption (ideal for expanding charging networks)
• \u003cstrong\u003e0.75 – 1.19\u003c/strong\u003e → Average adoption
• \u003cstrong\u003e\u0026lt; 0.75\u003c/strong\u003e → Low adoption (could signal access or infrastructure challenges)\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eUse cases:\u003c/strong\u003e\u003c/p\u003e
\u003cp\u003e• Plan EV charging infrastructure
• Target high-affinity areas for EV marketing
• Guide policy or incentives in low-adoption regions\u003c/p\u003e
\u003ch3 id="ev-charging-demand-vs-supply"\u003eEV Charging Demand vs Supply\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eDataset provided by Data Appeal.\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_512x0_resize_box_3.png 512w"
    width="3216"
    height="2080"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a_hu66578941326ae447ba92d5cb30a6526c_2449435_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/4945121f-c277-474f-a9bb-3420292b466a.png" width="3216" height="2080" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/4945121f-c277-474f-a9bb-3420292b466a/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map reveals the \u003cem\u003espatial gap between charging demand and existing EV charger locations\u003c/em\u003e in central Paris, using \u003cstrong\u003ePOI-based demand signals\u003c/strong\u003e from Data Appeal.\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eOrange points\u003c/strong\u003e = EV charging stations (\u003ccode\u003evehicle_charging_station\u003c/code\u003e)\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eCyan points\u003c/strong\u003e = All other POIs (for density and land-use context)\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eExtruded hexagons\u003c/strong\u003e = Aggregated \u003cem\u003eEV-relevant demand\u003c/em\u003e, based on:
\u003ccode\u003eev_relevance_popularity = popularity * category_weight\u003c/code\u003e
\u003cem\u003e(Weights reflect how likely a POI type supports charging — e.g., higher for gyms/cafés, lower for banks.)\u003c/em\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eHexagon colors\u003c/strong\u003e show the demand-to-supply ratio:
\u003ccode\u003erelevance_per_charger = SUM(ev_relevance_popularity) / (COUNT(chargers) + 1)\u003c/code\u003e
This highlights areas with \u003cem\u003ehigh EV activity but few existing chargers\u003c/em\u003e.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eWhy this matters:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eCombines human behavior (POI popularity) with real charger locations\u003c/li\u003e
\u003cli\u003eHighlights \u0026ldquo;opportunity charging zones\u0026rdquo; — where people dwell and could charge\u003c/li\u003e
\u003cli\u003eUses H3 hexagons (~100m) for granular urban planning\u003c/li\u003e
\u003cli\u003eCategory weights are based on actual EV user behavior and EU mobility studies\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eData sources:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003edekart-data-samples.datappeal_2.poi_data\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003edekart-data-samples.datappeal_2.poi_characterization\u003c/code\u003e\u003c/li\u003e
\u003cli\u003ePOI category weights (custom, based on research)\u003c/li\u003e
\u003cli\u003eH3 indexing via \u003ccode\u003ebqcarto.h3.LONGLAT_ASH3\u003c/code\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eUse cases:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eIdentify underserved high-demand areas for new chargers\u003c/li\u003e
\u003cli\u003eModel demand from urban amenities\u003c/li\u003e
\u003cli\u003eLayer with EV adoption or grid data for planning\u003c/li\u003e
\u003cli\u003eTrack shifts in demand/supply over time\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="ev-charging-competition-analysis"\u003eEV Charging Competition Analysis\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eDataset provided by MyTraffic.\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_512x0_resize_box_3.png 512w"
    width="3216"
    height="2080"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242_hu66578941326ae447ba92d5cb30a6526c_1985728_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/1966a88e-4afc-4747-88cf-13db220be242.png" width="3216" height="2080" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/1966a88e-4afc-4747-88cf-13db220be242/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map shows the \u003cem\u003espatial distribution of EV chargers\u003c/em\u003e in Paris using \u003cstrong\u003eMyTraffic data\u003c/strong\u003e, visualized with \u003cstrong\u003eH3 hexagons\u003c/strong\u003e to analyze charger density and brand dominance.\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eDarker hexagons\u003c/strong\u003e = Higher charger density\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003ePoint symbols\u003c/strong\u003e = Individual stations by brand, size, or power\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eLayer descriptions:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cem\u003eCharger Density (H3)\u003c/em\u003e – Charging points per km²\u003c/li\u003e
\u003cli\u003e\u003cem\u003eTop Brand (H3)\u003c/em\u003e – Most common brand in each hex\u003c/li\u003e
\u003cli\u003e\u003cem\u003eBy Brand (Points)\u003c/em\u003e – Station locations grouped by provider\u003c/li\u003e
\u003cli\u003e\u003cem\u003eBy Count (Points)\u003c/em\u003e – Sized by number of ports\u003c/li\u003e
\u003cli\u003e\u003cem\u003eBy Power (Points)\u003c/em\u003e – Sized by maximum charging power\u003c/li\u003e
\u003cli\u003e\u003cem\u003eParis (GeoJSON)\u003c/em\u003e – City boundary reference\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eKey insights:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eHigh charger density in central Paris\u003c/strong\u003e\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eBrand competition varies by area\u003c/strong\u003e, showing localized leadership\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003ePeripheral areas\u003c/strong\u003e show gaps with potential for expansion\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eData sources:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003eMyTraffic EV charging data\u003c/code\u003e\u003c/li\u003e
\u003cli\u003eH3 processing via Snowflake\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eUse cases:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eSpot underserved zones for network growth\u003c/li\u003e
\u003cli\u003eBenchmark charger brands by geography\u003c/li\u003e
\u003cli\u003eGuide investment or partnership strategies\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="ev-charger-proximity-analysis-uk-highways"\u003eEV Charger Proximity Analysis (UK Highways)\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eDataset from Overture Maps.\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_512x0_resize_box_3.png 512w"
    width="4032"
    height="2302"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81_hu0ddbb4de5879976c9feeaba6bf7a7891_2345589_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/b33117ab-567d-4f86-877a-3dee828f8a81.png" width="4032" height="2302" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/b33117ab-567d-4f86-877a-3dee828f8a81/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map shows \u003cem\u003eEV charger density along major UK roads\u003c/em\u003e, highlighting how many charging stations are within 50 km of each motorway or trunk segment.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eDarker lines\u003c/strong\u003e = More nearby chargers
\u003cstrong\u003eLighter lines\u003c/strong\u003e = Fewer or none\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eWhat’s measured:\u003c/strong\u003e
Each road segment is scored by the \u003cstrong\u003enumber of EV charging stations\u003c/strong\u003e located within a 50 km radius.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eHow it works:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eDefines the UK boundary using Overture Maps divisions\u003c/li\u003e
\u003cli\u003eSelects \u003cem\u003emotorways\u003c/em\u003e and \u003cem\u003etrunk roads\u003c/em\u003e only\u003c/li\u003e
\u003cli\u003eFilters POIs categorized as EV charging stations\u003c/li\u003e
\u003cli\u003eCounts stations within 50 km of each road segment\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eData sources:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003eOVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA\u003c/code\u003e – UK boundary\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eOVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT\u003c/code\u003e – Road geometry and metadata\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eOVERTURE_MAPS__PLACES.CARTO.PLACE\u003c/code\u003e – Charging station locations\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eUse cases:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eIdentify highway segments underserved by EV infrastructure\u003c/li\u003e
\u003cli\u003eGuide national charging network expansion\u003c/li\u003e
\u003cli\u003eSupport EV readiness assessments across transport corridors\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="ev-charging-density--by-country-overture-maps--h3"\u003eEV Charging Density – by Country (Overture Maps + H3)\u003c/h3\u003e
\u003cp\u003e\u003cem\u003eDataset from Overture Maps.\u003c/em\u003e\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_512x0_resize_box_3.png 512w"
    width="4032"
    height="2302"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778_hu9e4e5efda51617e47a32bbfd60ee4292_2113901_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/ev-charging-analytics/25ffca56-bf81-45e2-8d8b-03be637f3778.png" width="4032" height="2302" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e



\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/98071bc3-1707-43ee-9d67-041d7c89fcb9/source?ref=view-map-and-data" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View map and data
\u003c/a\u003e
\u003c/p\u003e



\u003cp\u003eThis map shows \u003cem\u003ethe distribution of EV charging stations\u003c/em\u003e within a selected country using \u003cstrong\u003eH3 hexagons\u003c/strong\u003e for spatial aggregation.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eTaller hexagons\u003c/strong\u003e = More EV charging stations
\u003cstrong\u003eDarker stroke colors\u003c/strong\u003e = Country boundary for geographic context\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eWhat’s measured:\u003c/strong\u003e
EV charging stations are counted within \u003cstrong\u003eH3 hexagons\u003c/strong\u003e (resolution 7 ≈ 1 km²) based on POI data. Results are sorted by station density.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eHow it works:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eFilters country boundaries from \u003ccode\u003eoverture_maps.division_area\u003c/code\u003e using a country code\u003c/li\u003e
\u003cli\u003eSelects POIs categorized as EV charging stations\u003c/li\u003e
\u003cli\u003eApplies \u003ccode\u003eST_WITHIN()\u003c/code\u003e to include only stations inside the country\u003c/li\u003e
\u003cli\u003eAggregates station counts into H3 cells via \u003ccode\u003ebqcarto.h3.ST_ASH3()\u003c/code\u003e\u003c/li\u003e
\u003cli\u003eOrders by density for analysis or visualization\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eData sources:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003ebigquery-public-data.overture_maps.division_area\u003c/code\u003e – Country geometry\u003c/li\u003e
\u003cli\u003e\u003ccode\u003ebigquery-public-data.overture_maps.place\u003c/code\u003e – Charging station locations\u003c/li\u003e
\u003cli\u003eH3 spatial indexing via \u003ccode\u003ebqcarto.h3.ST_ASH3\u003c/code\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eUse cases:\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eCompare charging infrastructure density across regions\u003c/li\u003e
\u003cli\u003eIdentify high- and low-coverage areas within a country\u003c/li\u003e
\u003cli\u003eSupport infrastructure planning and investment decisions\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003e\u003cstrong\u003eTo run for another country:\u003c/strong\u003e
Replace \u003ccode\u003e{{country}}\u003c/code\u003e with a valid 2-letter ISO code (e.g., \u003ccode\u003eDE\u003c/code\u003e, \u003ccode\u003eFR\u003c/code\u003e, \u003ccode\u003eIT\u003c/code\u003e)\u003c/p\u003e
\u003ch2 id="want-to-build-similar-maps"\u003eWant to build similar maps?\u003c/h2\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://calendly.com/vladi-dekart/30min?ref=book-ev-charging-demo" role="button"\u003eBook a free demo\u003c/a\u003e\u003c/p\u003e
\u003cp\u003e\u003cem\u003eBook a free demo\u003c/em\u003e: we’ll walk you through the process, help customize your data, and show how to spin off maps in minutes.\u003c/p\u003e
`},{id:9,href:"https://dekart.xyz/docs/about/map-templates/",title:"Reusable Map Templates",description:"Collection of reusable Dekart Maps for your analytics projects",content:`\u003ch2 id="what-is-a-map-template"\u003eWhat is a Map Template?\u003c/h2\u003e
\u003cp\u003eA Map Template is a reusable Dekart Map that you can use as a starting point for your analytics projects. Each Map Template is designed to help you quickly visualize your data and answer common business questions. Map Templates utilize Dekart\u0026rsquo;s query parameters to make it easy to customize the map to your specific needs.\u003c/p\u003e
\u003ch2 id="templates"\u003eTemplates\u003c/h2\u003e
\u003ch3 id="osm-vs-overture-maps--compare-bike-lane-coverage"\u003eOSM vs Overture Maps – Compare Bike Lane Coverage\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_512x0_resize_box_3.png 512w"
    width="2768"
    height="2036"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502_huc0563c5f6ac939a1614c238afd308de4_2022917_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/map-templates/62130325-9fc7-4687-ac05-52f6b7513502.png" width="2768" height="2036" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e




\u003cp class="view-on-map-template"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/62130325-9fc7-4687-ac05-52f6b7513502/source?ref=dekart-xyz-view-template" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  → Use This Template
\u003c/a\u003e
\u003c/p\u003e


\u003cp\u003eThis template lets you visualize and compare bike lane coverage in any city by pulling data from both OpenStreetMap (OSM) and Overture Maps. Simply choose a city (and country code) to see which streets have dedicated cycle paths—and whether certain lane tags (like cycleway:left) appear in one dataset but not the other. It’s ideal for data analysts, urban planners, or anyone curious about how well bike lanes are mapped in their area.\u003c/p\u003e
\u003cp\u003eRequires: \u003csmall class="badge badge-info"\u003eBigQuery Account\u003c/small\u003e\u003c/p\u003e
\u003ch3 id="city-boundaries-by-name--resolve-duplicate-cities"\u003eCity Boundaries by Name – Resolve Duplicate Cities\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_512x0_resize_box_3.png 512w"
    width="2342"
    height="1802"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848_hucb2b0f385e888dc1271fc0ecd3189f92_1178907_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/map-templates/a75befda-e8d9-4771-b644-a2f2e6d44848.png" width="2342" height="1802" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e




\u003cp class="view-on-map-template"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/a75befda-e8d9-4771-b644-a2f2e6d44848/source?ref=dekart-xyz-view-template" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  → Use This Template
\u003c/a\u003e
\u003c/p\u003e


\u003cp\u003eThis template queries city boundaries from the Overture Maps dataset in BigQuery—even if multiple cities share the same name. It fetches all matching boundaries, counts the Points of Interest (POIs) in each, and returns the boundary with the highest POI count as the “most relevant” city. Perfect for data analysts and data scientists who need accurate location context without diving into specialized GIS tools.\u003c/p\u003e
\u003cp\u003eRequires: \u003csmall class="badge badge-info"\u003eBigQuery Account\u003c/small\u003e\u003c/p\u003e
`},{id:10,href:"https://dekart.xyz/docs/about/overture-maps-examples/",title:"BigQuery Overture Maps Examples",description:"Collection of kepler.gl maps created from Overture Data in BigQuery public dataset using SQL and Dekart.",content:`\u003cp\u003eCollection of kepler.gl maps created from Overture Data in BigQuery public dataset using BigQuery SQL and Dekart. Each example includes a SQL query and a visualized map.\u003c/p\u003e
\u003cdiv class="gpt" \u003e
  \u003cp\u003eAll examples are created with \u003cb\u003eOverture Maps GPT\u003c/b\u003e\u003c/p\u003e\u003cp\u003e\u003ca href="https://chatgpt.com/g/g-onSLtzQQB-overture-maps-gpt?ref=gpt-link" class="btn btn-outline-primary" target="_blank"\u003eGet it Free\u003c/a\u003e\u003c/p\u003e
\u003c/div\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/77dc6f7f-c91c-4099-8dc3-8f043d46cdfb/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/410b857a-aad1-4f05-8ddd-551d0f0fe650/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/410b857a-aad1-4f05-8ddd-551d0f0fe650/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/db0e26c2-00b0-4f6b-8f21-a26ab312f9e1/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/a4e308a3-b2e8-4183-bfd6-b68866209f50/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/a4e308a3-b2e8-4183-bfd6-b68866209f50/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/eb5b25bf-4c62-44bc-9e69-f0257134e3f8/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/eb5b25bf-4c62-44bc-9e69-f0257134e3f8/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="joining-gps-probes-with-road-geometry"\u003eJoining GPS probes with road geometry\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_512x0_resize_box_3.png 512w"
    width="1626"
    height="1286"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5_hu645266989d122e33f3b4a5a29e37a9af_1698567_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/8693cbeb-8369-4f38-91a4-5638589998e5.png" width="1626" height="1286" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/8693cbeb-8369-4f38-91a4-5638589998e5/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Step 1: Generate H3 indexes for road geometries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebrandenburg_gate\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_GEOGPOINT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="mi"\u003e13\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e3777\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e52\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e5163\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003elocation\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003eroad_segments\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esegment\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_DISTANCE\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003elocation\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebrandenburg_gate\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e10000\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003eroad_h3_cells\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e         \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Include geometry in the result
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e         \u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eST_LINEINTERPOLATEPOINT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eratio\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e12\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_segments\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eGENERATE_ARRAY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e01\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eratio\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Generate H3 for road geometries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 2: Generate H3 indexes for dekart-dev.strava.streams points
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003estrava_h3_cells\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eLONGLAT_ASH3\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elng\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elat\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e12\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evelocity_smooth\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003edekart\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="n"\u003edev\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003estrava\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003estreams\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_DISTANCE\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_GEOGPOINT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elng\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elat\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003elocation\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebrandenburg_gate\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e10000\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 3: Join road geometries with strava points based on H3 index
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eroad_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eANY_VALUE\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Use ANY_VALUE() to select a representative geometry
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eCOUNT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enum_strava_points\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAVG\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003evelocity_smooth\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eavg_velocity_smooth\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eMAX\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003evelocity_smooth\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003emax_velocity_smooth\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_h3_cells\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eLEFT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003estrava_h3_cells\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eroad_id\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/8693cbeb-8369-4f38-91a4-5638589998e5/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/5f7144cd-24f0-4698-ba7e-a63e872a4659/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;Berlin\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DE\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/5f7144cd-24f0-4698-ba7e-a63e872a4659/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/ffbe0a05-7794-465c-ab5b-de54d69cdb38/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/ffbe0a05-7794-465c-ab5b-de54d69cdb38/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/34d0ba2c-0fd5-4323-a677-d5b05b65d86d/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esurface\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003elevel\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eland_use\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_GEOGFROMTEXT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;POLYGON((13.08835 52.33826, 13.76116 52.33826, 13.76116 52.67551, 13.08835 52.67551, 13.08835 52.33826))\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;playground\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/34d0ba2c-0fd5-4323-a677-d5b05b65d86d/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/8cb1566f-0237-4d99-9cc4-bdd70859763a/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/8cb1566f-0237-4d99-9cc4-bdd70859763a/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/f0941a67-350f-4a80-a9d0-27594f2f853d/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/f0941a67-350f-4a80-a9d0-27594f2f853d/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/af836766-9ec4-40fc-afbe-fc6b32d6593b/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/af836766-9ec4-40fc-afbe-fc6b32d6593b/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
\u003ca href="https://cloud.dekart.xyz/reports/72781fb6-8bc5-4c41-839f-66f5bcf7c122/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
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
    
        \u003ca href='https://cloud.dekart.xyz/reports/72781fb6-8bc5-4c41-839f-66f5bcf7c122/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="uk-pubs-density"\u003eUK pubs density\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_512x0_resize_box_3.png 512w"
    width="1288"
    height="1032"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b_hu86f80945e5999c57c07b5917fb4c39f0_562101_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/overture-maps-examples/3205a875-b5d7-4458-a0b9-74fdeb49a44b.png" width="1288" height="1032" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/3205a875-b5d7-4458-a0b9-74fdeb49a44b/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eLOWER\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;gb\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;country\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;land\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003epubs\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003enames\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplace\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecategories\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eprimary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;pub\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e8\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eCOUNT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eid\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epub_count\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epubs\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3_index\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eORDER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epub_count\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDESC\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/3205a875-b5d7-4458-a0b9-74fdeb49a44b/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
`},{id:11,href:"https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/",title:"Snowflake Kepler.gl Maps Examples",description:"Collection of Kepler.gl maps examples created with Snowflake public dataset using SQL.",content:`\u003cp\u003eCollection of kepler.gl maps created from Overture Data in Snowflake public dataset using SQL and Dekart.\u003c/p\u003e
\u003ch2 id="overture-maps"\u003eOverture Maps\u003c/h2\u003e
\u003ch3 id="nevada-roads-by-speed-and-class"\u003eNevada Roads by Speed and Class\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_512x0_resize_box_3.png 512w"
    width="1250"
    height="886"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef_hu1108a87f97eb08ee0b1af28a2bc19905_932600_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/f392b7ab-b64a-43f3-b100-650eb7b8fdef.png" width="1250" height="886" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/f392b7ab-b64a-43f3-b100-650eb7b8fdef/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Step 1: Get the geometry of Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__DIVISIONS\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eDIVISION_AREA\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US-NV\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 2: Select roads within Nevada with non-empty speed limits
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eST_ASWKT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eSPEED_LIMITS\u003c/span\u003e\u003cspan class="p"\u003e:\u003c/span\u003e\u003cspan class="n"\u003elist\u003c/span\u003e\u003cspan class="p"\u003e[\u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="p"\u003e].\u003c/span\u003e\u003cspan class="n"\u003eelement\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003emax_speed\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e::\u003c/span\u003e\u003cspan class="n"\u003eSTRING\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003espeed_limit\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__TRANSPORTATION\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eSEGMENT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003enevada_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;road\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eclass\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eNOT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;track\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;driveway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;path\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;footway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;sidewalk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;pedestrian\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;cycleway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;steps\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;crosswalk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;bridleway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;alley\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eng\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/f392b7ab-b64a-43f3-b100-650eb7b8fdef/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="uk-ev-charging-stations-density"\u003eUK EV charging stations density\u003c/h3\u003e
\u003cp\u003eUK highways colored by number of EV charging stations within 50 km\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_512x0_resize_box_3.png 512w"
    width="1252"
    height="914"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81_hu61424b41e1f2edf7de90982b3535dfa1_367724_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/snowflake-kepler-gl-examples/b33117ab-567d-4f86-877a-3dee828f8a81.png" width="1252" height="914" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e





\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Step 1: Define the UK boundary as a geographic region
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__DIVISIONS\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eDIVISION_AREA\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eCOUNTRY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;GB\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Filter to select only the boundaries of the UK
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eSUBTYPE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;country\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Assuming \u0026#39;SUBTYPE\u0026#39; helps filter specifically the outer boundary of the country
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 2: Select major road segments (e.g., motorways, trunk roads) that intersect the UK boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003eroad_segments\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eNAMES\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eID\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Select geometry, names, and unique road ID
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__TRANSPORTATION\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eSEGMENT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eub\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eub\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Check if road segments intersect with the UK boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003es\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eCLASS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;motorway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;trunk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Filter to include only major roads like motorways and trunk roads
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 3: Select EV charging stations that are contained within the UK boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003echarging_stations\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__PLACES\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCARTO\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ePLACE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euk_boundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eub\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_CONTAINS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eub\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure the charging stations are within the UK boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eCATEGORIES\u003c/span\u003e\u003cspan class="p"\u003e::\u003c/span\u003e\u003cspan class="nb"\u003eTEXT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eILIKE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;%charging%\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Filter places categorized as EV charging stations
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 4: Count the number of charging stations within a 50 km radius of each road segment
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003echarging_count\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eID\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Use road ID for grouping
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e           \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eNAMES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_name\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Include the road name for context
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e           \u003c/span\u003e\u003cspan class="k"\u003eCOUNT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ecs\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003enum_charging_stations\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Count the number of charging stations near the road
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_segments\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eLEFT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003echarging_stations\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecs\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_DISTANCE\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecs\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e50000\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Check if charging stations are within 50 km of the road
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eID\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eNAMES\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Group by road ID and name to aggregate the count of charging stations
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Step 5: Return the final results, including road ID, name, geometry, and the number of nearby charging stations
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eID\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003eNAMES\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_ASWKT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eGEOMETRY\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecc\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003enum_charging_stations\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eroad_segments\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003echarging_count\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecc\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003er\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eID\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecc\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eroad_id\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Join with the previous result set to match road details with charging station counts
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e`},{id:12,href:"https://dekart.xyz/docs/about/kepler-gl-map-examples/",title:"BigQuery Kepler.gl Maps Examples",description:"Kepler.gl maps examples created on Dekart with public BigQuery datasets, Overture Data, and OpenStreetMap data",content:`\u003cp\u003eDekart allows user create and share Kepler.gl maps from private and public BigQuery datasets, using SQL. It works particularly well with BigQuery GIS functions.\u003c/p\u003e
\u003ch2 id="population-density"\u003ePopulation density\u003c/h2\u003e
\u003cp\u003eVisualize population density anywhere in the world and at any level of detail\u003c/p\u003e
\u003ch3 id="eu-population-density"\u003eEU Population Density\u003c/h3\u003e
\u003cfigure\u003e
    \u003cimg
      class="img-fluid lazyload"
      data-sizes="auto"
      src="https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_20x0_resize_box_3.png"
      data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_512x0_resize_box_3.png 512w"
      width="1908"
      height="1024"
      
    \u003e
    \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc_hu08edd5485b5ef10e1e7e666dba395d32_1909621_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/a70515ee-ecbb-4aac-8ce1-cf508483e2dc.png" width="1908" height="1024" \u003e\u003c/noscript\u003e
    
  \u003c/figure\u003e
  
  
  \u003cp class="view-on-map"\u003e
  \u003ca href="https://cloud.dekart.xyz/reports/a70515ee-ecbb-4aac-8ce1-cf508483e2dc/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
    View interactive map
  \u003c/a\u003e
  \u003c/p\u003e
  
  
  

\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- CTE for retrieving the latest population data for each geo_id in specified countries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elatest_population\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eMAX\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Finds the most recent update date for each geo_id
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ealpha_3_code\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;CYP\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;CZE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DNK\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;EST\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FIN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FRA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DEU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;GRC\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;HUN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;IRL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ITA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LVA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LTU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LUX\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;MLT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;NLD\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;POL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;PRT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ROU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SVK\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SVN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ESP\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SWE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;AUT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;BEL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;BGR\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;HRV\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;NOR\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Filters for a list of European countries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- CTE to join the latest population data with the population grid
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003ecurrent_population\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeog\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003elatest_population\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elatest_population\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elatest_population\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Joins on the most recent data point
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- CTE to create H3 indices for each geographic location at resolution 7
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003eh3_indices\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ecurrent_population\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCROSS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ebqcarto\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eST_ASH3_POLYFILL\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003ep\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeog\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e7\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Uses the H3 polyfill to convert geographies to H3 indices
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Main SELECT statement to sum population by H3 index
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSUM\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="c1"\u003e-- Aggregates population by H3 index
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eh3_indices\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eh3\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/a70515ee-ecbb-4aac-8ce1-cf508483e2dc/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="population-over-10k-in-eu"\u003ePopulation over 10k in EU\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_512x0_resize_box_3.png 512w"
    width="1546"
    height="902"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6_hue2da10de2624cb86a3ff1cbed87ef115_277321_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b099fbd3-d0ae-4636-aa44-217c0bac53f6.png" width="1546" height="902" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/b099fbd3-d0ae-4636-aa44-217c0bac53f6/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003ewith\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elatest\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003emax\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003ealpha_3_code\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ein\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;CYP\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;CZE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DNK\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;EST\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FIN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FRA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DEU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;GRC\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;HUN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;IRL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ITA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LVA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LTU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;LUX\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;MLT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;NLD\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;POL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;PRT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ROU\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SVK\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SVN\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ESP\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;SWE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;AUT\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;BEL\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;BGR\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;HRV\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eand\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026gt;\u003c/span\u003e\u003cspan class="mi"\u003e10000\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003egroup\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eby\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003egeog\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elatest\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elatest\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eand\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elatest\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/b099fbd3-d0ae-4636-aa44-217c0bac53f6/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="berlin-population-density"\u003eBerlin Population Density\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_512x0_resize_box_3.png 512w"
    width="1852"
    height="1152"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9_hu1f418268434269d6ff1b9934c9e0b589_412163_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/f4c55a02-88a1-4a38-a8ab-48a6237dfee9.png" width="1852" height="1152" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/f4c55a02-88a1-4a38-a8ab-48a6237dfee9/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Common Table Expression (CTE) to define boundaries based on specific tags
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003efeatures\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Filtering for features in Berlin, Germany using ISO3166-2 tags
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-2\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DE-BE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Additional filtering for administrative level
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;admin_level\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;4\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- CTE to get the latest population data intersecting with the defined boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003epopulation_latest\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eMAX\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- Checking for intersections between population grid and boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeog\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eGROUP\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eBY\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Main SELECT to retrieve geographical data and population
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003egeog\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epopulation\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eworldpop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003epopulation_grid_1km\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epopulation_latest\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Joining on geo_id and last_updated to filter the latest data points
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epopulation_latest\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_id\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003epopulation_latest\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epop\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elast_updated\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
      
          \u003ca href='https://cloud.dekart.xyz/reports/f4c55a02-88a1-4a38-a8ab-48a6237dfee9/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
              Open query in editor
            \u003c/a\u003e
  
  \u003c/p\u003e
\u003ch2 id="overture-maps"\u003eOverture Maps\u003c/h2\u003e
\u003cp\u003eExamples of Kepler.gl maps created using Overture Data in BigQuery, focusing on geospatial visualizations from the segment, division_area, land_use, and place tables.\u003c/p\u003e
\u003cp\u003e👉 \u003ca href="/docs/about/overture-maps-examples/"\u003eOverture Map Example\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="openstreetmap"\u003eOpenStreetMap\u003c/h2\u003e
\u003cp\u003eExamples of extracting and creating kepler.gl maps from OpenStreetMap data in BigQuery public dataset\u003c/p\u003e
\u003ch3 id="all-german-schools-from-osm-data"\u003eAll German schools from OSM data\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_512x0_resize_box_3.png 512w"
    width="1846"
    height="1040"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389_hub7af7b367d4ababbbd4c846ad30be622_799651_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/e539b5f6-cec2-45d5-97b3-d5bf541a9389.png" width="1846" height="1040" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/e539b5f6-cec2-45d5-97b3-d5bf541a9389/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003ewith\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;boundary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;administrative\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;admin_level\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;2\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-1\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;DE\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;amenity\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;school\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eselect\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ejoin\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eon\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/e539b5f6-cec2-45d5-97b3-d5bf541a9389/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="all-roads-in-nevada-excluding-parking-and-service-roads-26mb"\u003eAll roads in Nevada excluding parking and service roads (26Mb)\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_512x0_resize_box_3.png 512w"
    width="2228"
    height="1056"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2_hu9a08576d426dabb0b88ef0752e93223c_1046527_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/556330cb-e7ba-4e34-89df-5644cd0ec8b2.png" width="2228" height="1056" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/556330cb-e7ba-4e34-89df-5644cd0ec8b2/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Create a CTE (Common Table Expression) named \u0026#39;boundary\u0026#39; to define the geographical boundaries for Nevada (US-NV)
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;boundary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;administrative\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Select features marked as administrative boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-2\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US-NV\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Focus on features tagged specifically for Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eLIMIT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure only one boundary is selected, assuming it\u0026#39;s the outermost boundary of Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eways\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeom\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_ways\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eways\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_Intersects\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eways\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eways\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;highway\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;motorway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;trunk\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;primary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;secondary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;tertiary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;unclassified\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;residential\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eNOT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eEXISTS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eways\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;service\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;parking_aisle\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;driveway\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;parking_lot\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;service\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/556330cb-e7ba-4e34-89df-5644cd0ec8b2/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="every-parking-lot-in-nevada-from-the-osm"\u003eEvery parking lot in Nevada from the OSM\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_512x0_resize_box_3.png 512w"
    width="2124"
    height="1244"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e_hu05720d78bcc799b0bb4dae757e4f8675_499203_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e.png" width="2124" height="1244" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Create a CTE (Common Table Expression) named \u0026#39;boundary\u0026#39; to define the geographical boundaries for Nevada (US-NV)
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;boundary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;administrative\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Select features marked as administrative boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-2\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US-NV\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Focus on features tagged specifically for Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e            \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eLIMIT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Ensure only one boundary is selected, assuming it\u0026#39;s the outermost boundary of Nevada
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Main query to select parking amenities that intersect with the Nevada boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eosm\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Select geometry of each feature
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Retrieve the \u0026#39;access\u0026#39; attribute of the parking amenity
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;access\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eaccess\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eosm\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Join the main table with the boundary CTE
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eosm\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eboundary\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Select only those features that intersect with the Nevada boundary
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;amenity\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;parking\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="c1"\u003e-- Focus on features tagged as parking amenities
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="us-states-borders"\u003eUS States Borders\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_512x0_resize_box_3.png 512w"
    width="1298"
    height="920"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55_hub6f7c2e537b28d6175fb270af84c282d_169304_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55.png" width="1298" height="920" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- getting name from all_tags nested struct
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;name\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ename\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- fixing edges crossing antimeridian
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eST_ASGEOJSON\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="c1"\u003e-- simplifying geometry for smaller size
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- filtering for administrative boundaries
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;boundary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;administrative\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- getting admin_level=4
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;admin_level\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;4\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="c1"\u003e-- filtering for country code prefixed with US
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;US\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eSUBSTR\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e2\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-2\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/ec7f842a-73f3-4710-a5e8-a2e2d8f63c55/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="ukrainian-schools-vs-russian-invasion"\u003eUkrainian Schools vs Russian Invasion\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_512x0_resize_box_3.png 512w"
    width="1866"
    height="1274"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0_huf0fb7ecac74d551136ae4d77468c3c51_712405_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/5825b784-cd3c-4030-b3c5-94a8f4dd47b0.png" width="1866" height="1274" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/5825b784-cd3c-4030-b3c5-94a8f4dd47b0/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003ewith\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="n"\u003eST_SIMPLIFY\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1000\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;boundary\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;administrative\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;admin_level\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;2\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ISO3166-1\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;UA\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;amenity\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;school\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eselect\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ejoin\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eon\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eschools\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/5825b784-cd3c-4030-b3c5-94a8f4dd47b0/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="admin-boundaries"\u003eAdmin Boundaries\u003c/h3\u003e
\u003cp\u003e👉 \u003ca href="https://dekart.xyz/blog/admin-boundaries-in-bigquery-public-datasets/"\u003eAdmin Boundaries in BigQuery Public Datasets\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="geospatial-analytics"\u003eGeospatial analytics\u003c/h2\u003e
\u003cp\u003ePerform geospatial analytics with Spatial SQL and Kepler.gl\u003c/p\u003e
\u003ch3 id="locate-empty-building-plots"\u003eLocate empty building plots\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_512x0_resize_box_3.png 512w"
    width="1328"
    height="1180"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d_hu83b6b3b2ea5e932fa8953791fc797d81_653977_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/aeefb6e0-d83a-489a-b371-50b306535e2d.png" width="1328" height="1180" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/aeefb6e0-d83a-489a-b371-50b306535e2d/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eWITH\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eBoundingPolygon\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_GEOGFROMTEXT\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;POLYGON ((19.011407561798503 47.45616485157483, 19.011407561798503 47.34036843210035, 19.20169809527555 47.34036843210035, 19.20169809527555 47.45616485157483, 19.011407561798503 47.45616485157483))\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epolygon\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003elanduse_areas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elanduse_geometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003evalue\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;landuse\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elanduse_type\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features_multipolygons\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eBoundingPolygon\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eEXISTS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e1\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003etag\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;landuse\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epolygon\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e),\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="n"\u003ebuildings\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebuilding_geometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_openstreetmap\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eplanet_features\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eBoundingPolygon\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;building\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIN\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ekey\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUNNEST\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003eall_tags\u003c/span\u003e\u003cspan class="p"\u003e))\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_WITHIN\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003epolygon\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003elanduse\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elanduse_geometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003elanduse\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elanduse_type\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003elanduse_areas\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003elanduse\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eLEFT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eJOIN\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ebuildings\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eST_INTERSECTS\u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="n"\u003elanduse\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003elanduse_geometry\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ebuildings\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ebuilding_geometry\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003ebuildings\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ebuilding_geometry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eIS\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eNULL\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/aeefb6e0-d83a-489a-b371-50b306535e2d/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch2 id="keplergl-maps-with-large-datasets"\u003eKepler.gl maps with large datasets\u003c/h2\u003e
\u003cp\u003eBenchmarking Kepler.gl with large datasets\u003c/p\u003e
\u003ch3 id="all-400k-toronto-buildings-100mb"\u003eAll (400k) Toronto Buildings (100Mb)\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_512x0_resize_box_3.png 512w"
    width="2810"
    height="1444"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795_hu0f0345dcdb99bc791f56cf10c03f760b_2827758_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/8f2da1e3-9769-4654-abb8-983afd2a2795.png" width="2810" height="1444" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/8f2da1e3-9769-4654-abb8-983afd2a2795/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cpre tabindex="0"\u003e\u003ccode\u003eWITH bounding_area as (SELECT geometry from \`bigquery-public-data.geo_openstreetmap.planet_features\`
        WHERE feature_type=\u0026#34;multipolygons\u0026#34;
           AND (\u0026#39;name:en\u0026#39;, \u0026#39;Toronto\u0026#39;) in (SELECT (key, value) from unnest(all_tags))
          AND (\u0026#39;boundary\u0026#39;, \u0026#39;administrative\u0026#39;) in (SELECT (key, value) from unnest(all_tags))
          AND (\u0026#39;admin_level\u0026#39;, \u0026#39;6\u0026#39;) in (SELECT (key, value) from unnest(all_tags))
     )
SELECT planet_features.geometry
  FROM \`bigquery-public-data.geo_openstreetmap.planet_features\` planet_features, bounding_area
   WHERE \u0026#39;building\u0026#39; IN (SELECT key FROM UNNEST(all_tags)) -- Select features with \u0026#39;building=*\u0026#39; tag
   AND ST_DWithin(bounding_area.geometry, planet_features.geometry, 0)  -- Filter only features within bounding_area
\u003c/code\u003e\u003c/pre\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/8f2da1e3-9769-4654-abb8-983afd2a2795/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="1m-points-30mb"\u003e1M points (30Mb)\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_512x0_resize_box_3.png 512w"
    width="1266"
    height="934"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30_hu91a32c5feb3cbc1f62bb52ae29ae8df9_1126370_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/f63fb537-800e-48f6-8c18-8d542a0fed30.png" width="1266" height="934" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/f63fb537-800e-48f6-8c18-8d542a0fed30/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003edistrict\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elatitude\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elongitude\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003echicago_crime\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecrime\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eRand\u003c/span\u003e\u003cspan class="p"\u003e()\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e13\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e/\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e100\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/f63fb537-800e-48f6-8c18-8d542a0fed30/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
\u003ch3 id="all-ramps-in-illinois"\u003eAll ramps in Illinois\u003c/h3\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_512x0_resize_box_3.png 512w"
    width="1086"
    height="674"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6_hu95532bf7d2a30e2945002d37d775e911_163348_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/about/kepler-gl-map-examples/b818f41a-5bd2-4b3b-87b8-4797a390a2a6.png" width="1086" height="674" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003cp class="view-on-map"\u003e
\u003ca href="https://cloud.dekart.xyz/reports/b818f41a-5bd2-4b3b-87b8-4797a390a2a6/source?ref=dekart-xyz-view-map" target="_blank" class="btn btn-outline-primary btn-sm"\u003e
  View interactive map
\u003c/a\u003e
\u003c/p\u003e




\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e*\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003egeo_us_roads\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eall_roads_17\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ewhere\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003emtfcc_feature_class_code\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;S1630\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp class="playground-link"\u003e
    
        \u003ca href='https://cloud.dekart.xyz/reports/b818f41a-5bd2-4b3b-87b8-4797a390a2a6/source?ref=dekart-xyz-open-editor' target="_blank" class="btn btn-outline-primary btn-sm"\u003e
            Open query in editor
          \u003c/a\u003e

\u003c/p\u003e
`},{id:13,href:"https://dekart.xyz/docs/about/public-dataset-examples/",title:"Examples with Public Datasets",description:"Learn how to use BigQuery SQL to visualize spatial datasets",content:`\u003cp\u003eLearn how to use BigQuery SQL to visualize spatial datasets. Below are some examples of public datasets that you can explore and visualize with Dekart.\u003c/p\u003e
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
`},{id:14,href:"https://dekart.xyz/docs/usage/snowflake-private-key/",title:"Snowflake Private Key",description:"Step-by-Step: Creating a Snowflake Private Key Pair and Using It in Dekart",content:`\u003cp\u003eThis guide walks you through generating a Snowflake-compatible RSA key pair, configuring your Snowflake user for key-pair authentication, and using the private key in Dekart.\u003c/p\u003e
\u003ch2 id="step-1-generate-a-key-pair"\u003eStep 1: Generate a Key Pair\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eGenerate a Private Key\u003c/strong\u003e: Use OpenSSL to generate a private key in PKCS#8 format.
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003eopenssl genrsa \u003cspan class="m"\u003e2048\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eGenerate a Public Key\u003c/strong\u003e: Extract the public key from the private key.
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003eopenssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="step-2-assign-the-public-key-to-a-snowflake-user"\u003eStep 2: Assign the Public Key to a Snowflake User\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eLog into Snowflake with a user that has the necessary permissions.\u003c/li\u003e
\u003cli\u003eAssign the public key to the user using the following SQL command:
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eALTER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUSER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eexample_user\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eSET\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eRSA_PUBLIC_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;MIIBIj...\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="step-3-configure-the-snowflake-connection-in-dekart"\u003eStep 3: Configure the Snowflake Connection in Dekart\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eSet Snowflake Private Key in Connection Dialog with the base64-encoded private key.\u003c/li\u003e
\u003cli\u003eThe private key must be base64-encoded without the \u003ccode\u003e-----BEGIN PRIVATE KEY-----\u003c/code\u003e and \u003ccode\u003e-----END PRIVATE KEY-----\u003c/code\u003e markers.\u003c/li\u003e
\u003cli\u003eRemove all newlines from the base64-encoded string.\u003c/li\u003e
\u003c/ul\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003ecat rsa_key.p8 \u003cspan class="p"\u003e|\u003c/span\u003e sed \u003cspan class="s1"\u003e\u0026#39;/-----BEGIN PRIVATE KEY-----/d\u0026#39;\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e sed \u003cspan class="s1"\u003e\u0026#39;/-----END PRIVATE KEY-----/d\u0026#39;\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e tr -d \u003cspan class="s1"\u003e\u0026#39;\\n\u0026#39;\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e`},{id:15,href:"https://dekart.xyz/docs/usage/wherobots-sql-tutorial/",title:"Wherobots SQL Tutorial",description:"Learn how to use Dekart's Wherobots SQL to analyze and visualize geospatial data.",content:`\u003cp\u003eAlready using Wherobots or writing geospatial SQL with Apache Sedona?
This video shows you how to plug your queries directly into Dekart and instantly visualize your results on shareable maps.\u003c/p\u003e
\u003cp\u003e\u003ciframe width="560" height="315" src="https://www.youtube.com/embed/RY9H76V_qVQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz?ref=wherobots-tutorial-top" role="button"\u003eStart free with Dekart + Wherobots\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="what-is-this-connector"\u003eWHAT is this connector?\u003c/h2\u003e
\u003ch3 id="what-does-the-dekart-connector-to-wherobots-actually-do"\u003eWhat does the Dekart connector to Wherobots actually do?\u003c/h3\u003e
\u003cp\u003eThe \u003cstrong\u003eDekart connector\u003c/strong\u003e establishes a seamless bridge between your Wherobots data warehouse (powered by Apache Sedona) and the Dekart mapping interface. It allows you to run live Sedona SQL queries and display the results directly as interactive map layers, powered by Kepler.gl.\u003c/p\u003e
\u003ch3 id="how-does-it-enhance-my-current-wherobotssedona-workflow"\u003eHow does it enhance my current Wherobots/Sedona workflow?\u003c/h3\u003e
\u003cp\u003eInstead of exporting data and building dashboards manually, you can now \u003cstrong\u003evisualize spatial query results instantly\u003c/strong\u003e, iterate faster on analysis, and maintain consistency using the live SQL-to-map pipeline. It turns your usual Wherobots → Sedona → export flow into Wherobots → SQL → Dekart → live map.\u003c/p\u003e
\u003ch3 id="is-this-for-visualization-only-or-can-i-interact-with-data-too"\u003eIs this for visualization only, or can I interact with data too?\u003c/h3\u003e
\u003cp\u003ePrimarily, it’s for \u003cstrong\u003einteractive visualization\u003c/strong\u003e, drop a SQL query into Dekart, view the map instantly, and share it with a link. You’re not just viewing static outputs; you can pan, zoom, filter, and overlay live layers from multiple queries or datasets.\u003c/p\u003e
\u003ch2 id="why-should-i-care"\u003eWHY should I care?\u003c/h2\u003e
\u003ch3 id="i-already-use-wherobots-or-apache-sedona-which-benefits-does-dekart-add"\u003eI already use Wherobots or Apache Sedona, which benefits does Dekart add?\u003c/h3\u003e
\u003cp\u003eDekart provides an \u003cstrong\u003einstant visual layer\u003c/strong\u003e directly over your spatial SQL results. It removes the friction of manual exports, dashboard setup, or Python/JS development. You get a polished, interactive map with zero extra steps.\u003c/p\u003e
\u003ch3 id="why-is-this-better-than-building-custom-dashboards-or-using-other-tools"\u003eWhy is this better than building custom dashboards or using other tools?\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eNo coding required\u003c/strong\u003e, beyond the SQL.\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eSpeed\u003c/strong\u003e: See map results in under a minute.\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eFlexibility\u003c/strong\u003e: Layer multiple queries, styling, CSV uploads, etc.\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eOpen source \u0026amp; lightweight\u003c/strong\u003e: Built with React + Go, easier to deploy or tailor than enterprise GIS tools (\u003ca href="https://github.com/dekart-xyz/dekart?" title="dekart-xyz/dekart: Open-source backend for Kepler.gl - GitHub"\u003eGitHub\u003c/a\u003e).\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="how-fast-can-i-go-from-query-to-map"\u003eHow fast can I go from query to map?\u003c/h3\u003e
\u003cp\u003e🎯 Typically under 5 minutes:\u003c/p\u003e
\u003col\u003e
\u003cli\u003eConnect to Wherobots\u003c/li\u003e
\u003cli\u003ePaste/write your Sedona SQL\u003c/li\u003e
\u003cli\u003eClick \u003cstrong\u003eExecute\u003c/strong\u003e → map appears instantly\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003eThat’s it, fast iteration, no waiting.\u003c/p\u003e
\u003ch2 id="how-does-it-work"\u003eHOW does it work?\u003c/h2\u003e
\u003ch3 id="how-do-i-connect-dekart-to-wherobots"\u003eHow do I connect Dekart to Wherobots?\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eUse Dekart’s data source settings to \u003cstrong\u003epoint to your Wherobots Cloud\u003c/strong\u003e (host, database, credentials)\u003c/li\u003e
\u003cli\u003eThe connector implements websockets client for Wherobots SQL API\u003c/li\u003e
\u003cli\u003eOnce connected, you can type Sedona SQL queries directly in Dekart’s SQL editor\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="how-do-i-control-dekarts-usage-of-wherobots"\u003eHow do I control Dekart’s usage of Wherobots?\u003c/h3\u003e
\u003cp\u003eCosts only accrue when you run queries; no hidden charges from Dekart beyond the compute actually used in Wherobots.\u003c/p\u003e
\u003ch3 id="how-are-my-credentials-stored"\u003eHow are my credentials stored?\u003c/h3\u003e
\u003cp\u003eDekart uses an encryption key to store credentials in the internal database. Secrets are never exposed in the UI or logs.\u003c/p\u003e
\u003ch3 id="what-data-does-dekart-store"\u003eWhat data does Dekart store?\u003c/h3\u003e
\u003cp\u003eDekart stores:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eYour Wherobots connection settings (encrypted)\u003c/li\u003e
\u003cli\u003eSQL queries you run\u003c/li\u003e
\u003cli\u003eMap styles and configurations\u003c/li\u003e
\u003cli\u003eMap metadata (like titles, descriptions)\u003c/li\u003e
\u003cli\u003eUser preferences (like last used queries, map settings)\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eDekart does not store data from Wherobots be default, and utilizes Wherobots persisted query results to load data for maps.\u003c/p\u003e
\u003cp\u003eHowever when you publish maps, Dekart will store the map data in its internal bucket, so that it can be shared with other users.\u003c/p\u003e
\u003ch2 id="what-do-i-do-next"\u003eWHAT do I do next?\u003c/h2\u003e
\u003ch3 id="how-do-i-try-this-with-my-own-data"\u003eHow do I try this with my own data?\u003c/h3\u003e
\u003col\u003e
\u003cli\u003eSign up or log into Dekart.\u003c/li\u003e
\u003cli\u003eAdd a new data source: enter your \u003cstrong\u003eWherobots connection info\u003c/strong\u003e.\u003c/li\u003e
\u003cli\u003eCreate a new “map” → paste your Sedona SQL → click \u003cstrong\u003eExecute\u003c/strong\u003e.\u003c/li\u003e
\u003cli\u003eVoila, the map appears, ready to style and share.\u003c/li\u003e
\u003c/ol\u003e
\u003ch3 id="is-this-open-source-can-i-contribute-or-extend-it"\u003eIs this open source? Can I contribute or extend it?\u003c/h3\u003e
\u003cp\u003eYes! Dekart is open source under \u003cstrong\u003eAGPL‑3.0\u003c/strong\u003e (\u003ca href="https://github.com/dekart-xyz/dekart?" title="dekart-xyz/dekart: Open-source backend for Kepler.gl - GitHub"\u003eGitHub\u003c/a\u003e). You’re welcome to explore the code, self-host via Docker, file issues on GitHub, or suggest enhancements through Discussions .\u003c/p\u003e
\u003ch3 id="tldr-summary"\u003eTL;DR Summary\u003c/h3\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eFeature\u003c/th\u003e
\u003cth\u003eWhat it means\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003cstrong\u003eLive SQL → Map\u003c/strong\u003e\u003c/td\u003e
\u003ctd\u003eRun Sedona queries, instantly visualize in Dekart\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003cstrong\u003eInteractive\u003c/strong\u003e\u003c/td\u003e
\u003ctd\u003ePan, zoom, filter, layer CSV or additional queries\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003cstrong\u003eQuick setup\u003c/strong\u003e\u003c/td\u003e
\u003ctd\u003eConnect, paste SQL, click ,  under 5 minutes to insight\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003cstrong\u003eOpen \u0026amp; flexible\u003c/strong\u003e\u003c/td\u003e
\u003ctd\u003eSelf‑hostable, customizable, and community‑driven\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003cp\u003e\u003cstrong\u003eReady to try it yourself?\u003c/strong\u003e Click \u003cstrong\u003e“Start free with Dekart + Wherobots”\u003c/strong\u003e above, connect your source, paste your SQL, and see your data come alive.\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz?ref=wherobots-tuttorial-top" role="button"\u003eStart free with Dekart + Wherobots\u003c/a\u003e\u003c/p\u003e
`},{id:16,href:"https://dekart.xyz/docs/usage/choose-bigquery-connection-method/",title:"BigQuery Connection Guide",description:"Choose BigQuery Connection Method",content:`\u003cp\u003eDekart offers two ways to connect to BigQuery:\u003c/p\u003e
\u003col\u003e
\u003cli\u003e\u003cstrong\u003eGoogle Account (OAuth Pass-Through)\u003c/strong\u003e\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eService Account Key (JSON)\u003c/strong\u003e\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003eThis page explains the permissions you need when using a Google account and how to obtain and secure a Service Account Key if that’s your preferred method.\u003c/p\u003e
\u003ch2 id="which-permissions-are-required"\u003eWhich Permissions Are Required?\u003c/h2\u003e
\u003cp\u003eIf you choose to connect with your \u003cstrong\u003eGoogle account\u003c/strong\u003e:\u003c/p\u003e
\u003ch3 id="bigquery-permissions"\u003eBigQuery Permissions\u003c/h3\u003e
\u003cp\u003eYou must have at following roles in the BigQuery project you want to query:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Data Viewer\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Job User\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Read Session User\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eStorage Object User\u003c/code\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="gcp-project-access"\u003eGCP Project Access\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eYour Google account must be associated with the Google Cloud project that contains the datasets you want to query.\u003c/li\u003e
\u003cli\u003eIf you’re uncertain, check with your GCP admin or log in to the \u003ca href="https://console.cloud.google.com/"\u003eGoogle Cloud Console\u003c/a\u003e to see if you have the necessary roles assigned.\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="why-these-permissions"\u003eWhy these permissions?\u003c/h3\u003e
\u003cp\u003eDekart passes your short-lived OAuth token, stored in your browser, to BigQuery. This way you can implement user-level and dataset-level access controls and audit logs in BigQuery. Dekart never stores tokens or query results in its backend.\u003c/p\u003e
\u003ch2 id="how-to-get-a-service-account-key"\u003eHow to Get a Service Account Key\u003c/h2\u003e
\u003cp\u003eFor \u003cstrong\u003eService Account JSON\u003c/strong\u003e connections, you’ll need a service account in your Google Cloud project:\u003c/p\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eCreate or Select a Service Account\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eGo to the \u003ca href="https://console.cloud.google.com/iam-admin/serviceaccounts"\u003eGoogle Cloud Console → IAM \u0026amp; Admin → Service Accounts\u003c/a\u003e.\u003c/li\u003e
\u003cli\u003eIf you already have a service account that has sufficient BigQuery roles (e.g., “BigQuery JobUser”), you can reuse it. Otherwise, create a new one.\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eAssign BigQuery Roles\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eUnder “Permissions,” give the service account the roles it needs
\u003cul\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Data Viewer\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Job User\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eBigQuery Read Session User\u003c/code\u003e\u003c/li\u003e
\u003cli\u003e\u003ccode\u003eStorage Object User\u003c/code\u003e (optionally for cache storage)\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eGenerate a Key File (JSON)\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eFrom the Service Accounts list, click the account you want to use.\u003c/li\u003e
\u003cli\u003eSelect “Keys” → “Add Key” → “Create new key.”\u003c/li\u003e
\u003cli\u003ePick \u003cstrong\u003eJSON\u003c/strong\u003e as the key type, then click “Create.”\u003c/li\u003e
\u003cli\u003eA JSON file will be downloaded to your computer—this is the file Dekart needs to connect.\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003ch2 id="how-is-the-key-secured"\u003eHow Is the Key Secured?\u003c/h2\u003e
\u003cp\u003eWhen you upload your JSON key to Dekart:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eEncryption at Rest\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eYour key is encrypted using AES (Advanced Encryption Standard) in GCM (Galois/Counter Mode) and stored in the Dekart backend. Encryption keys are stored in Google Cloud KMS (Key Management Service).\u003c/li\u003e
\u003cli\u003eYou can review our implementation on \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/src/server/secrets/secrets.go"\u003eGitHub\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eEncryption in Transit\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eDekart uses HTTPS to encrypt data in transit between your browser and the Dekart backend.\u003c/li\u003e
\u003cli\u003eDekart additionally encrypts secrets in transit using temporary encryption keys.\u003c/li\u003e
\u003cli\u003eYou can review our implementation on \u003ca href="https://github.com/dekart-xyz/dekart/blob/b093ff5e5f0a24ae4e13604253dfcc56f2465a0f/src/client/actions/connection.js#L211"\u003eGitHub\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eNo Unnecessary Sharing\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eDekart never exposes your key in Dekart User Interface. Key can be updated or deleted by workspace admin only. It cannot be read or downloaded by anyone.\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eRevoking Access\u003c/strong\u003e\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eIf you ever lose control of the key or need to discontinue its use, you can delete it from the GCP Console under “Service Accounts” → “Keys.” Once revoked, any existing connections relying on that key will cease to function, ensuring you maintain full control over who can query BigQuery.\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="still-have-questions"\u003eStill Have Questions?\u003c/h2\u003e
\u003cp\u003eWe are happy to guide you through the process:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eSchedule a call with engineers via \u003ca href="https://calendly.com/vladi-dekart/30min"\u003eCalendly\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eContact us in \u003ca href="https://slack.dekart.xyz/"\u003eSlack\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eEmail us at \u003ca href="mailto:support@dekart.xyz"\u003esupport@dekart.xyz\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:17,href:"https://dekart.xyz/docs/contributing/",title:"Contributing",description:"Contributing to the project",content:""},{id:18,href:"https://dekart.xyz/docs/snowflake-snowpark/about/",title:"Dekart Snowpark Application",description:"Why Dekart Cloud is Secure",content:`\u003cp\u003e\u003cstrong\u003eDekart\u003c/strong\u003e enables you to create powerful \u003cstrong\u003eKepler.gl\u003c/strong\u003e visualizations directly from SQL queries in Snowflake, simplifying the process of visualizing and sharing location data without ETL pipelines.\u003c/p\u003e
\u003cp\u003e\u003ciframe width="560" height="315" src="https://www.youtube.com/embed/KusNayeGFaI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://app.snowflake.com/marketplace/listing/GZSYZJNO4W/dekart-xyz-dekart" role="button"\u003eGet it instantly in Snowflake Marketplace\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="-how-dekart-works"\u003e💡 How Dekart Works\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eSingle Docker Container\u003c/strong\u003e: Dekart runs efficiently as a single container within the Snowpark Container Service, requiring minimal setup.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eState Management\u003c/strong\u003e: All Dekart\u0026rsquo;s state is securely stored on \u003ccode\u003edekart.app_public.app_state_stage\u003c/code\u003e, which includes 7 days of backups. When the application is uninstalled, the associated stage is also deleted.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eData Warehouse\u003c/strong\u003e: Dekart uses a dedicated \u003ccode\u003edw_dekart\u003c/code\u003e data warehouse for executing and storing SQL queries.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003e\u003cstrong\u003eQuery Results\u003c/strong\u003e: Query data is loaded from Snowflake\u0026rsquo;s persisted query results. If the query results expire, Dekart will automatically rerun the query to refresh the map data.\u003c/p\u003e
\u003cp\u003e\u003cstrong\u003eRecommended limits\u003c/strong\u003e:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eMaximum result size: \u003cstrong\u003e100 MB\u003c/strong\u003e\u003c/li\u003e
\u003cli\u003eMaximum number of rows: \u003cstrong\u003e1 million rows\u003c/strong\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="-accessing-datasets"\u003e🛡️ Accessing Datasets\u003c/h2\u003e
\u003cp\u003eTo use datasets in your visualizations, Dekart needs access to the relevant databases. For instance, to grant Dekart access to the \u003cstrong\u003eOpenStreetMap New York\u003c/strong\u003e dataset, run the following SQL command:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Grant access to a dataset (e.g., OpenStreetMap New York)
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGRANT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eIMPORTED\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ePRIVILEGES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDATABASE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOPENSTREETMAP_NEW_YORK\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eapplication\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART__WEBGL_MAPS_FOR_SNOWFLAKE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003e💡 Please note that app name could be changed during the installation process.\u003c/p\u003e
\u003ch2 id="-granting-access-to-other-users"\u003e👫 Granting Access to Other Users\u003c/h2\u003e
\u003cp\u003eTo allow other users access to the Dekart application, assign them the appropriate role with the following SQL command:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Grant access to a user role
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGRANT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eapplication\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003erole\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART__WEBGL_MAPS_FOR_SNOWFLAKE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eapp_public\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eapp_user\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003erole\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003euser_role\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003e💡 Please note that app name could be changed during the installation process.\u003c/p\u003e
\u003ch2 id="-getting-access-to-free-overture-maps"\u003e🎁 Getting access to free Overture Maps\u003c/h2\u003e
\u003cp\u003eDekart offers great way to explore Overture Maps datasets and enrich your visualizations with Places, Roads, and other map data.\u003c/p\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003eGo to Snowflake Marketplace and search for \u003ca href="https://app.snowflake.com/marketplace/data-products/search?search=overture%20maps"\u003eOverture Maps\u003c/a\u003e\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eGet Datasets you need, for example Places. They are instantly available in your Snowflake account.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eGive Dekart access to the dataset:\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- as ACCOUNTADMIN
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eGRANT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eIMPORTED\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ePRIVILEGES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDATABASE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__PLACES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eAPPLICATION\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART__WEBGL_MAPS_FOR_SNOWFLAKE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003col start="4"\u003e
\u003cli\u003eGo to Dekart application, create a new report click \u003cem\u003eStart with sample query\u003c/em\u003e to test it.\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003e💡 Please note that app name could be changed during the installation process.\u003c/p\u003e
\u003ch2 id="-backup-and-restore"\u003e💾 Backup and Restore\u003c/h2\u003e
\u003cp\u003eDekart stores its state on Snowflake Stage every 5 minutes and keeps 7 days of history. This section explains how to backup and restore this state.\u003c/p\u003e
\u003ch3 id="backing-up-state"\u003eBacking Up State\u003c/h3\u003e
\u003cp\u003eTo backup the Dekart application state, follow these steps:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- as ACCOUNTADMIN
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- List backup files to verify they exist
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003eLIST\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Create example database for copying backup
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCREATE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDATABASE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCREATE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eSCHEMA\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCREATE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eSTAGE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Copy backup files
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCOPY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eFILES\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eINTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Verify backup was saved
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003eLIST\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch3 id="restoring-state"\u003eRestoring State\u003c/h3\u003e
\u003cp\u003eTo restore the state to a new Dekart installation:\u003c/p\u003e
\u003col\u003e
\u003cli\u003eUninstall the old app\u003c/li\u003e
\u003cli\u003eInstall the marketplace app version (do \u003cstrong\u003enot\u003c/strong\u003e activate it yet)\u003c/li\u003e
\u003cli\u003eGrant permissions so the activate button becomes visible, then run:\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e-- Copy backup files back to the new app stage
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="k"\u003eCOPY\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eFILES\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eINTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART_MIGRATE\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="c1"\u003e-- Verify files were copied
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="c1"\u003e\u003c/span\u003e\u003cspan class="n"\u003eLIST\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e@\u003c/span\u003e\u003cspan class="n"\u003eDEKART\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_PUBLIC\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eAPP_STATE_STAGE\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003col start="4"\u003e
\u003cli\u003ePress \u003cstrong\u003eActivate\u003c/strong\u003e button\u003c/li\u003e
\u003cli\u003eGrant permissions to the new app (example):\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eGRANT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eIMPORTED\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003ePRIVILEGES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eON\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eDATABASE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eOVERTURE_MAPS__PLACES\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eTO\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eAPPLICATION\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eDEKART\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003eAll maps should now be migrated to the new instance.\u003c/p\u003e
\u003cp\u003e💡 \u003cstrong\u003eNote\u003c/strong\u003e: Depending on share type, the app name can be \u003ccode\u003eDEKART\u003c/code\u003e or \u003ccode\u003eDEKART__WEBGL_MAPS_FOR_SNOWFLAKE\u003c/code\u003e. Adjust the commands accordingly.\u003c/p\u003e
\u003ch2 id="-support"\u003e🛟 Support\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="https://slack.dekart.xyz/"\u003eGet support in Slack Community\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://calendly.com/vladi-dekart/30min"\u003eBook a walkthrough demo with our team\u003c/a\u003e\u003c/li\u003e
\u003cli\u003e\u003ca href="https://github.com/dekart-xyz/dekart/issues"\u003eCreate a GitHub Issue\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eContact us over email \u003ca href="mailto:support@dekart.xyz"\u003esupport@dekart.xyz\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:19,href:"https://dekart.xyz/docs/configuration/environment-variables/",title:"Environment Variables",description:"Environment Variables",content:`








  
  
  
  








\u003cdiv class="dekart-cta-banner p-3 mb-3" \u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Save time. Get ready-to-use configs for \u003cb\u003eAWS\u003c/b\u003e and \u003cb\u003eGoogle Cloud\u003c/b\u003e
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="https://mailchi.mp/team/request-self-hosting-documentation?ref=deployment-templates" role="button"\u003eRequest Access\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

\u003ch2 id="main-configuration"\u003eMain configuration\u003c/h2\u003e
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
\u003ctd\u003eDatabase name. Dekart needs Postgres Database to store query meta information. Alternatively SQLite can be used, see bellow. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003edekart\u003c/code\u003e\u003c/td\u003e
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
\u003ctd\u003eWhich datasource to use: \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eBQ\u003c/code\u003e BigQuery, default\u003c/li\u003e\u003cli\u003e\u003ccode\u003eATHENA\u003c/code\u003e AWS Athena\u003c/li\u003e\u003cli\u003e\u003ccode\u003eSNOWFLAKE\u003c/code\u003e Snowflake \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.12\u003c/small\u003e\u003c/li\u003e\u003cli\u003e\u003ccode\u003ePG\u003c/code\u003e Postgres \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/li\u003e\u003cli\u003e\u003ccode\u003eUSER\u003c/code\u003e Users can configure connections in UX \u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.17.2\u003c/small\u003e\u003c/a\u003e\u003c/li\u003e\u003cli\u003e\u003ccode\u003eCH\u003c/code\u003e ClickHouse \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_STORAGE=GCS\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eWhich storage backend to use for storing queries and query results \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eGCS\u003c/code\u003e Google Cloud Storage, default, works only with BigQuery data source\u003c/li\u003e\u003cli\u003e\u003ccode\u003eS3\u003c/code\u003e AWS S3, works with BigQuery and AWS Athena\u003c/li\u003e\u003cli\u003e\u003ccode\u003eSNOWFLAKE\u003c/code\u003e Queries will be cached in Snowflake query result cache. Works only with Snowflake data source. \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.17\u003c/small\u003e\u003c/li\u003e\u003cli\u003e\u003ccode\u003eUSER\u003c/code\u003e Users can configure connections in UX \u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.18\u003c/small\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eGoogle Cloud Storage or AWS S3 bucket name where Dekart Query results will be stored. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003edekart-bucket\u003c/code\u003e \u003cbr\u003e\u003cbr\u003e  If value is empty, users will be able to define storage bucket via UI. Supported datasource \u003ccode\u003eDEKART_DATASOURCE\u003c/code\u003e: \u003cul\u003e\u003cli\u003e\u003ccode\u003eBQ\u003c/code\u003e BigQuery from \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.15\u003c/small\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CORS_ORIGIN=\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.10\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eCORS Origin to be allowed by Dekart backend and set in \u003ccode\u003eAccess-Control-Allow-Origin\u003c/code\u003e header. If not set or set incorrectly, warning will appear in logs. If set incorrectly. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003ehttps://dekart.example.com\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SQLITE_DB_PATH=\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.17.2\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eDekart will use SQLite database instead of Postgres to store query meta information. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e./dekart.db\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_STREAM_TIMEOUT\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eTimeout in seconds for streaming backend updates. Default value is 50 seconds. Useful when your Gateway has a shorter timeout and you see Gateway Timeout errors. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e50\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="data-encryption"\u003eData Encryption\u003c/h2\u003e
\u003cp\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.18\u003c/small\u003e\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eDekart supports data encryption at rest for storing credentials. Required for configuring Snowflake and BigQuery JSON Key via UX. To enable data encryption, set the following environment variables:\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DATA_ENCRYPTION_KEY\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eGoogle Secret Manager key to encrypt sensitive data. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eprojects/121212121212/secrets/dekart-data-encoding-key/versions/1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003cp\u003eSteps to Generate \u0026amp; Set the Key:\u003c/p\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003eGenerate a Secure 256‐Bit Key
Use a command like:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003eopenssl rand -base64 \u003cspan class="m"\u003e32\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003eThis produces a base64‐encoded, 32‐byte key.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eAdd key to Google Secret Manager\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eSet the Environment Variable:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="nv"\u003eDEKART_DATA_ENCRYPTION_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003eprojects/121212121212/secrets/dekart-data-encoding-key/versions/1
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003c/ol\u003e
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
\u003ctd\u003e\u003ccode\u003eDEKART_GCP_EXTRA_OAUTH_SCOPES\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.14\u003c/small\u003e \u003cbr/\u003eOAuth token support from \u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/td\u003e
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
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SNOWFLAKE_PRIVATE_KEY\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18.4\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eThe private key required for authenticating with Snowflake using the JWT (JSON Web Token) authentication method. This key must be in PKCS#8 format and base64-encoded.  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eMIIEv...\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_SNOWFLAKE_STAGE\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.17.2\u003c/small\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18.1\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003ePersist Dekart application state on Snowflake stage. Work with \u003ccode\u003eDEKART_SQLITE_DB_PATH\u003c/code\u003e  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eapp_public.app_state_stage\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_SNOWFLAKE_CONTEXT=\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.17.2\u003c/small\u003e\u003c/a\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18.1\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAuthorize user using \u003ccode\u003eSf-Context-Current-User\u003c/code\u003e header. Used in Snowpark environment. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch3 id="configuring-snowflake-private-key-authentication"\u003eConfiguring Snowflake Private Key Authentication\u003c/h3\u003e
\u003ch4 id="step-1-generate-a-key-pair"\u003eStep 1: Generate a Key Pair\u003c/h4\u003e
\u003cul\u003e
\u003cli\u003e\u003cstrong\u003eGenerate a Private Key\u003c/strong\u003e: Use OpenSSL to generate a private key in PKCS#8 format.
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003eopenssl genrsa \u003cspan class="m"\u003e2048\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003cli\u003e\u003cstrong\u003eGenerate a Public Key\u003c/strong\u003e: Extract the public key from the private key.
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003eopenssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch4 id="step-2-assign-the-public-key-to-a-snowflake-user"\u003eStep 2: Assign the Public Key to a Snowflake User\u003c/h4\u003e
\u003cul\u003e
\u003cli\u003eLog into Snowflake with a user that has the necessary permissions.\u003c/li\u003e
\u003cli\u003eAssign the public key to the user using the following SQL command:
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eALTER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eUSER\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eexample_user\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eSET\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eRSA_PUBLIC_KEY\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;MIIBIj...\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003ch4 id="step-3-set-the-environment-variable"\u003eStep 3: Set the Environment Variable\u003c/h4\u003e
\u003cul\u003e
\u003cli\u003eSet the \u003ccode\u003eDEKART_SNOWFLAKE_PRIVATE_KEY\u003c/code\u003e environment variable with the base64-encoded private key.\u003c/li\u003e
\u003cli\u003eThe private key must be base64-encoded without the \u003ccode\u003e-----BEGIN PRIVATE KEY-----\u003c/code\u003e and \u003ccode\u003e-----END PRIVATE KEY-----\u003c/code\u003e markers.\u003c/li\u003e
\u003cli\u003eRemove all newlines from the base64-encoded string.\u003c/li\u003e
\u003c/ul\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003ecat rsa_key.p8 \u003cspan class="p"\u003e|\u003c/span\u003e sed \u003cspan class="s1"\u003e\u0026#39;/-----BEGIN PRIVATE KEY-----/d\u0026#39;\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e sed \u003cspan class="s1"\u003e\u0026#39;/-----END PRIVATE KEY-----/d\u0026#39;\u003c/span\u003e \u003cspan class="p"\u003e|\u003c/span\u003e tr -d \u003cspan class="s1"\u003e\u0026#39;\\n\u0026#39;\u003c/span\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch2 id="postgres-as-a-data-source"\u003ePostgres (as a data source)\u003c/h2\u003e
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
\u003ctd\u003e\u003ccode\u003eDEKART_POSTGRES_DATASOURCE_CONNECTION\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.16\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003ePostgres DB to be used as data source  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003epostgres://user:password@host:port/db\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="clickhouse"\u003eClickHouse\u003c/h2\u003e
\u003cp\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/p\u003e
\u003cp\u003eClickHouse can be used as a data source for Dekart.\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CLICKHOUSE_DATA_CONNECTION\u003c/code\u003e  \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eClickHouse connection string in DSN format. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eclickhouse://user:password@host:port/database\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CLICKHOUSE_S3_OUTPUT_LOCATION\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eS3 bucket path where query results are stored. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003ebucket-name/optional-prefix\u003c/code\u003e\u003c/td\u003e
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
\u003ch2 id="-user-authorization-via-google-oauth-20-flow"\u003e👑 User authorization via Google OAuth 2.0 flow\u003c/h2\u003e









  
  
  
  






  
  



\u003cdiv class="dekart-cta-banner-premium p-3 mb-3" style="ZgotmplZ"\u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Dekart Premium feature
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="/self-hosted" role="button"\u003eView Plans\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

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
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_GOOGLE_OAUTH\u003c/code\u003e  \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.15\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eEnables Google OAuth 2.0 flow. Requires users to be authenticated. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_GOOGLE_OAUTH_CLIENT_ID\u003c/code\u003e\u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.15\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eGoogle OAuth 2.0 Client ID. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1234567890-abcde.apps.googleusercontent.com\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_GOOGLE_OAUTH_SECRET\u003c/code\u003e\u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.15\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
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
\u003ch2 id="-user-authorization-via-google-iap"\u003e👑 User authorization via Google IAP\u003c/h2\u003e









  
  
  
  






  
  



\u003cdiv class="dekart-cta-banner-premium p-3 mb-3" style="ZgotmplZ"\u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Dekart Premium feature
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="/self-hosted" role="button"\u003eView Plans\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

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
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_IAP\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eEnables validation Google IAP JWT. Required users to be authenticated. ENables user management policies. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_IAP_JWT_AUD\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eSigned Header JWT Audience (\u003ccode\u003eaud\u003c/code\u003e). You can get the values for the aud string mentioned above by accessing the Cloud Console, or you can use the gcloud command-line tool. \u003ca href="https://cloud.google.com/iap/docs/signed-headers-howto#verifying_the_jwt_payload"\u003eSee details\u003c/a\u003e.  \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e/projects/PROJECT_NUMBER/apps/PROJECT_ID\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="-user-authorization-via-amazon-load-balancer"\u003e👑 User authorization via Amazon Load Balancer\u003c/h2\u003e









  
  
  
  






  
  



\u003cdiv class="dekart-cta-banner-premium p-3 mb-3" style="ZgotmplZ"\u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Dekart Premium feature
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="/self-hosted" role="button"\u003eView Plans\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

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
\u003ctd\u003e\u003ccode\u003eDEKART_REQUIRE_AMAZON_OIDC\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eEnables users authorization. Requires users to be authenticated and \u003ccode\u003ex-amzn-oidc-data\u003c/code\u003e to be passed from Load Balancer. Requires \u003ccode\u003eAWS_REGION\u003c/code\u003e. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="-workspaces"\u003e👑 Workspaces\u003c/h2\u003e









  
  
  
  






  
  



\u003cdiv class="dekart-cta-banner-premium p-3 mb-3" style="ZgotmplZ"\u003e
  \u003cdiv class="row justify-content-between align-items-center"\u003e
    \u003cdiv class="col-md-10 text-sm-center text-md-left"\u003e
      Dekart Premium feature
    \u003c/div\u003e
    \u003cdiv class="col-md-6 text-md-right"\u003e
      \u003ca class="btn btn-outline-dark" href="/self-hosted" role="button"\u003eView Plans\u003c/a\u003e
    \u003c/div\u003e
  \u003c/div\u003e
\u003c/div\u003e

\u003cp\u003eDekart supports multiple workspaces. Each workspace can have its own set of reports, queries, and users. By default, all users are added to the \u003ccode\u003eDefault\u003c/code\u003e workspace. To configure workspace management, set the following environment variables:\u003c/p\u003e
\u003ctable\u003e
\u003cthead\u003e
\u003ctr\u003e
\u003cth\u003eName\u003c/th\u003e
\u003cth\u003eDescription\u003c/th\u003e
\u003c/tr\u003e
\u003c/thead\u003e
\u003ctbody\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ALLOW_WORKSPACE_CREATION\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.18\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eWhen set to \u003ccode\u003e1\u003c/code\u003e, users can create new workspaces. Set to empty, new users will be automatically added to the \u003ccode\u003eDefault\u003c/code\u003e workspace. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003e1\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ADMIN\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-primary"\u003epremium \u0026gt;= 0.18\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eEmail that designates a default admin for the \u003ccode\u003eDefault\u003c/code\u003e workspace. When not provided, all new users will be Admin. When provided, all users will be viewers, unless specified differently with \u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ROLE\u003c/code\u003e. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003eadmin@email.com\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ROLE\u003c/code\u003e \u003cbr/\u003e\u003ca href="/self-hosted/"\u003e\u003csmall class="badge badge-grey"\u003epremium \u0026gt;= 0.18\u003c/small\u003e\u003c/a\u003e\u003c/td\u003e
\u003ctd\u003eRole assigned by default to new users (e.g., \u003ccode\u003eviewer\u003c/code\u003e, \u003ccode\u003eeditor\u003c/code\u003e, \u003ccode\u003eadmin\u003c/code\u003e). Requires \u003ccode\u003eDEKART_DEFAULT_WORKSPACE_ADMIN\u003c/code\u003e to be specified. \u003cbr\u003e \u003cem\u003eExample value\u003c/em\u003e: \u003ccode\u003eviewer\u003c/code\u003e\u003c/td\u003e
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
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_DEV_QUERY_CACHE_DEADLINE\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.18\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSet the cache deadline for queries in development mode. This is useful when debug BigQuery or Snowflake cache expiration \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003e1m\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
`},{id:20,href:"https://dekart.xyz/docs/usage/google-cloud-grant-scopes-faq/",title:"Google Cloud Grant Scopes",description:"What permissions am I granting to Dekart, and why are they necessary?",content:`\u003cp class="lead text-left jumbotron p-5"\u003eDekart has been verified by Google’s Trust \u0026 Safety Team to be Compliant with \u003ca href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"\u003eGoogle API Services User Data Policy\u003c/a\u003e – a process \u003ca href="https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification"\u003erequired\u003c/a\u003e to approve our Google Authentication consent screen.\u003c/p\u003e
\u003ch2 id="what-permissions-is-dekart-requesting-and-why-are-they-necessary"\u003eWhat permissions is Dekart requesting, and why are they necessary?\u003c/h2\u003e
\u003cp\u003eDekart implements BigQuery passthrough authentication (OAuth 2.0 Token Pass-Through) and requests the following permissions:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003ehttps://www.googleapis.com/auth/bigquery\u003c/code\u003e this scope grants Dekart the ability to create BigQuery jobs and read query results.\u003c/li\u003e
\u003cli\u003e\u003ccode\u003ehttps://www.googleapis.com/auth/devstorage.read_write\u003c/code\u003e this scope allows Dekart to store query result cache on your Google Cloud Storage bucket.\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eReceived short-lived tokens are stored in your browser\u0026rsquo;s local storage. Dekart never stores tokens or query results in its backend. You can revoke token anytime by signing out of Dekart Cloud.\u003c/p\u003e
\u003cp\u003eYou can analyze our codebase on \u003ca href="https://github.com/dekart-xyz/dekart"\u003eGitHub\u003c/a\u003e or \u003ca href="/self-hosted/"\u003eSelf-host\u003c/a\u003e Dekart Cloud on your infrastructure.\u003c/p\u003e
\u003ch2 id="why-dekart-is-using-xyz-domain"\u003eWhy Dekart is using .xyz domain?\u003c/h2\u003e
\u003cp\u003eWe chose \u003ccode\u003e.xyz\u003c/code\u003e domain as a reference to Cartesian (Descartes) coordinate system, where \u003ccode\u003ex\u003c/code\u003e, \u003ccode\u003ey\u003c/code\u003e, and \u003ccode\u003ez\u003c/code\u003e axes represent three dimensions. This domain is also used by organizations like Alphabet (Google’s parent company, hosted on abc.xyz) and others.\u003c/p\u003e
\u003cp\u003eDekart XYZ is registered in Germany (see Dekart in \u003ca href="https://www.unternehmensregister.de/ureg/index.html;jsessionid=DA70A83D7BC84B9E249AC040755AD5D9.web04-1"\u003eGermany Companies Registry\u003c/a\u003e), see \u003ca href="https://dekart.xyz/legal/notice/"\u003eImpressum\u003c/a\u003e for more details.\u003c/p\u003e
\u003cp\u003eDekart Cloud is hosted on Google Cloud Platform (GCP) in Frankfurt, Germany (europe-west3 region).\u003c/p\u003e
\u003ch2 id="does-dekart-store-my-data-or-access-sensitive-company-information"\u003eDoes Dekart store my data or access sensitive company information?\u003c/h2\u003e
\u003cp\u003eDekart never stores tokens or query results in its backend. Query results are stored in your Google Cloud Storage bucket or in BigQuery temp result cache. Dekart Cloud backend stores BigQuery job IDs and query metadata, including query text, and map titles.\u003c/p\u003e
\u003ch2 id="can-anyone-at-dekart-access-my-bigquery-datasets-or-google-cloud-storage"\u003eCan anyone at Dekart access my BigQuery datasets or Google Cloud Storage?\u003c/h2\u003e
\u003cp\u003eNo, nobody at Dekart can access your BigQuery datasets or Google Cloud Storage bucket. Short-lived tokens received from Google are stored in your browser\u0026rsquo;s local storage and never stored on Dekart backend. Your BigQuery data is not stored or cached on Dekart backend.\u003c/p\u003e
\u003ch2 id="does-using-dekart-add-extra-costs-to-my-cloud-services"\u003eDoes using Dekart add extra costs to my cloud services?\u003c/h2\u003e
\u003cp\u003eYou are billed directly by Google Cloud for BigQuery queries you made via Dekart and storage costs for storing query results in your Google Cloud Storage bucket. You have full control over SQL queries and Dekart does not initiate any background jobs. There is no additional cost for using Dekart.\u003c/p\u003e
\u003ch2 id="will-dekart-impact-the-performance-of-my-bigquery-queries"\u003eWill Dekart impact the performance of my BigQuery queries?\u003c/h2\u003e
\u003cp\u003eDekart does not modify or wrap your SQL queries and sends them as it is.\u003c/p\u003e
\u003ch2 id="what-support-is-available-if-i-encounter-issues-with-dekart"\u003eWhat support is available if I encounter issues with Dekart?\u003c/h2\u003e
\u003cp\u003eIf you have any questions or issues about Dekart Cloud, you can:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eSchedule a call with us via \u003ca href="https://calendly.com/vladi-dekart/30min"\u003eCalendly\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eContact us in \u003ca href="https://slack.dekart.xyz/"\u003eSlack\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eEmail us at \u003ca href="mailto:support@dekart.xyz"\u003esupport@dekart.xyz\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003c!-- If you have any questions or issues about Dekart Cloud, please contact us via email at [support@dekart.xyz](mailto:support@dekart.xyz) or via [Slack](https://slack.dekart.xyz/). --\u003e
\u003ch2 id="read-more"\u003eRead more\u003c/h2\u003e
\u003cp\u003e👉 \u003ca href="/legal/privacy/"\u003eDekart Cloud Privacy Policy\u003c/a\u003e\u003c/p\u003e
`},{id:21,href:"https://dekart.xyz/docs/usage/query-parameters/",title:"Query Parameters",description:"Turn your maps in applications with Dekart Query Parameters.",content:`\u003cp\u003e\u003ciframe width="560" height="315" src="https://www.youtube.com/embed/aItBYkfr530" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\u003c/p\u003e
\u003cp\u003e👉 \u003ca href="https://cloud.dekart.xyz/reports/322dbd27-0699-4c41-8a08-a3e023edf981/source?qp_country=DE\u0026amp;qp_region=BE\u0026amp;ref=query-param-example"\u003eExample Map with Query Parameters\u003c/a\u003e\u003c/p\u003e
\u003cp\u003eQuery parameters in Dekart provide a powerful way to make your maps interactive and dynamic. With query parameters, you can create SQL queries that dynamically adjust based on user input. Below is a detailed guide to understanding and using query parameters in Dekart.\u003c/p\u003e
\u003chr\u003e
\u003ch2 id="syntax-for-query-parameters"\u003eSyntax for Query Parameters\u003c/h2\u003e
\u003cp\u003eQuery parameters are wrapped in double curly braces (\u003ccode\u003e{{parameter_name}}\u003c/code\u003e) and can be used in your SQL queries. For example:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="err"\u003e{{\u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="err"\u003e}}\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003eIn this query:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ccode\u003e{{region}}\u003c/code\u003e is a query parameter that the user can set dynamically.\u003c/li\u003e
\u003cli\u003eSQL logic adjusts based on the value provided for the parameter.\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="setting-default-values"\u003eSetting Default Values\u003c/h2\u003e
\u003cp\u003eYou can define default values for query parameters. This is useful when a user doesn\u0026rsquo;t provide input for a parameter.\u003c/p\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_512x0_resize_box_3.png 512w"
    width="1360"
    height="1080"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value_hu86ead51af7811c6fafe8b8a848e10af1_203076_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/usage/query-parameters/setting-default-query-parameter-value.png" width="1360" height="1080" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e





\u003ch2 id="making-parameters-optional"\u003eMaking Parameters Optional\u003c/h2\u003e
\u003cp\u003eTo make a parameter optional:\u003c/p\u003e
\u003col\u003e
\u003cli\u003eUse SQL logic to handle cases where the parameter is not provided.\u003c/li\u003e
\u003cli\u003eCombine conditions in your query to handle \u0026ldquo;all data\u0026rdquo; when a parameter is empty.\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003eFor instance:
Example:\u003c/p\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-sql" data-lang="sql"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003egeometry\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eFROM\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003eoverture_maps\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003edivision_area\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="p"\u003e(\u003c/span\u003e\u003cspan class="err"\u003e{{\u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="err"\u003e}}\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;ALL\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003ecountry\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FR\u0026#39;\u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e        \u003c/span\u003e\u003cspan class="k"\u003eOR\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;FR-\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e||\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="err"\u003e{{\u003c/span\u003e\u003cspan class="n"\u003eregion\u003c/span\u003e\u003cspan class="err"\u003e}}\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e      \u003c/span\u003e\u003cspan class="p"\u003e)\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="k"\u003eAND\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="n"\u003esubtype\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="s1"\u003e\u0026#39;region\u0026#39;\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cul\u003e
\u003cli\u003eThe default value \u003ccode\u003e'ALL'\u003c/code\u003e ensures that if no value is entered, all regions are shown.\u003c/li\u003e
\u003c/ul\u003e
\u003ch2 id="sharing-reports-with-query-parameters"\u003eSharing Reports with Query Parameters\u003c/h2\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_512x0_resize_box_3.png 512w"
    width="2719"
    height="1300"
    
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_2048x0_resize_box_3.png 2048w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_1600x0_resize_box_3.png 1600w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_1024x0_resize_box_3.png 1024w,https://dekart.xyz/docs/usage/query-parameters/share-with-query-params_hu1768cf18cfb2b73ebd889af841247c40_881108_512x0_resize_box_3.png 512w" src="https://dekart.xyz/docs/usage/query-parameters/share-with-query-params.png" width="2719" height="1300" \u003e\u003c/noscript\u003e
  
\u003c/figure\u003e





\u003cp\u003eWhen you share a report with query parameters, the parameters are included in the URL. This allows you to share a report with specific parameters set.\u003c/p\u003e
\u003cp\u003eUser with Editor and Admin roles, who have access to update the report, can change the query parameters and see the updated results.\u003c/p\u003e
\u003cp\u003eViewers can view only cached results with the parameters set by the report owner.\u003c/p\u003e
`},{id:22,href:"https://dekart.xyz/docs/cloud/cloud-security-faq/",title:"Security Considerations",description:"Why Dekart Cloud is Secure",content:`\u003cp class="lead text-left"\u003e\u003ca href="/"\u003eDekart Cloud\u003c/a\u003e is designed to make your cybersecurity and legal teams happy. We achieve it by never storing tokens, and query results in Dekart Cloud backend.\u003c/p\u003e
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
`},{id:23,href:"https://dekart.xyz/docs/usage/cloud-security-faq/",title:"Security Considerations",description:"Why Dekart Cloud is Secure",content:`\u003cp class="lead text-left"\u003e\u003ca href="/"\u003eDekart Cloud\u003c/a\u003e is designed to make your cybersecurity and legal teams happy. We achieve it by never storing tokens, and query results in Dekart Cloud backend.\u003c/p\u003e
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
\u003cp\u003eSQL queries and their results are stored in Google Cloud Storage bucket \u003cem\u003eprovided by you!\u003c/em\u003e We never store tokens or query results in the Dekart Cloud backend. Nobody at Dekart can access your BigQuery data or Google Cloud Storage bucket.\u003c/p\u003e
\u003ch3 id="can-i-revoke-dekarts-access-if-i-change-my-mind"\u003eCan I revoke Dekart\u0026rsquo;s access if I change my mind?\u003c/h3\u003e
\u003cp\u003eYes, you can revoke Dekart\u0026rsquo;s access to your Google Cloud resources by signing out of Dekart Cloud. This will remove Dekart\u0026rsquo;s access to your Google Cloud resources and prevent Dekart from running queries or storing results in your Google Cloud Storage bucket.\u003c/p\u003e
\u003ch3 id="does-dekart-comply-with-data-protection-regulations"\u003eDoes Dekart comply with data protection regulations?\u003c/h3\u003e
\u003cp\u003eWe are committed to upholding the principles of GDPR and ensuring that your data rights are respected. We also comply with \u003ca href="https://cloud.google.com/terms/services"\u003eGoogle API Services User Data Policy\u003c/a\u003e and verified by Google\u0026rsquo;s Trust \u0026amp; Safety team.\u003c/p\u003e
\u003ch3 id="what-support-is-available-if-i-have-issues-or-questions-about-data-access"\u003eWhat support is available if I have issues or questions about data access?\u003c/h3\u003e
\u003cp\u003eIf you have any questions or issues about data access, please contact us via email at \u003ca href="mailto:support@dekart.xyz"\u003esupport@dekart.xyz\u003c/a\u003e or via \u003ca href="https://slack.dekart.xyz/"\u003eSlack\u003c/a\u003e.\u003c/p\u003e
`},{id:24,href:"https://dekart.xyz/docs/about/playground/",title:"BigQuery Playground",description:"Dekart BigQuery Playground: Create data-driven geospatial visualizations from BigQuery Public Datasets",content:`\u003cp\u003eCreate Kepler.gl Maps with \u003ca href="/docs/about/kepler-gl-map-examples/"\u003eBigQuery Public Datasets\u003c/a\u003e in seconds using SQL.\u003c/p\u003e
\u003cp\u003e\u003cmark\u003ePremium alternative to BigQuery GeoViz.\u003c/mark\u003e\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/?ref=create-workspace-playground" role="button"\u003eCreate Workspace\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="quick-start"\u003eQuick Start\u003c/h2\u003e
\u003cp\u003e\u003ciframe width="560" height="315" src="https://www.youtube.com/embed/qwOqLm3i7Ik" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\u003c/p\u003e
\u003col\u003e
\u003cli\u003e
\u003cp\u003eGo to \u003ca target="_blank" href="https://cloud.dekart.xyz/workspace"\u003ecloud.dekart.xyz\u003c/a\u003e\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eAuthorize with Google Account.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eCreate free workspace\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eCreate BigQuery connection.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eGrant access to BigQuery. Passthrough authentication is used, no tokens are stored on our side. No data is copied or stored.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eSelect BigQuery Project ID.\u003c/p\u003e
\u003c/li\u003e
\u003cli\u003e
\u003cp\u003eType example query (uses Chicago Crime Data)\u003c/p\u003e
\u003c/li\u003e
\u003c/ol\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-SQL" data-lang="SQL"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="k"\u003eSELECT\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003eprimary_type\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003edistrict\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elatitude\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="n"\u003elongitude\u003c/span\u003e\u003cspan class="p"\u003e,\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e    \u003c/span\u003e\u003cspan class="nb"\u003edate\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003efrom\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="n"\u003ebigquery\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003epublic\u003c/span\u003e\u003cspan class="o"\u003e-\u003c/span\u003e\u003cspan class="k"\u003edata\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003echicago_crime\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="n"\u003ecrime\u003c/span\u003e\u003cspan class="o"\u003e\`\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="w"\u003e\u003c/span\u003e\u003cspan class="k"\u003eWHERE\u003c/span\u003e\u003cspan class="w"\u003e  \u003c/span\u003e\u003cspan class="n"\u003eRand\u003c/span\u003e\u003cspan class="p"\u003e()\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e\u0026lt;\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e5\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="o"\u003e/\u003c/span\u003e\u003cspan class="w"\u003e \u003c/span\u003e\u003cspan class="mi"\u003e100\u003c/span\u003e\u003cspan class="p"\u003e.\u003c/span\u003e\u003cspan class="mi"\u003e0\u003c/span\u003e\u003cspan class="w"\u003e
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003col start="8"\u003e
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





\u003col start="9"\u003e
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





\u003col start="10"\u003e
\u003cli\u003eNow you can save and share you beautiful Map!\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/?ref=create-workspace-playground" role="button"\u003eCreate Workspace\u003c/a\u003e\u003c/p\u003e
`},{id:25,href:"https://dekart.xyz/docs/about/your-datasets/",title:"Query Private Datasets",description:"Using Dekart with your team/company internal/private datasets",content:`\u003cp\u003eDekart offers 2 different options to work with private datasets:\u003c/p\u003e
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
`},{id:26,href:"https://dekart.xyz/docs/",title:"Documentation",description:"Dekart Documentation",content:""},{id:27,href:"https://dekart.xyz/docs/about/screencast/",title:"Dekart Screencast",description:"Screencast: Querying Chicago Crime Dataset from BigQuery Public Data",content:`\u003cp class="lead text-left"\u003eCreate Maps with BigQuery public datasets in 40 seconds\u003c/p\u003e
\u003cp\u003e\u003ciframe width="560" height="315" src="https://www.youtube.com/embed/_2ryUu43XRo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/?ref=create-workspace-screencast" role="button"\u003eCreate Workspace\u003c/a\u003e\u003c/p\u003e
`}];e.add(n),userinput&&userinput.addEventListener("input",s,!0),suggestions&&suggestions.addEventListener("click",o,!0);function s(){if(!suggestions)return;var n,i=this.value,s=e.search(i,5),o=suggestions.childNodes,r=0,c=s.length;for(suggestions.classList.remove("d-none"),s.forEach(function(e){n=document.createElement("div"),n.innerHTML="<a href><span></span><span></span></a>",a=n.querySelector("a"),t=n.querySelector("span:first-child"),d=n.querySelector("span:nth-child(2)"),a.href=e.href,t.textContent=e.title,d.textContent=e.description,suggestions.appendChild(n)});o.length>c;)suggestions.removeChild(o[r])}function o(){if(!suggestions)return!1;for(;suggestions.lastChild;)suggestions.removeChild(suggestions.lastChild);return!1}})()