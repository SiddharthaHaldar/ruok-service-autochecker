# RUOK Service Scanner - AKA Observatory

[**Documentation Site**](https://phacdatahub.github.io/ruok-service-autochecker)

The Observatory is an automated, event-driven scanning framework for IT product/service endpoints (eg. GitHub repositories, URL, container registries). This is a currently proof-of-concept, and we’re hoping to align the relevant ITSG-33 controls with Observatory’s scanners’ checks, along with GCP metrics - to deliver on-going automated compliance and an ‘Auto-ATO’.

## Scanners

The full list of checks can be found in the [scanners](./scanners) section of the docs. Some of these are web accessibility checks, secret scanning, Dockerfile linting, and vulnerability scanning. 

## Benefits

-	Reduced risk of compromise, breaches, system downtime due to cyber issues
-	Working towards automated compliance and an ‘Auto-ATO’  
-	Better insights into libraries in use - for ease of maintenance and support
-	Provide developer feedback to practice good security practices.
-	Reduced cost and time to prod because of automated security assessment and authorization (ATO) 

## Application Architecture

See the [Architecture](docs/architecture.md) page for an overview of the RUOK application architecture.

## Development Environment

See the [Development Environment](docs/development-environment.md) page for recommendations on setting up the development environment for this project.

## Deployment

See the [Deployment](docs/deployment.md) page for instructions on how to deploy the `ruok-service-autochecker` application.




