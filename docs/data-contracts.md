# Data Contracts

This document highlights the data contracts that implicitly exist between various services.


## Event Collectors and Graph Updater

Currently, the event collectors write a message to the `EventsUpdate` NATS queue with the following payload schema.

```jsonc
{
  "endpoint": "https://<some-url>"
}
```

The only job of the event collectors is to determine which events are valid and relevant (i.e. corresponding to meaningful updates to an endpoint), and pass the endpoint URL along to the Graph Updater component.

## Graph Updater and GraphQL API

Each kind of endpoint has zero or more ways to attach metadata about related endpoints (e.g. GitHub repository endpoints can have a `.product.yaml` file in the project root containing URLs related to that GitHub repository).

After parsing this optional metadata, the Graph Updater component has one or more endpoint URLs, which form a graph 

Currently, the Graph Updater makes the following mutation to the GraphQL API:

```graphql
mutation {
  endpoints(urls: $URLs) {
    url
  }
}
```

## Graph Updater and Scanners



## Scanners and GraphQL API

