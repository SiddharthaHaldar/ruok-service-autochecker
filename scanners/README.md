## Scanners
Currently working on the functionality for the different pieces that will be passed via NATs payload.  (Right now just started on the GitHub piece - pulling out details with the octokit API.)

*Service discovery* will pull in metadata from the DNS GitHub repo to determine which services (defined by endpoints) will be scanned, and their associated GitHub or code repos. (TODO - add in container registries too). *NOTE: currently adding annotations to dns metadata - was causing failures, so working from json for now. 

*GitHub scanning* will pull out various aspects from the code repo using the octokit API (and also cloning repo and querying directly)

*GitHub processing* will process and save (upsert?) in database

*Endpoint scanning* will search for aspects like uptime, DNS take over 

*Endpoint processing* will similarly, process and save in database

*Container Scanning*

*Container processing*
