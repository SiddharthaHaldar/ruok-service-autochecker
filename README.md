# RUOK - Service Scanner

Automatically scans existing PHAC (GCP) services to provide visibility on endpoints and standards. 

This will be a crawler that pulls service details from the DNS repo to gather endpoints (to perform functions like service uptime checks), and their corresponding GitHub repositories to provide visibility on things like having vunerability scanning enabled and whether or not APIs are in play. 

*TODO - change name to TBD 

#### *Please note - this is work in progress - just getting started* 

This uses [Safe Inputs](https://github.com/PHACDataHub/safe-inputs) and [Tracker](https://github.com/canada-ca/tracker) as a starting point.

## To build and run 
```
docker compose up --build -d && ./database/db-init.sh
```

## To tear down 
```
docker compose down -v
```

#### Rough scope (to be converted to GitHub issues):
* Get list of data services/products 
    * pull from DNS repo, 
    * find other sources
* Pull in scanners from tracker (and NATs) 
* Modify scanners (ie. ruok functions) 
    * Use GitHub API to pull out metrics (Start with simple ones like is there a licence file, no .env in) (Could be multiple services)
    * Scan for list of data services/ products 
    * Find associated API endpoints (calls to APIs and exposed endpoints)
* Set up DB (most likely NoSQL - maybe Arrango or a GCP noSQL (there're a couple there and won't need to manage, but depends on whether we want to keep this cloud agnostic or not), maybe one document per services -  will need to figure out best practices here - might be better to split out)
* Create ruok API - and post info on UI: one icon (start with list rather than icon) per service (click for report, and the other services it produces for (that you can click on for reports/ contacts...), and what consumes it.)
* Determine interconnectedness between services with API endpoints (and create 'Facebook page for services"). Create graph and display on UI (both when click on service (maybe only display 2 degrees of separation depending on how large this gets, and a full graph in a different tab)).
* Containerize and deploy with kubernetes, cloudbuild, GKE (flux)
* Use least privileged service accounts
* Authentication and authorization
* Add product contacts for each services (is this just github or email, and phone number - how do we keep this up to date, and how do we determine this - do we pull this in on GCP account creation intake form - if so does that have an API, or is this a github repo owner, or both?)
* Add alerts
* Add in the introspection schema page Mike had shown earlier
* Maybe add in non-githubed services from Data Catalog (to fill in graph) 
* Add filters and search functions
* Pull in GoC UI components and address accessibility standards




