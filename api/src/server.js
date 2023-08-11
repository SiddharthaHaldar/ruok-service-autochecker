import { createYoga } from "graphql-yoga";
import { createServer } from "http";

export function Server({
    schema,
    context = {},
  }) {
    const yoga = createYoga({ 
      schema, 
      context, 
      cors: { origin: "*"},
    //   plugins: [
    //     maxAliasesPlugin({n: 4}), // default 15
    //     maxDepthPlugin({n: 6}), // Number of depth allowed | Default: 6
    //   ],
      graphqlEndpoint: '/graphql', 
    })
  
    return createServer(yoga)
  }