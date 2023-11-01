Container Scanning 

To pull from artifact registry, need Artifact Registry Reader (roles/artifactregistry.reader)
https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling


Cloud Build scanning: 
https://cloud.google.com/artifact-analysis/docs/ods-cloudbuild

https://medium.com/ascentic-technology/secure-container-images-with-trivy-1ef12b5b9b4d


https://cloud.google.com/artifact-analysis/docs/os-scanning-automatically



Scan private containers (givebe permissions)
trivy cloudlifeacr.azurecr.io/myhealth.web:latest

INSTALL [gcloud](https://cloud.google.com/sdk/docs/install)
```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates gnupg curl sudo
```

<!-- git ops


install: (https://aquasecurity.github.io/trivy/v0.18.3/installation/)
```
wget https://github.com/aquasecurity/trivy/releases/download/v0.18.3/trivy_0.18.3_Linux-64bit.deb
sudo dpkg -i trivy_0.18.3_Linux-64bit.deb
``` -->
https://cloud.google.com/artifact-analysis/docs/quickstart-scanning-os-manually
https://cloud.google.com/artifact-analysis/docs/quickstart-scanning-nodejs-automatically -ensure vunerability scanning in place in artifact registry - determine what's actually scanned

gcloud services enable containerscanning.googleapis.com  artifactregistry.googleapis.com

This is a good explaination
https://www.bluetab.net/en/container-vulnerability-scanning-with-trivy/
```
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/master/contrib/install.sh | sudo sh -s -- -b /usr/local/bin 
```
download artifact credential [utility helper](https://cloud.google.com/artifact-registry/docs/docker/authentication#standalone-helper) - if no gcloud, but ended up installing gcloud in the end.
```
curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz" \
| tar xz docker-credential-gcr \
&& chmod +x docker-credential-gcr && sudo mv docker-credential-gcr /usr/bin/
```
add to docker container registry
```
docker-credential-gcr configure-docker --registries=northamerica-northeast1-docker.pkg.dev```
docker-credential-gcr configure-docker --registries=northamerica-northeast2-docker.pkg.dev

Docker scout https://docs.docker.com/scout/

project id phx-01h1yptgmche7jcy01wzzpw2rf

using docker 

pull image 
```
docker pull aquasec/trivy
```
scan image
```
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image python:3.4-alpine
```
for file system 
```
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy fs .
```
run in server mode?