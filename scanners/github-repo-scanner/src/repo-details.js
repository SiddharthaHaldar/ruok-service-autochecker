export async function repoDetails(owner, repo, oc) {
  
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
