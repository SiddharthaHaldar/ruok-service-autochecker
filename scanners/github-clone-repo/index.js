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
  console.log('YAY PUBLISHED')
}

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
    for await (const message of sub) {
        console.log('\n**************************************************************')
        console.log(`Recieved from ... ${message.subject} \n`)
        
        const webhookPayload  = await jc.decode(message.data)
        console.log(webhookPayload )

        const { sourceCodeRepository, eventType} = webhookPayload 
        const { repoName, cloneUrl } = await extractUrlParts(sourceCodeRepository)
     
        // const serviceName = message.subject.split(".").reverse()[0]
        
        await cloneRepository(cloneUrl, repoName)

        // console.log('NATS_PUB_STREAM: ', NATS_PUB_STREAM)
        // console.log('service', serviceName)

        // await publish(`${NATS_PUB_STREAM}.${serviceName}`, {'repoName':repoName}) 
        await publish(`${NATS_PUB_STREAM}.${repoName}`, webhookPayload) //This service clones the repo - passing on webhook info
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${repoName}: `, webhookPayload)
    }
})();

await nc.closed();
