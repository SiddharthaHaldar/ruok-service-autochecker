# RUOK Service Scanner - AKA Observatory

[**Documentation Site**](https://phacdatahub.github.io/ruok-service-autochecker)

Automatically scans existing PHAC (GCP) services to provide visibility on endpoints and standards. 

This crawler pulls service endpoints from the [dns](https://github.com/PHACDataHub/dns/tree/main/dns-records) repo - these endpoints would be, source code repositories (eg. GitHub), container repositories (eg. dockerHub, Artifact Registry), URL endpoints (eg. webapp and it's API), and domains.  It then uses these endpoints to kickoff a series of checks to gather business and security information.  Some examples would be, does this service have an API, does it have GitHub main branch protection enabled, are there unit tests, and is vunerability scanning in place in both the code and container repositories. The plan is to also have this scanner perform uptime checks on these services and send alerts if a service goes down.  

Full list of checks can be found in the [scanners](./scanners) section. 

## Application Architecture

See the [Architecture](docs/architecture.md) page for an overview of the RUOK application architecture.

## Development Environment

See the [Development Environment](docs/development-environment.md) page for recommendations on setting up the development environment for this project.

## Deployment

See the [Deployment](docs/deployment.md) page for instructions on how to deploy the `ruok-service-autochecker` application.




