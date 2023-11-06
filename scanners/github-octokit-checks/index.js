// github-octokit-repo-details/index.js

import { connect, JSONCodec } from 'nats'
import { Octokit } from "octokit"
import { AllChecksStrategy } from './src/all-checks.js';

import { Database, aql } from "arangojs";

import 'dotenv-safe/config.js'

const {
  NATS_URL,
  GITHUB_TOKEN,
  DB_NAME,
  DB_URL,
  DB_USER,
  DB_PASS,
} = process.env;

// Connect to ArangoDB
const dbConfig = {
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
  createCollection: true,
};

const db = new Database(dbConfig);

const OWNER = 'PHACDataHub'

const NATS_SUB_STREAM = "EventsScanner" // Note - for checks that need branch, the substream will be different (right now blanketing with 'main')
const NATS_PUB_STREAM = "gitHub.saveToDatabase.octokit" // Note - for checks that need branch - the pubstream will be different 
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

      const { sourceCodeRepository } = gitHubEventPayload
      const repoName = sourceCodeRepository.split('/').pop()

      const checkName = 'allChecks' // have this passed in in future - default to all-checks
      // const checkName = 'allLanguages' 
      // const checkName = 'getRepoDetails' 
      const branchName = 'main' // TODO - come back for this after initial pass - when picked up by repodetails
      const check = new AllChecksStrategy(repoName, OWNER, octokit, branchName);

      const payload = await check.formatResponse(check)
      const subject = `${NATS_PUB_STREAM}.${checkName}.${repoName}`

      const upsertQuery = aql`
        INSERT {
          _key: ${repoName},
          githubOctokitChecks: ${payload}
        }
        IN dataServices
        OPTIONS { overwriteMode: "update"}
      `
      const results = await db.query(upsertQuery)
    }
  })();

await nc.closed();
