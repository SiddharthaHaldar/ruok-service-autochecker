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

After parsing this optional metadata, the Graph Updater component has one or more endpoint URLs, which form a graph of related endpoints.

Currently, the Graph Updater makes the following mutation to the GraphQL API:

```graphql
mutation {
  endpoints(urls: $URLs) {
    url
  }
}
```

In this case, `$URLs` is an array of one or more endpoint URLs.

Once the mutation above has been written to the GraphQL API, Graph Updater makes the following GraphQL query:

```graphql
query {
  endpoints(urls: $URLs) {
    url
  }
}
```

The rationale here is that there may be existing vertices in the graph database that need to be re-scanned. For example, if the current URL was associated with `https://endpoint1` and `https://endpoint2`, and the graph of `https://endpoint2` and `https://endpoint3` already exists in the database, then we want to update each of `https://endpoint1`, `https://endpoint2`, and `https://endpoint3`.

At this point, each endpoint is dispatched to the appropriate `EndpointScanner` queue (e.g. `EndpointScanner.githubEndpoints`) with the following payload.

```jsonc
{
  "endpoint": "https://<some-url>"
}
```

## Graph Updater and Scanners

> TODO

## Scanners and GraphQL API

> TODO