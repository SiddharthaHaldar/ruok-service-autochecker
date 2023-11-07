// github-octokit-repo-details/index.js

import { connect, JSONCodec } from 'nats'
import { Octokit } from "octokit"
import { AllChecksStrategy } from './src/all-checks.js';

import 'dotenv-safe/config.js'

const {
  NATS_URL,
  GITHUB_TOKEN,
  NATS_SUB_STREAM,
} = process.env;

// Also note - this will be appended with repo name when published. 
// Authenicate with GitHub 
const octokit = new Octokit({ auth: GITHUB_TOKEN, });

// NATs connection 
const nc = await connect({ servers: NATS_URL, })
const jc = JSONCodec();

const sub = nc.subscribe(NATS_SUB_STREAM)
console.log('🚀 Connected to NATS server - listening on ...', sub.subject, "channel...");

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
  ; (async () => {

    for await (const message of sub) {
      const gitHubEventPayload = await jc.decode(message.data)

      console.log('\n**************************************************************')
      console.log(`Recieved from ... ${message.subject}:\n ${JSON.stringify(gitHubEventPayload)}`)
      // GitHub urls always follow `github.com/orgName/repoName`, so from this
      // structure we can construct the org name and repo name.
      const prefix = (new URL(gitHubEventPayload.endpoint)).pathname.split("/")
      const orgName = prefix[1];
      const repoName = prefix[2];

      const checkName = 'allChecks' // have this passed in in future - default to all-checks
      const branchName = 'main' // TODO - come back for this after initial pass - when picked up by repodetails
      const check = new AllChecksStrategy(repoName, orgName, octokit, branchName);

      const payload = await check.formatResponse(check);
      let tmp = 1;
    }
  })();

await nc.closed();
