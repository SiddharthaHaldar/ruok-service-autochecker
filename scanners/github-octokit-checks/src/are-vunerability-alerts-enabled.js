
import { OctokitCheckStrategy } from './octokit-check-strategy.js'

export class VunerabilityAlertsEnabledStrategy extends OctokitCheckStrategy {
    constructor(repoName, owner, octokit, branchName = 'main') {
        super(repoName, owner, octokit, branchName);

        this.endpoint = '/repos/{owner}/{repo}/vulnerability-alerts'
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
            if (response.status == 204) {
                return {
                    'vunerability_alerts_enabled': true 
                }   
            }
        } catch (error) {
            if (error.message == 'Vulnerability alerts are disabled.')
            return {
                'vunerability_alerts_enabled': false,
            }  
        }
    }
}