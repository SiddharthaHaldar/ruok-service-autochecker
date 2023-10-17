export async function getPullRequestProtection(owner, repo, octokit, branch) {
    // don't have permissions for this right now 
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews', {
        owner: owner,
        repo: repo,
        branch: branch,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      console.log (response.data)
      return({
        "protected": true,
        "response": response.data
      })
    } catch (error) {
      if (error.status === 404) {
        return({"protected": false})
      } else {
        console.error('An error occurred:', error.message);
        return({"protected": false})
      }
    }
  }
  // const test = await getPullRequestProtection(owner, repo, octokit, 'acm-core')
  // console.log(test)