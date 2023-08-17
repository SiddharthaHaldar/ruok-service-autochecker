## GitHub Scanner

Using Octokit API to interact with GitHub.  

1. Create a GitHub token and add to .env file
### To Run:
Change the repo to the one you'd like to view
``` 
npm start 
``` 

TODO: Switch over to GraphQL APIs 

### Notes:
https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-languages

endpoints allowed for fine grained access token:
https://docs.github.com/en/rest/overview/endpoints-available-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28

Options: 
* [list all repositorys](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories) (compare to exisitng list...)
* https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-vulnerability-alerts-are-enabled-for-a-repository
* [enable vunerability alerts](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#enable-vulnerability-alerts)
* [secret scanning](https://docs.github.com/en/rest/secret-scanning/secret-scanning?apiVersion=2022-11-28)
* [Dependabot](https://docs.github.com/en/rest/dependabot/alerts?apiVersion=2022-11-28)
* files to scan - LICENCE, 
* not credentials in form of .env - (Does the .gitignore file ignore files with credentials? ie: includes **/*.env 
Does the .dockerignore files ignore files with credentials? ie: includes **/*.env )
* security.md file
* API - is it rest of graphql - how are we going to determine this?


From the list:
Verify:
SLOs established?
Uptime tracking?
Are there tests? Is coverage enabled?
Does the project contain a LICENSE file
DNS takeovers
Subdomain takeovers 
Does the .gitignore file ignore files with credentials? ie: includes **/*.env 
Does the .dockerignore files ignore files with credentials? ie: includes **/*.env 
Is Secret scanning enabled for that repo?
Is there a security.md file?
existence of an API
REST/graphql
vuln scanning enabled
More from Open data products spec: https://opendataproducts.org/
PHAC data standards

Other thoughts:
Pull out languagues (to ensure langague specific security properties are being applied)
```
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/PHACDataHub/safe-inputs/languages
```
cURL
JavaScript
GitHub CLI

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('GET /repos/{owner}/{repo}/languages', {
  owner: 'OWNER',
  repo: 'REPO',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})


