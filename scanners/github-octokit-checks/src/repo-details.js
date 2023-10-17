import { OctokitCheckStrategy } from './octokit-check-strategy.js'

export async function getRepoDetails(owner, repo, octokit) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        });
        return({
            "name": response.data.name,
            "description": response.data.description,
            "language": response.data.language, //TODO - if python - timeout re luc message cpho, react robot.txt...
            "visibility": response.data.visibility,
            "updated_at": response.data.updated_at, //TODO - there's also pushed out, but think this is for push to main - time since updated - re followups, tech debt, security
            "default_branch":response.data.default_branch, // TODO - use in branch protection checks...
            "clone_url": response.data.clone_url,
 
            "html_url": response.data.html_url,
            "created_at": response.data.created_at,
            "updated_at": response.data.updated_at,
            "pushed_at": response.data.pushed_at,
            "license": response.data.license,
            "has_pages": response.data.has_pages,
            // "all": response.data, // all langagus?
            // response.data.archived
        })
    
    } catch (error) {
        console.error("An error occurred while fetching repository details:", error.message);
    }
  }



  export class RepoDetailsCheckStrategy extends OctokitCheckStrategy {
    constructor(repoName, owner, octokit, branchName = 'main') {
      super(repoName, owner, octokit, branchName);

      this.endpoint = 'GET /repos/{owner}/{repo}'
      this.options = {
        owner: this.owner,
        repo: this.repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      };
    }
  
    async makeOctokitCall() {
        try {
          const response = await this.octokit.request(this.endpoint, this.options);
          return response;
        } catch (error) {
          console.error("An error occurred:", error.message);
          throw error;
        }
      }
  
      async formatResponse() {
        try {
          const response = await this.makeOctokitCall();
    
          return {
            'private': response.data.private,
            'description': response.data.description,
            "name": response.data.name,
            "description": response.data.description,
            "language": response.data.language, //TODO - if python - timeout re luc message cpho, react robot.txt...
            "visibility": response.data.visibility,
            "updated_at": response.data.updated_at, //TODO - there's also pushed out, but think this is for push to main - time since updated - re followups, tech debt, security
            "default_branch":response.data.default_branch, // TODO - use in branch protection checks...
            "clone_url": response.data.clone_url,
 
            "html_url": response.data.html_url,
            "created_at": response.data.created_at,
            "updated_at": response.data.updated_at,
            "pushed_at": response.data.pushed_at,
            "license": response.data.license,
            "has_pages": response.data.has_pages,
            'security_and_analysis': response.data.security_and_analysis,
            // 'vunerability_alerts': response.data.vunerability_alerts, //Set to true to enable security alerts for vulnerable dependencies

          };
        } catch (error) {
          console.error("An error occurred while formatting the response:", error.message);
          throw error;
        }
      }
  }
