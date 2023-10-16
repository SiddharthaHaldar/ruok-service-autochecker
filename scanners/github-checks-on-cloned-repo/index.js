// github-has-dependabot-yaml-check/index.js

import { connect, JSONCodec} from 'nats'
import { hasDependabotYaml } from './src/has-dependabot-yaml.js'
import { hasSecurityMd } from './src/has-security-md.js'
import { searchTests, formTestsDirectoryPayload } from './src/has-tests-directory.js'
import { searchIgnoreFile } from './src/get-dotignore-details.js'
import { hasApiDirectory } from './src/has-api-directory.js'
// import { DotGitIgnoreDetails, DotDockerIgnoreDetails, HasSecurityMd, HasDependabotYaml, HasTestsDirectory, HasApiDirectory, AllChecks } from './src';


import 'dotenv-safe/config.js'

const { NATS_URL } = process.env;

const NATS_SUB_STREAM = "gitHub.cloned.>"
const NATS_PUB_STREAM = "gitHub.checked" 

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

// const dotIgnoreChecker = new DotGitIgnoreDetails()
// const hasApiDirectoryChecker = new HasApiDirectory()
// const dotDockerIgnoreChecker = new DotDockerIgnoreDetails()
// const dotGitIgnoreChecker = new DotGitIgnoreDetails() 
// const hasSecurityMdChecker = new HasSecurityMd()
// const hasDependabotYamlChecker = new HasDependabotYaml()
// const hasTestsDirectoryChecker = new HasTestsDirectory()
// const allChecksChecker = new AllChecks()

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
    for await (const message of sub) {
        console.log('\n**************************************************************')
        console.log(`Recieved from ... ${message.subject} \n`)
        
        const payloadFromCloneRepo  = await jc.decode(message.data)
        // console.log(payloadFromCloneRepo)
        // const serviceName = message.subject.split(".").reverse()[0]
        // const { repoName } = payloadFromCloneRepo
        const repoName = message.subject.split(".").reverse()[0]
        const clonedRepoPath = `../../temp-cloned-repo/${repoName}` // TODO - there's got to be a cleaner way to do this and still be able to test
        let checkName


        // try {
        //     const results = await allChecksChecker.doAllChecks(clonedRepoPath);
        //     console.log('All Checks Results:', results);
        //   } catch (error) {
        //     console.error('Error during checks:', error);
        //   }

    //has dependabot yaml 
        checkName = 'hasDependabotYaml'
        const dependabotYamlFound = await hasDependabotYaml(clonedRepoPath)

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {'hasDependabotYaml': dependabotYamlFound}) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName} {'hasDependabotYaml': ${dependabotYamlFound}}`, )

    // security md
        checkName = 'hasSecurityMd'
        const securityMdFound = await hasSecurityMd(clonedRepoPath)

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {checkName: securityMdFound}) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName} {${checkName}: ${securityMdFound}}`, )

    // has tests directories
        checkName = 'hasTestsDirectory'
        const testDirectories = await searchTests(clonedRepoPath)
        const formatedTestDirectory = await formTestsDirectoryPayload(testDirectories)
        // console.log(JSON.stringify(testsDirectoryDetails))

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, formatedTestDirectory) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName}: `, formatedTestDirectory)
  
    //has api directory
        checkName = 'hasApiDirectory'
        const hasApiDir = await hasApiDirectory(clonedRepoPath);

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {'hasApiDirectory': hasApiDir} ) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName}: `, {'hasApiDirectory': hasApiDir} )

    // gitignoreDetails
        checkName = 'gitignore'
        const gitignoreDetails = await searchIgnoreFile(clonedRepoPath, ".gitignore");

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {'gitignoreDetails': gitignoreDetails}) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName}: `, {'gitignoreDetails': gitignoreDetails})
        
    // dockerignoreDetails
        checkName = 'dockerignore'
        const dockerignoreDetails = await searchIgnoreFile(clonedRepoPath, ".dockerignore");

        await publish(`${NATS_PUB_STREAM}.${checkName}.${repoName}`, {'dockerignoreDetails':dockerignoreDetails}) 
        console.log(`Sent to ... ${NATS_PUB_STREAM}.${checkName}.${repoName}: `, {'dockerignoreDetails':dockerignoreDetails})
        
    }
})();

await nc.closed();