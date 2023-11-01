Container Scanning 

Cloud Build scanning: 
https://cloud.google.com/artifact-analysis/docs/ods-cloudbuild

https://medium.com/ascentic-technology/secure-container-images-with-trivy-1ef12b5b9b4d


Scan private containers (givebe permissions)
trivy cloudlifeacr.azurecr.io/myhealth.web:latest

<!-- git ops


install: (https://aquasecurity.github.io/trivy/v0.18.3/installation/)
```
wget https://github.com/aquasecurity/trivy/releases/download/v0.18.3/trivy_0.18.3_Linux-64bit.deb
sudo dpkg -i trivy_0.18.3_Linux-64bit.deb
``` -->


This is a good explaination
https://www.bluetab.net/en/container-vulnerability-scanning-with-trivy/
```
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/master/contrib/install.sh | sudo sh -s -- -b /usr/local/bin 
```

Docker scout https://docs.docker.com/scout/


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