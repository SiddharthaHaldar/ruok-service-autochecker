# Graph Updater


## ArangoDB Graph Example

![Arango graph example](docs/img/arango-graph-example.png)

## GraphQL Query Examples

**Query**

```graphql
query {
  endpoint(url: "https://github.com/someorg/somerepo")
}
```

**Mutation**

```graphql
mutation {
  endpoints(urls: [
    "https://github.com/someorg/somerepo1",
    "https://my-site.phac.gc.ca"
  ])
}
```