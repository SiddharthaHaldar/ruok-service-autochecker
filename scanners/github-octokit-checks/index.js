// github-octokit-repo-details/index.js

import { connect, JSONCodec} from 'nats'
import { Octokit, App,  RequestError } from "octokit";
import { RepoDetailsCheckStrategy } from './src/get-repo-details.js';
import { RepoChecker } from './src/octokit-check-context.js';
// import { RepoDetailsCheckStrategy } 
import 'dotenv-safe/config.js'

const { NATS_URL, GITHUB_TOKEN } = process.env;

const OWNER = 'PHACDataHub'

const NATS_SUB_STREAM = "GitHubEvent"
const NATS_PUB_STREAM = "gitHub.octokit.repoDetails" 

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


// async function getRepoDetails(owner, repo, octokit) {
//     try {
//         const response = await octokit.request('GET /repos/{owner}/{repo}', {
//         owner: owner,
//         repo: repo,
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//         });
//         return (response.data)
    
//     } catch (error) {
//         console.error("An error occurred while fetching repository details:", error.message);
//     }
//   }

const repoChecker = new RepoChecker();

// async function makeOctokitRequest(endpoint, options, octokit) {
//     try {
//       const response = await octokit.request(endpoint, options)
//       return response.data
//     } catch (error) {
//       console.error("An error occurred:", error.message)
//       throw error
//     }
//   }



//   programming_languages_all = await repoLanguages(owner, repo, octokit) 
process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
    for await (const message of sub) {
        const webhookPayload = await jc.decode(message.data)

        console.log('\n**************************************************************')
        console.log(`Recieved from ... ${message.subject}:\n ${JSON.stringify(webhookPayload)}`)
        
        const { sourceCodeRepository } = webhookPayload
        const repoName = sourceCodeRepository.split('/').pop();

        const repoCheck= new RepoDetailsCheckStrategy(repoName, OWNER, octokit )
        try {
            const response = await repoCheck.makeOctokitRequest();
            console.log('Repository Details:', response);
          } catch (error) {
            // Handle errors here
            console.error('Error:', error.message);
          }
        // const repoDetails = await getRepoDetails(OWNER, repoName, octokit)
        // repoDetails.sourceCodeRepository = sourceCodeRepository

        // await publish(`${NATS_PUB_STREAM}.${repoName}`, repoDetails) 
   
    }
})();

await nc.closed();
