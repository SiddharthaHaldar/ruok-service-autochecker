# Graph Updater


## ArangoDB Graph Example

![Arango graph example](docs/img/arango-graph-example.png)

## GraphQL Query Examples

**Query**

```graphql
query {
  endpoint(url: "https://github.com/someorg/somerepo1")
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

```graphql
mutation {
  endpoints(urls: [
    "https://github.com/someorg/somerepo2",
    "https://another-site.phac.gc.ca",
    "https://some-other-api.phac-aspc.gc.ca"
  ])
}
```

```graphql
mutation {
  product(
    name: "myproduct"
    urls: [
      "https://github.com/someorg/somerepo2",
      "https://some-other-api.phac-aspc.gc.ca",
      "https://some-third-webapp.phac.alpha.gc.ca"
    ]  
  )
}
```