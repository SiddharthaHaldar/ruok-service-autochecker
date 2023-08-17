// Not entirely sure if these should be separate files - they kind of seem like they should.... keeping them here for now because it's
// easy to import and test. 

export async function licenceDetails(owner, repo, octokit) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/license', {
          owner: owner,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        console.log("Licence:", response.data.license.spdx_id);
    
    
      } catch (error) {
        if (error.status === 404) {
            console.log('License not found for the repository');
            console.log("")
        } else {
            console.error('An error occurred:', error.message);
            console.log("")
        }
      }
    }

export async function repoLanguages(owner, repo, octokit) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/languages', {
            owner: owner,
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
    
        console.log(response.data);
    } catch (error) {
        console.error("An error occurred while fetching repo langauges:", error.message);
    }
    }

export async function getFileContents(owner, repo, octokit, path) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner: owner,
          repo: repo,
          path: path,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
      
        // const names = repoContents.data.map(content => content.name);
        // console.log(names);
        console.log(response.data.path)
        console.log(Buffer.from(repoContents.data.content, 'base64').toString('utf-8'))
      } catch (error) {
        console.error("An error occurred while fetching repository contents:", error.message);
      }
    }
      
export async function githubPages(owner, repo, octokit) {
    try {
        const respGHPages = await octokit.request('GET /repos/{owner}/{repo}/pages', {
          owner: owner,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        console.log(respGHPages)
        console.log("url:", respGHPages.data.url);
        console.log("status:", respGHPages.data.status);
        console.log("https enforced:", respGHPages.data.https_enforced);
        console.log("protected domain state:", respGHPages.data.protected_domain_state)
        console.log("")
      } catch (error) {
        if (error.status === 404) {
          console.log("GitHub Pages are not found for this repository.");
          console.log("")
        } else {
          console.error("An error occurred while fetching GitHub Pages information:", error.message);
          console.log("")
        }
      }
    }

export async function repoDetails(owner, repo, octokit) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        });
    
        console.log("name:", response.data.name);
        console.log("id:", response.data.id);
        console.log("description:", response.data.description);
        console.log("updated_at:", response.data.updated_at); //TODO - time since updated - re followups, tech debt, security
        console.log("language:", response.data.language); //TODO - if python - timeout re luc message cpho, react robot.txt...
        console.log("visibility:", response.data.visibility);
        console.log("default_branch:", response.data.default_branch); // TODO - use in branch protection checks...
        console.log("")
    
    } catch (error) {
        console.error("An error occurred while fetching repository details:", error.message);
    }
    }