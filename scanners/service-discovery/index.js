// service-discovery/index.js

// ** set up to run on a periodic timeframe 

// clone dns repo, 
// extract annotations
// upsert into database / initate scans 

// (from there it will be scanned and added (upserteed into db) and simutaniously services 
// Something to consider is tracking those repos/ services not captured in dns repo

// TODO - use env file

// import { tempGetProjects } from "./src/get-projects.js"
import { cloneDnsRepository, removeClonedDnsRepository} from "./src/clone-dns-repo.js"
import { insertIntoDatabase } from "./src/database-functions.js";
import { consolidateProjectAnnotations, extractAnnotationsFromDnsRecords } from "./src/extract-project-metadata-from-dns-repo.js";
import { connect, JSONCodec, jwtAuthenticator } from 'nats'
import { Database, aql } from "arangojs";

import dotenv from 'dotenv'
// import 'dotenv-safe/config.js'
dotenv.config()

const { 
  owner = 'PHACDataHub',
  token,
  PORT = 3000,
  HOST = '0.0.0.0',
  DB_NAME = "dataServices",
  // DB_URL = "http://database:8529",
  DB_URL = "http://0.0.0.0:8529",
  DB_USER = "root",
  DB_PASS = 'yourpassword',
//   NATS_URL = "nats://nats:4222"
  NATS_URL = "nats://0.0.0.0:4222"
} = process.env;

// Database connection 
const db = new Database({
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
});

// NATs connection 
const nc = await connect({ 
  servers: NATS_URL,
  // authenticator: jwtAuthenticator(jwt), 
})
const jc = JSONCodec(); // for encoding NAT's messages
console.log('🚀 Connected to NATS jetstream server...');

async function publish(subject, payload) {
  nc.publish(subject, jc.encode(payload)) 
}

// const projects = tempGetProjects();
// This is a temporary work around - get the project list from service-discovery/known-service-list.json
// TODO - pull list from from DB, or nats (from DNS repo)

async function getProjects() {
    await cloneDnsRepository() 
    const dnsRecordsAnnotations = await extractAnnotationsFromDnsRecords();
    const projects = await consolidateProjectAnnotations(dnsRecordsAnnotations);
    // TODO get projects from known-services list, compare as well... concat in
    await removeClonedDnsRepository()
    return(projects)
  };

async function processProjects(projects) {
    for (const project of projects){
        // TODO - check if exisits first! 
        // TODO Determine what to do with ones in db, but not in this scan
        const projectKey = await insertIntoDatabase(project, "projects", db) //TODO modify so upsert instead and return key
        let key = 235 // temp work around 
        //if not null
        // await publish(`projects.${key}`, project)
        
        console.log("🚀 Sending to scanners...")
        console.log(project)
    }  
} 

const timeout = setTimeout(() => {
    process.exit(0);
}, 3000);

// TODO have this running for one message - or cloud function/ cron job once a day?
// TODO fix the hanging issue - not able to close (even when running just as function)
process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))

;(async () => {
    const projects = await getProjects().catch(error => {
      console.error('An error occurred getting projects:', error);
      process.exit(1); 
    });
  
    await processProjects(projects);
  
    console.log("Published payload!");
    // timeout
    // process.exit(0)
  })();

await nc.closed();
