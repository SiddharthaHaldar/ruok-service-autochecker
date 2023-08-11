import { schema } from "./src/schema.js";
import { Server } from "./src/server.js";
import { Database, aql } from "arangojs";
import 'dotenv-safe/config.js'
import { connect, JSONCodec, jwtAuthenticator } from 'nats'

const { 
    PORT = 4000,
    HOST = '0.0.0.0',
    DB_NAME="dataServices",
    DB_URL="http://localhost:8529",
    DB_USER="root",
    DB_PASS='yourpassword',
    // NATS_URL = "demo.nats.io:4222", 
  } = process.env;
// const { DB_URL, DB_NAME, DB_USER, DB_PASS, PORT } = process.env;

const dbConfig = {
    url: "http://localhost:8529", 
    database: "dataServices", 
    auth: { username: "root", password: "yourpassword" },
    createCollection: true, 
  };
  
const db = new Database(dbConfig);
  
const query = async function query(strings, ...vars) {
    return db.query(aql(strings, ...vars), {
    count: true,
    })
}
    
// const transaction = async function transaction(collections) {
// return db.beginTransaction(collections)
// }

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
;(async ( ) => {
 
  const server = new Server({
    schema,
    context: { query, db },
  })
  server.listen({ port: PORT, host: HOST }, () =>
  console.log(`🚀 API is running on http://${HOST}:${PORT}/graphql`),
  )
})()
