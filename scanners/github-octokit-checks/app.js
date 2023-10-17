
import { GetRepoDetailsStrategy } from "./src/get-repo-details.js"
import { AutomatedSecurityFixesStrategy } from "./src/automated-security-fixes.js";
import { ProgrammingLanguagesStrategy } from "./src/all-langauges.js";
import { BranchProtectionStrategy } from "./src/branch-protection-details.js"
import { CodeContributorsStrategy } from "./src/code-contributors.js";
import { VunerabilityAlertsEnabledStrategy } from "./src/are-vunerability-alerts-enabled.js";
import { Octokit, App,  RequestError } from "octokit";

const OWNER = 'PHACDataHub'
const repoName = 'ruok-service-autochecker'

const octokit = new Octokit({ auth: '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' });

const strategy = new GetRepoDetailsStrategy(repoName, OWNER, octokit, 'main')
const response = await strategy.formatResponse()
console.log(response)

const dependabot = new AutomatedSecurityFixesStrategy(repoName, OWNER, octokit, 'main') 
const response3 =  await dependabot.formatResponse()
console.log(response3)

const all_languages = new ProgrammingLanguagesStrategy(repoName, OWNER, octokit, 'main') 
const response4 =  await all_languages.formatResponse()
console.log(response4)


// const branchProtection = new BranchProtectionStrategy(repoName, OWNER, octokit, 'main')
// const response5 =  await branchProtection.formatResponse()
// console.log(response5)


const codeContributors = new CodeContributorsStrategy(repoName, OWNER, octokit, 'main')
const response5 =  await codeContributors.formatResponse()
console.log(response5)

const vunerabilityAlertsEnabled = new VunerabilityAlertsEnabledStrategy(repoName, OWNER, octokit, 'main')
const response7 =  await vunerabilityAlertsEnabled.formatResponse()
console.log(response7)
// // Define the endpoint and options
// const endpoint = 'GET /repos/{owner}/{repo}';
// const options = {
//     owner: strategy.owner,
//     repo: strategy.repo,
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28',
//     },
// };

// // Make the API request
// try {
//     const response = await strategy.makeOctokitCall(endpoint, options);
//     // const formattedResponse = strategy.formatResponse(response);
//     // console.log('Formatted Response:', formattedResponse);
//     console.log(response)
// } catch (error) {
//     console.error('Error:', error.message);
// }