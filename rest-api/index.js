import express from 'express'
import { Database, aql } from "arangojs";

// Load .env file
import 'dotenv/config'

// Get config variables from environment
const {
  REST_API_PORT_NUMBER,
  DB_NAME,
  DB_URL,
  DB_USER,
  DB_PASS,
} = process.env

// Create express app
const app = express()

// Connect to ArangoDB
const dbConfig = {
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
  createCollection: true,
};

const db = new Database(dbConfig);

app.get('/:projectName', async (req, res) => {
  const cursor = await db.query(aql`
    FOR doc IN dataServices
    FILTER doc._key == ${req.params.projectName}
    RETURN doc
  `)
  const project = await cursor.next();
  res.end(JSON.stringify(project));
})

app.listen(REST_API_PORT_NUMBER, () => {
  console.log(`REST API server listening on port ${REST_API_PORT_NUMBER}`)
})