## Scanners
Currently working on the functionality for the different pieces that will be passed via NATs payload.  (Right now just started on the GitHub piece - pulling out details with the octokit API.)

*Service discovery* will pull in metadata from the DNS GitHub repo to determine which services (defined by endpoints) will be scanned, and their associated GitHub or code repos. (TODO - add in container registries too). *NOTE: currently adding annotations to metadata is causing failures. workign from json for now. 

*GitHub scanning* will pull out various aspects from the code repo using the octokit API (and also cloning repo and querying directly)

*GitHub processing* will process and save (upsert?) in database

*Endpoint Scanning* will search for aspects like uptime, DNS take over 

*Endpoint Processing* will similarly, process and save in database
