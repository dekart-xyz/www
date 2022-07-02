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
`},{id:1,href:"https://dekart.xyz/docs/self-hosting/docker/",title:"Docker",description:"Running Dekart for BigQuery as in Docker",content:`\u003ch2 id="aws-athena"\u003eAWS Athena\u003c/h2\u003e
\u003ch3 id="prerequisites"\u003ePrerequisites\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eAWS Account\u003c/li\u003e
\u003cli\u003eAWS Athena Workspace\u003c/li\u003e
\u003cli\u003eAWS S3 bucket\u003c/li\u003e
\u003cli\u003ePostgreSQL\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="running-docker"\u003eRunning docker\u003c/h3\u003e
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
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  -p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e  dekartxyz/dekart:0.8
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003ch2 id="bigquery"\u003eBigQuery\u003c/h2\u003e
\u003ch3 id="prerequisites-1"\u003ePrerequisites\u003c/h3\u003e
\u003cul\u003e
\u003cli\u003eGoogle Cloud Project\u003c/li\u003e
\u003cli\u003eBigQuery API Enabled\u003c/li\u003e
\u003cli\u003eCloud SQL DB (Postgres)\u003c/li\u003e
\u003cli\u003eCloud Storage Bucket\u003c/li\u003e
\u003cli\u003eService account credentials with access to all above\u003c/li\u003e
\u003cli\u003eMapbox Token\u003c/li\u003e
\u003c/ul\u003e
\u003ch3 id="running-docker-1"\u003eRunning docker\u003c/h3\u003e
\u003cdiv class="highlight"\u003e\u003cpre tabindex="0" class="chroma"\u003e\u003ccode class="language-bash" data-lang="bash"\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e	docker run -it --rm \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-v \u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e:\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eGOOGLE_APPLICATION_CREDENTIALS\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_DB\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_USER\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PASSWORD\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_PORT\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_POSTGRES_HOST\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_BIGQUERY_PROJECT_ID\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_BIGQUERY_PROJECT_ID\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_BIGQUERY_MAX_BYTES_BILLED\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="m"\u003e53687091200\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-e \u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="o"\u003e=\u003c/span\u003e\u003cspan class="si"\u003e\${\u003c/span\u003e\u003cspan class="nv"\u003eDEKART_MAPBOX_TOKEN\u003c/span\u003e\u003cspan class="si"\u003e}\u003c/span\u003e \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		-p 8080:8080 \u003cspan class="se"\u003e\\
\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan class="line"\u003e\u003cspan class="cl"\u003e\u003cspan class="se"\u003e\u003c/span\u003e		dekartxyz/dekart:0.8
\u003c/span\u003e\u003c/span\u003e\u003c/code\u003e\u003c/pre\u003e\u003c/div\u003e\u003cp\u003eSee details on \u003ca href="/docs/configuration/environment-variables"\u003eenvironment variables\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="example"\u003eExample\u003c/h2\u003e
\u003cul\u003e
\u003cli\u003eRun with \u003ca href="https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile"\u003eMakefile\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
`},{id:2,href:"https://dekart.xyz/docs/self-hosting/docker-compose/",title:"Docker Compose",description:"Run Dekart locally with docker-compose",content:`\u003ch2 id="aws-athena"\u003eAWS Athena\u003c/h2\u003e
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
\u003cpre tabindex="0"\u003e\u003ccode\u003ePOSTGRES_PASSWORD=
PROJECT_ID=
CLOUD_STORAGE_BUCKET=
MAPBOX_TOKEN=
DEKART_ATHENA_CATALOG=
DEKART_ATHENA_S3_OUTPUT_LOCATION=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
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
\u003cpre tabindex="0"\u003e\u003ccode\u003ePOSTGRES_PASSWORD=
PROJECT_ID=
CLOUD_STORAGE_BUCKET=
MAPBOX_TOKEN=
GOOGLE_APPLICATION_CREDENTIALS=
\u003c/code\u003e\u003c/pre\u003e\u003col start="3"\u003e
\u003cli\u003eRun\u003c/li\u003e
\u003c/ol\u003e
\u003cpre tabindex="0"\u003e\u003ccode\u003edocker-compose  --env-file .env up dekart-bigquery
\u003c/code\u003e\u003c/pre\u003e`},{id:3,href:"https://dekart.xyz/docs/self-hosting/upgrade/",title:"Upgrade to new version",description:"How to upgrade and migration notes",content:`\u003cp\u003e\u003cdiv class="alert alert-primary" role="alert"\u003e
Before you begin: it is always recommended to backup your postgres database before upgrading Dekart. On the first run Dekart applies migrations to database and you won't be able to downgrade.
\u003c/div\u003e\u003c/p\u003e
\u003cp\u003eFor all Docker based deployments, update docker tag, for example:\u003c/p\u003e
\u003cp\u003e\u003ccode\u003edekartxyz/dekart:0.7\u003c/code\u003e -\u0026gt; \u003ccode\u003edekartxyz/dekart:0.8\u003c/code\u003e\u003c/p\u003e
\u003cp\u003eThen redeploy application\u003c/p\u003e
\u003ch2 id="migration-instructions"\u003eMigration instructions\u003c/h2\u003e
\u003cp\u003eThere is no breaking configuration changes in version \u003ccode\u003e0.8\u003c/code\u003e\u003c/p\u003e
`},{id:4,href:"https://dekart.xyz/docs/contributing/architecture-overview/",title:"Architecture",description:"Build Dekart from Source",content:`\u003ch2 id="overview"\u003eOverview\u003c/h2\u003e
\u003cp\u003e\u003ca href="./dekart-architecture-overview.png"\u003e\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_600x0_resize_box_3.png 600w"
    width="1990"
    height="830"
    alt="Dekart Architecture Overview"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview_hub4b05022d08421960d83959a78f58b17_144806_600x0_resize_box_3.png 600w" src="https://dekart.xyz/docs/contributing/architecture-overview/dekart-architecture-overview.png" width="1990" height="830" alt="Dekart Architecture Overview"\u003e\u003c/noscript\u003e
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
    data-srcset="https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_600x0_resize_box_3.png 600w"
    width="2134"
    height="770"
    alt="BigQuery Query Flow"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/contributing/architecture-overview/making-query_hu7febaf73035dc81d89fbd4cc14e5461a_156921_600x0_resize_box_3.png 600w" src="https://dekart.xyz/docs/contributing/architecture-overview/making-query.png" width="2134" height="770" alt="BigQuery Query Flow"\u003e\u003c/noscript\u003e
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
`},{id:5,href:"https://dekart.xyz/docs/contributing/build-from-source/",title:"Build from Source",description:"Build Dekart from Source",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
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
\u003c/code\u003e\u003c/pre\u003e`},{id:6,href:"https://dekart.xyz/docs/self-hosting/from-source/",title:"Build from Source",description:"Build Dekart from Source",content:`\u003ch2 id="prerequisites"\u003ePrerequisites\u003c/h2\u003e
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
\u003c/code\u003e\u003c/pre\u003e`},{id:7,href:"https://dekart.xyz/docs/contributing/",title:"Contributing",description:"Contributing to the project",content:""},{id:8,href:"https://dekart.xyz/docs/configuration/environment-variables/",title:"Environment Variables",description:"Environment Variables",content:`\u003cp\u003eDekart deployment requires:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003ePostgres DB (like Cloud SQL) to store metadata\u003c/li\u003e
\u003cli\u003eMapbox token to load the map\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eFor BigQuery data source:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eaccess to BigQuery API\u003c/li\u003e
\u003cli\u003eCloud Storage or S3 bucket where query results are stored\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eFor AWS Athena:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eaccess to AWS Athena workspace\u003c/li\u003e
\u003cli\u003eS3 bucket where query results are stored\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eOptionally, secure deployment with Google IAP. You have 2 options:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eJust configure Google IAP (for example for \u003ca href="/docs/self-hosting/app-engine/"\u003eApp Engine\u003c/a\u003e deployment)\u003c/li\u003e
\u003cli\u003eAdditionally \u003ca href="#user-management-with-google-iap"\u003eenable user authentication with Google IAP\u003c/a\u003e to isolate user permissions\u003c/li\u003e
\u003c/ul\u003e
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
\u003ctd\u003e\u003ccode\u003eDEKART_DATASOURCE=BQ\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eWhich datasource to use: \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eBQ\u003c/code\u003e BigQuery, default\u003c/li\u003e\u003cli\u003e\u003ccode\u003eATHENA\u003c/code\u003e AWS Athena\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_STORAGE=GCS\u003c/code\u003e \u003cbr\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eWhich storage backend to use for storing queries and query results \u003cbr\u003eValues\u003cul\u003e\u003cli\u003e\u003ccode\u003eGCS\u003c/code\u003e Google Cloud Storage, default, works only with BigQuery data source\u003c/li\u003e\u003cli\u003e\u003ccode\u003eS3\u003c/code\u003e AWS S3, works with BigQuery and AWS Athena\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e\u003c/td\u003e
\u003ctd\u003eGoogle Cloud Storage or AWS S3 bucket name where Dekart Query results will be stored. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003edekart-bucket\u003c/code\u003e\u003c/td\u003e
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
\u003ctd\u003eAmazon S3 query result location required by Athena SDK. This is different from  \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e. First query results are stored in \u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e and then copied to \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e.  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eathena-results\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.8\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eAmazon S3 query result location required by Athena SDK. This is different from  \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e. First query results are stored in \u003ccode\u003eDEKART_ATHENA_S3_OUTPUT_LOCATION\u003c/code\u003e and then copied to \u003ccode\u003eDEKART_CLOUD_STORAGE_BUCKET\u003c/code\u003e.  \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003eathena-results\u003c/code\u003e\u003c/td\u003e
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
\u003ctd\u003eUnique identifier for your Google Cloud project with BigQuery API Enabled. \u003cbr\u003e \u003cem\u003eExample\u003c/em\u003e: \u003ccode\u003emy-project\u003c/code\u003e\u003c/td\u003e
\u003c/tr\u003e
\u003ctr\u003e
\u003ctd\u003e\u003ccode\u003eDEKART_BIGQUERY_MAX_BYTES_BILLED\u003c/code\u003e \u003cbr/\u003e\u003csmall class="badge badge-info"\u003eversion \u0026gt;= 0.7\u003c/small\u003e\u003c/td\u003e
\u003ctd\u003eSets \u003ccode\u003emaximumBytesBilled\u003c/code\u003e in BigQuery Job Configuration to implement  \u003ca href="https://cloud.google.com/bigquery/docs/best-practices-costs#limit_query_costs_by_restricting_the_number_of_bytes_billed"\u003eBest Practices for Controlling Query Cost\u003c/a\u003e.\u003cbr\u003e If not set warning message will appear in logs.\u003c/td\u003e
\u003c/tr\u003e
\u003c/tbody\u003e
\u003c/table\u003e
\u003ch2 id="user-management-with-google-iap"\u003eUser management with Google IAP\u003c/h2\u003e
\u003cp\u003eDekart can read \u003ca target="_blank" href="https://cloud.google.com/iap/docs/signed-headers-howto"\u003eclaims provided by Google IAP\u003c/a\u003e and implement following policies:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eUser can list and edit only their own reports\u003c/li\u003e
\u003cli\u003eUsers have read-only access to other users reports\u003c/li\u003e
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
`},{id:9,href:"https://dekart.xyz/docs/about/playground/",title:"BigQuery Playground",description:"Dekart BigQuery Playground: Create data-driven geospatial visualizations from BigQuery Public Datasets",content:`\u003cp\u003eYou can try Dekart on \u003ca target="_blank" href="https://play.dekart.xyz"\u003eplay.dekart.xyz\u003c/a\u003e (requires Gmail Account) with one of many Public Datasets available on BigQuery.\u003c/p\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://play.dekart.xyz/" role="button"\u003eGo to BigQuery Playground\u003c/a\u003e\u003c/p\u003e
\u003cp\u003e\u003ca target="_blank" href="https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset" role="button"\u003eBigQuery Public Datasets\u003c/a\u003e and \u003ca target="_blank" href="https://www.reddit.com/r/bigquery/wiki/datasets" role="button"\u003eEven More Datasets\u003c/a\u003e\u003c/p\u003e
\u003ch2 id="quick-start"\u003eQuick Start\u003c/h2\u003e
\u003cimg class="img-simple img-fluid lazyload" src="https://dekart.xyz/docs/about/playground/screencast_hubcb05f9855198997eaa919acc67d2bb4_11376295_20x0_resize_box.gif" data-src="https://dekart.xyz/docs/about/playground/screencast.gif" width="1024" height="640" alt="Screencast"\u003e


\u003col\u003e
\u003cli\u003e
\u003cp\u003eGo to \u003ca target="_blank" href="https://play.dekart.xyz"\u003eplay.dekart.xyz\u003c/a\u003e\u003c/p\u003e
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
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_600x0_resize_box_3.png 600w"
    width="3224"
    height="2094"
    alt="Create Report"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-1_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_665788_600x0_resize_box_3.png 600w" src="https://dekart.xyz/docs/about/playground/quick-start-1.png" width="3224" height="2094" alt="Create Report"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003col\u003e
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
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_600x0_resize_box_3.png 600w"
    width="3224"
    height="2094"
    alt="Report Edit"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-2_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_1667085_600x0_resize_box_3.png 600w" src="https://dekart.xyz/docs/about/playground/quick-start-2.png" width="3224" height="2094" alt="Report Edit"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003col\u003e
\u003cli\u003eStyle a map (see \u003ca href="https://docs.kepler.gl/docs/user-guides"\u003eKepler Docs\u003c/a\u003e for details)\u003c/li\u003e
\u003c/ol\u003e
\u003cfigure\u003e
  \u003cimg
    class="img-fluid lazyload"
    data-sizes="auto"
    src="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_20x0_resize_box_3.png"
    data-srcset="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_600x0_resize_box_3.png 600w"
    width="3224"
    height="2094"
    alt="Style Visualization"
  \u003e
  \u003cnoscript\u003e\u003cimg class="img-fluid" sizes="100vw" srcset="https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_1800x0_resize_box_3.png 1800w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_900x0_resize_box_3.png 900w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_800x0_resize_box_3.png 800w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_700x0_resize_box_3.png 700w,https://dekart.xyz/docs/about/playground/quick-start-3_hu792ac3e85c0c93a8c23b1ebcfbcccbc3_3533310_600x0_resize_box_3.png 600w" src="https://dekart.xyz/docs/about/playground/quick-start-3.png" width="3224" height="2094" alt="Style Visualization"\u003e\u003c/noscript\u003e
  
\u003c/figure\u003e


\u003col\u003e
\u003cli\u003eNow you can save and share you beautiful Map!\u003c/li\u003e
\u003c/ol\u003e
\u003cp\u003e\u003ca class="btn btn-primary" target="_blank" href="https://play.dekart.xyz/" role="button"\u003eGo to BigQuery Playground\u003c/a\u003e\u003c/p\u003e
\u003cp\u003e\u003ca href="/docs/about/your-datasets/"\u003eHow to use with Your Private Datasets\u003c/a\u003e\u003c/p\u003e
`},{id:10,href:"https://dekart.xyz/docs/about/your-datasets/",title:"Use with Your Data",description:"Using Dekart with your team/company internal/private datasets",content:`\u003cp\u003eWith Dekart you can query and visualize private datasets using BigQuery and AWS Athena. For this you can self-host Dekart instance (open-source, MIT License \u003ca href="https://github.com/dekart-xyz/dekart"\u003eGitHub\u003c/a\u003e) on your Google Cloud or AWS account:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003e\u003ca href="/docs/self-hosting/app-engine"\u003eRunning Dekart on Google App Engine\u003c/a\u003e\u003c/li\u003e
\u003cli\u003eRunning Dekart on AWS (documentation coming soon)\u003c/li\u003e
\u003cli\u003e\u003ca href="/docs/self-hosting/docker"\u003eRunning Dekart with Docker\u003c/a\u003e\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eTo secure your Dekart instance, you can:\u003c/p\u003e
\u003cul\u003e
\u003cli\u003eConfigure \u003ca href="https://cloud.google.com/iap/docs/app-engine-quickstart"\u003eGoogle IAP\u003c/a\u003e for your deployment\u003c/li\u003e
\u003cli\u003eOptionally, \u003ca href="/docs/configuration/environment-variables/#user-management-with-google-iap"\u003econfigure Dekart to Authorize users\u003c/a\u003e with Google IAP\u003c/li\u003e
\u003c/ul\u003e
`},{id:11,href:"https://dekart.xyz/docs/",title:"Documentation",description:"Dekart Documentation",content:""},{id:12,href:"https://dekart.xyz/docs/about/screencast/",title:"Dekart Screencast",description:"Screencast: Querying Chicago Crime Dataset from BigQuery Public Data",content:`\u003cimg class="img-simple img-fluid lazyload" src="https://dekart.xyz/docs/about/screencast/screencast_hubcb05f9855198997eaa919acc67d2bb4_11376295_20x0_resize_box.gif" data-src="https://dekart.xyz/docs/about/screencast/screencast.gif" width="1024" height="640" alt="Querying Chicago Crime Dataset from BigQuery Public Data"\u003e
\u003cdiv class="img-simple-caption"\u003eQuerying Chicago Crime Dataset from BigQuery Public Data\u003c/div\u003e

\u003cdiv class="text-center"\u003e
      \u003cp class="mt-5"\u003e\u003ca class="btn btn-primary" href="/docs/about/playground/" role="button"\u003eTry Live on Playground\u003c/a\u003e\u003c/p\u003e
      \u003cp\u003e\u003ca href="/docs/about/your-datasets/"\u003eUse with Private Datasets\u003c/a\u003e\u003c/p\u003e
    \u003c/div\u003e
`}];e.add(n),userinput.addEventListener("input",s,!0),suggestions.addEventListener("click",o,!0);function s(){var n,i=this.value,s=e.search(i,5),o=suggestions.childNodes,r=0,c=s.length;for(suggestions.classList.remove("d-none"),s.forEach(function(e){n=document.createElement("div"),n.innerHTML="<a href><span></span><span></span></a>",a=n.querySelector("a"),t=n.querySelector("span:first-child"),d=n.querySelector("span:nth-child(2)"),a.href=e.href,t.textContent=e.title,d.textContent=e.description,suggestions.appendChild(n)});o.length>c;)suggestions.removeChild(o[r])}function o(){for(;suggestions.lastChild;)suggestions.removeChild(suggestions.lastChild);return!1}})()