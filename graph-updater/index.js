import { connect, JSONCodec } from 'nats'

import { getEndpoint } from './src/endpoint.js';

import 'dotenv-safe/config.js'

const {
  NATS_URL,
} = process.env;


const NATS_SUB_STREAM = "EventsUpdate" // Note - for checks that need branch, the substream will be different (right now blanketing with 'main')
const NATS_PUB_STREAM = "EventScanner" // Note - for checks that need branch - the pubstream will be different 

// NATs connection 
const nc = await connect({ servers: NATS_URL, })
const jc = JSONCodec();

const sub = nc.subscribe(NATS_SUB_STREAM)
console.log('🚀 Connected to NATS server - listening on ...', sub.subject, "channel...");

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
  ; (async () => {

    for await (const message of sub) {
      const endpointEventPayload = await jc.decode(message.data)

      console.log('\n**************************************************************')
      console.log(`Recieved from ... ${message.subject}:\n ${JSON.stringify(endpointEventPayload)}`)

      const { endpoint, endpointKind } = endpointEventPayload
      // Based on the kind of endpoint being processed, get the appropriate handler
      const endpointHandler = getEndpoint(endpointKind)
      // Every endpoint handler knows how to get its own graph metadata
      // from its endpoint.
      endpointHandler.getGraphMetaData(endpointEventPayload)
      let tmp=1;
    }
  })();

await nc.closed();
