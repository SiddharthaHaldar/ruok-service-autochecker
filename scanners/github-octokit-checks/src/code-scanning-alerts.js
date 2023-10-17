export async function getCodeScanningAlerts(owner, repo, octokit, branch) {
    // don't have permissions for this right now 
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
        owner: owner,
        repo: repo,
        branch: branch,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      console.log (response.data)
      return({
        "response": response.data
      })
    } catch (error) {
      console.error("An error occurred while fetching branch protection details:", error.message);
    }
  }
  // await getCodeScanningAlerts(owner, repo, octokit)
  // don't have permissions for this right now 
  