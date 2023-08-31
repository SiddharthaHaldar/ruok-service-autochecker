## Service Discovery
The plan is to kick off the crawler by scanning the [dns](https://github.com/PHACDataHub/dns) repo, pulling out metadata. 
* Owner name
* Owner email (to contact if alert ie notice a service is down)
* Github repository

In the process of adding as optional annotations:
* container repositories
* service urls 
* Other code repositories

We may also want to scan GCP projects in the future as not all services will be registered with DNS
* [acm-core](https://github.com/PHACDataHub/acm-core/tree/main)

In the mean time, we will need to determine where else to find these services and temporarily start with a file with known services (known-service-list.json) and work backwards.  

service-discovery will add services to database and kick off other scanners. 

TODO:
* Talk to Zachary re services
* Look at data catalog for additional services


annotations in dns repo are in the form 

    projectName: <your-project-name>
    projectOwnerDivisionAcronym: <eg-DSCO-or-DS>
  # The following items are optional - please comment out or remove lines that are not applicable 
    gitHubRepository: <https://github.com/PHACDataHub/<repository-name>>
    nonGitHubCodeRepository: <eg-azure-devops-repo>
  # Include one line for each service, e.g. API, UI...
    serviceURLs:
      - <service-url>
    containerRegistries:
      - <eg-GCP-artifact-registry-or-docker-hub>