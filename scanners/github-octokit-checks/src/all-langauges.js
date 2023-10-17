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

  async formatResponse() {
    try {
      const response = await this.makeOctokitRequest();

      return {
        'all_languages': response.data 
      }
    } catch (error) {
      console.error("An error occurred while formatting the response:", error.message);
      throw error;
    }
  }
}
