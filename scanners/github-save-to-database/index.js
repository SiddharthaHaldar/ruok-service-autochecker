// github-save-to-database/index.js

import { upsertGitHubScanIntoDatabase, getGitHubRepositoryFromServicesCollection } from "./src/database-functions.js";
import { connect, JSONCodec} from 'nats'
import { Database } from "arangojs";
import { request, gql, GraphQLClient } from 'graphql-request'
import 'dotenv-safe/config.js'

const { 
  DB_NAME,
  DB_URL,
  DB_USER, 
  DB_PASS,
  NATS_URL,
  API_URL,
} = process.env;

const NATS_PUB_STREAM = "gitHub.saveToDatabase.>" 

// API connection 
const graphQLClient = new GraphQLClient(API_URL);

// Database connection 
const db = new Database({
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
});

// NATs connection 
const nc = await connect({ 
  servers: NATS_URL,
})
const jc = JSONCodec(); 
console.log('🚀 Connected to NATS server...');

async function publish( subject, payload) {
  nc.publish(subject, jc.encode(payload)) 
}

// await upsertGitHubScanIntoDatabase('epicenter', 'repoName', {'five': 5}, graphQLClient)

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async () => {
 
    for await (const message of sub) {
      const payload  = await jc.decode(message.data)
      console.log('\n**************************************************************')
      console.log(`Recieved from ... ${message.subject} \n${payload}`)
      
      const repoName = message.subject.split(".").reverse()[0]

        // // get gitHubRepository from services collection for that serviceName
        // const gitHubRepository = await getSourceCodeRepositoryByServiceName(serviceName, GraphQLClient)
        // const upsertService = await upsertGitHubScanIntoDatabase(serviceName, gitHubRepository, payloadFromDoneCollector, graphQLClient)
        // console.log(`Saved ${serviceName} scan results to database - services collection`)
    }
})();

await nc.closed();

