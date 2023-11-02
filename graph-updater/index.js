import { connect, JSONCodec } from 'nats'
import { Octokit } from "octokit"

import { endpoint } from './src/endpoint.js';

import 'dotenv-safe/config.js'

const {
    NATS_URL,
    GITHUB_TOKEN,
} = process.env;


const NATS_SUB_STREAM = "EventsUpdate" // Note - for checks that need branch, the substream will be different (right now blanketing with 'main')
const NATS_PUB_STREAM = "EventScanner" // Note - for checks that need branch - the pubstream will be different 
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
            const repoKind = endpointKind()
            const subject = `${NATS_PUB_STREAM}.${checkName}.${repoName}`


            const results = await db.query(upsertQuery)
        }
    })();

await nc.closed();
