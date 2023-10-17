import { OctokitCheckStrategy } from "./src/octokit-check-strategy.js";
import { RepoDetailsCheckStrategy } from "./src/repo-details.js"
import { AutomatedSecurityFixesStrategy } from "./src/automated-security-fixes.js";
import { ProgrammingLanguagesStrategy } from "./src/all-langauges.js";
import { Octokit, App,  RequestError } from "octokit";

const OWNER = 'PHACDataHub'
const repoName = 'ruok-service-autochecker'

const octokit = new Octokit({ auth: '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' });
// const strategy = new OctokitCheckStrategy(repoName, OWNER, octokit, 'main');
// const strategy = new RepoDetailsCheckStrategy(repoName, OWNER, octokit, 'main');
const strategy = new RepoDetailsCheckStrategy(repoName, OWNER, octokit, 'main')
const response1 = await strategy.makeOctokitCall();
const response = await strategy.formatResponse()

// const response = await RepoDetailsCheckStrategy.makeOctokitCall(OWNER, repo, octokit);
// console.log(response1)
// console.log('')
// console.log(response)

const dependabot = new AutomatedSecurityFixesStrategy(repoName, OWNER, octokit, 'main') 
const response3 =  await dependabot.formatResponse()
console.log(response3)

const all_languages = new ProgrammingLanguagesStrategy(repoName, OWNER, octokit, 'main') 
const response4 =  await all_languages.formatResponse()
console.log(response4)
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