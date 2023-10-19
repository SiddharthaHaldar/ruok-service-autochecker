// github-octokit-repo-details/index.js

import { connect, JSONCodec} from 'nats'
import { Octokit, App,  RequestError } from "octokit"
// import { RepoChecker } from './src/octokit-check-context.js';
import { GetRepoDetailsStrategy } from "./src/get-repo-details.js"
import { AutomatedSecurityFixesStrategy } from "./src/automated-security-fixes.js";
import { ProgrammingLanguagesStrategy } from "./src/all-langauges.js";
import { BranchProtectionStrategy } from "./src/branch-protection.js"
import { CodeContributorsStrategy } from "./src/code-contributors.js";
import { VunerabilityAlertsEnabledStrategy } from "./src/are-vunerability-alerts-enabled.js";
import { PullRequestProtectionStrategy } from "./src/pull-request-protection.js";
import { AllChecksStrategy } from './src/all-checks.js';
import 'dotenv-safe/config.js'

const { NATS_URL, GITHUB_TOKEN } = process.env;

const OWNER = 'PHACDataHub'

const NATS_SUB_STREAM = "GitHubEvent" // Note - for checks that need branch, the substream will be different (right now blanketing with 'main')
const NATS_PUB_STREAM = "gitHub.saveToDatabase.octokit" // Note - for checks that need branch - the pubstream will be different 
                                                        // Also note - this will be appended with repo name when published. 
// Authenicate with GitHub 
const octokit = new Octokit({ auth: GITHUB_TOKEN,});

// NATs connection 
const nc = await connect({ servers: NATS_URL,})
const jc = JSONCodec(); 

const sub = nc.subscribe(NATS_SUB_STREAM)
console.log('🚀 Connected to NATS server - listening on ...', sub.subject, "channel...");

async function publish(subject, payload) {
    nc.publish(subject, jc.encode(payload)) 
    console.log(`Sent to ... ${subject}: `, payload)
  }

// Initialize Checkers //TODO - move to src???
async function initializeChecker(checkName, repoName, OWNER, octokit, branchName='main') {
    switch (checkName) {
        case 'getRepoDetails':
            return new GetRepoDetailsStrategy(repoName, OWNER, octokit, branchName)
        case 'dependabot':
            return new AutomatedSecurityFixesStrategy(repoName, OWNER, octokit, branchName) 
        case 'allLanguages':
            return new ProgrammingLanguagesStrategy(repoName, OWNER, octokit, branchName)
        case 'codeContributers':
            return new CodeContributorsStrategy(repoName, OWNER, octokit, branchName)
        case 'vunerabilityAlertsEnabled':
            return new VunerabilityAlertsEnabledStrategy(repoName, OWNER, octokit, branchName)
        case 'pullRequestProtection':
            return new PullRequestProtectionStrategy(repoName, OWNER, octokit, branchName)
        case 'branchProtection':
            return new BranchProtectionStrategy(repoName, OWNER, octokit, branchName)
        case 'allChecks':
            return new AllChecksStrategy(repoName, OWNER, octokit, branchName)
        default:
            throw new Error(`Unknown checker: ${checkName}`)
    }
}

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
  for await (const message of sub) {
    const gitHubEventPayload = await jc.decode(message.data)

    console.log('\n**************************************************************')
    console.log(`Recieved from ... ${message.subject}:\n ${JSON.stringify(gitHubEventPayload)}`)
    
    const { sourceCodeRepository } = gitHubEventPayload
    const repoName = sourceCodeRepository.split('/').pop()

    const checkName = 'allChecks' // have this passed in in future - default to all-checks
    // const checkName = 'allLanguages' 
    // const checkName = 'getRepoDetails' 
    const branchName = 'main' // TODO - come back for this after initial pass - when picked up by repodetails
    const check = await initializeChecker(checkName, repoName, OWNER, octokit, branchName)

    const payload = await check.formatResponse(check) 
    const subject = `${NATS_PUB_STREAM}.${checkName}.${repoName}` 
  
  // TODO - include or append original payload here - or just the sourcecoderepository
    await publish(subject, payload) 
  }
})();

await nc.closed();
