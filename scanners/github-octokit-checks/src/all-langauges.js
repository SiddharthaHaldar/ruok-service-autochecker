// export async function repoLanguages(owner, repo, octokit) {
//     try {
//         const response = await octokit.request('GET /repos/{owner}/{repo}/languages', {
//             owner: owner,
//             repo: repo,
//             headers: {
//               'X-GitHub-Api-Version': '2022-11-28'
//             }
//           });
    
//         // console.log(response.data);
//         return({"all-languages": response.data})
//     } catch (error) {
//         console.error("An error occurred while fetching repo langauges:", error.message);
//     }
//   }

  // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28
import { OctokitCheckStrategy } from './octokit-check-strategy.js'

export class ProgrammingLanguagesStrategy extends OctokitCheckStrategy {
    constructor(repoName, owner, octokit, branchName = 'main') {
      super(repoName, owner, octokit, branchName);

      this.endpoint = 'GET /repos/{owner}/{repo}/languages'
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
            'all_languages': response.data 
          }
        } catch (error) {
          console.error("An error occurred while formatting the response:", error.message);
          throw error;
        }
      }
  }
