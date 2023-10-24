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
      graphqlEndpoint: '/graphql', 
    })
  
    return createServer(yoga)
  }