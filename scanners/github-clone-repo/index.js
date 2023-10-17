// github-clone-repo/index.js

import { connect, JSONCodec} from 'nats'
import { cloneRepository, extractUrlParts} from "./src/clone-repo-functions.js"
import 'dotenv-safe/config.js'

const { NATS_URL } = process.env

// const NATS_SUB_STREAM = "gitHub.initiate.>"
const NATS_SUB_STREAM="GitHubEvent"
const NATS_PUB_STREAM = 'gitHub.cloned' 

// NATs connection 
const nc = await connect({ servers: NATS_URL,})
const jc = JSONCodec(); // for encoding NAT's messages

const sub = nc.subscribe(NATS_SUB_STREAM)
console.log('🚀 Connected to NATS server - listening on ...', sub.subject, "channel...");

async function publish(subject, payload) {
  nc.publish(subject, jc.encode(payload)) 
  console.log(`Sent to ... ${subject}: `, payload)
}

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
    for await (const message of sub) {
        const webhookPayload  = await jc.decode(message.data)

        console.log('\n**************************************************************')
        console.log(`Recieved from ... ${message.subject}: \n ${JSON.stringify(webhookPayload)}`)

        const { sourceCodeRepository, eventType} = webhookPayload 
        const { repoName, cloneUrl } = await extractUrlParts(sourceCodeRepository)
        
        await cloneRepository(cloneUrl, repoName)

        await publish(`${NATS_PUB_STREAM}.${repoName}`, webhookPayload) //This service clones the repo - passing on webhook info
    }
})();

await nc.closed();
