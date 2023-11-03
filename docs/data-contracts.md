# Data Contracts

This document highlights the data contracts that implicitly exist between various services.


## Event Collectors and Graph Updater

Currently, the event collectors write a message to the NATS queue with the following payload schema:

> TODO: these fields are GitHub specific, but we might need to accommoate extra fields/nullable fields if we're collecting events outside of GitHub in the future.

```jsonc
{
  "endpoint": "https://<some-url>"
}
```

## Graph Updater and GraphQL API

Currently, the Graph Updater makes the following mutation to the GraphQL API:

```jsonc
mutation {
  product
}
```

## Graph Updater and Scanners



## Scanners and GraphQL API

