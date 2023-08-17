## Scanners
Currently working on the functionality for the different pieces that will be communicated via NATs payload.  (Right now just started on the GitHub piece.)

*Service discovery* will pull in metadata from the DNS GitHub repo to determine which services (defined by endpoints) will be scanned, and their associated GitHub or code repos. (TODO - add in container registries too)

*GitHub scanning* will pull out various aspects from the code repo using the octokit API (and probably cloning repo and querying directly)

*GitHub processing* will process and save in database

*Service Scanning* will search for aspects like uptime, DNS take over 

Service Processing will similarly, process and save in database
