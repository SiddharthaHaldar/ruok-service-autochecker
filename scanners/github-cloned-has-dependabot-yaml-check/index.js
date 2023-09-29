// github-has-dependabot-yaml-check/index.js

import { connect, JSONCodec} from 'nats'
import { hasDependabotYaml } from './src/has-dependabot-yaml.js'
import 'dotenv-safe/config.js'

const { NATS_URL } = process.env;

const NATS_SUB_STREAM = "gitHub.cloned.>"
const NATS_PUB_STREAM = "gitHub.checked.hasDependabotYaml" 


// NATs connection 
const nc = await connect({ 
  servers: NATS_URL,
})
const jc = JSONCodec()

const sub = nc.subscribe(NATS_SUB_STREAM)
console.log('🚀 Connected to NATS server - listening on ...', sub.subject, "channel...");

async function publish(subject, payload) {
  nc.publish(subject, jc.encode(payload)) 
}

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
    for await (const message of sub) {
        console.log('\n**************************************************************')
        console.log(`Recieved from ... ${message.subject} \n`)
        
        const payloadFromCloneRepo  = await jc.decode(message.data)
        console.log(payloadFromCloneRepo)
        
        const serviceName = message.subject.split(".").reverse()[0]

        const { repoName } = payloadFromCloneRepo
        const clonedRepoPath = `../../temp-cloned-repo/${repoName}` // TODO - there's got to be a cleaner way to do this and still be able to test
        const dependabotYamlFound = await hasDependabotYaml(clonedRepoPath)
        
        console.log("hasDependabotYaml:", dependabotYamlFound)

        await publish(`${NATS_PUB_STREAM}.${serviceName}`, {"hasDependabotYaml": dependabotYamlFound}) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${serviceName} ` )
    }
})();

await nc.closed();
