## Service Discovery
The plan is to kick off the crawler by scanning the [dns](https://github.com/PHACDataHub/dns) repo, pulling out metadata. 
* Project name
* Source code repository
* APM Id - if there is one
* Service endpoint urls
* Container registries


We may also want to scan GCP projects (acm-core) in the future as not all services will be registered with DNS

In the mean time, we will need to determine where else to find these services and temporarily start with a file with known services (known-service-list.json) and work backwards.  

service-discovery will add these projects to database and kick off the scanners. (for now GitHub Repo scanner, but in also in the future, service health check and security scanner and container scanner.)

TODO:
* Look at data catalog for additional services
* Link remaining dns records to source code repositories 

Metadata annotations in dns repo are in the form 

```
  annotations:
    projectName: "<project-name>"
    codeSourceRepository: "<codeSourceRepository>"
    # The following annotations are optional - please comment out or remove lines that are not applicable 
    serviceEndpointUrls: "<comma-separated-list-of-service url endpoints>"
    containerRegistries: "<comma-separated-list-of-container-registries>"
    apmId: <apm-id>
```