# GraphQL API

Due to the graph nature of the underlying data, Observatory exposes a GraphQL API that is oriented around the concept of `Endpoint`s. The following two sections explain the motivation behind our endpoint-oriented data model and the actual GraphQL Schema that the GraphQL API exposes.

## Motivation (Why Endpoints?)

Ultimately, Observatory cares about monitoring **products**. Modern products tend to be associated with a variety of URLs, such as URLs for source code repositories (e.g. Github.com, Gitlab.com), URLs for container registries, URLs for APIs, URLs for web applications, and so on.

It can be difficult to provide a stable and authoritative definition of a product without imposing a rigid definition that must be imposed and agreed upon by humans. An approach such as agreeing to and adopting a standard way of defining a product UID may work for a small coordinated group of individuals, but is difficult to scale to large groups of distributed teams without imposing significant administrative burden.

Furthermore, it is often not realistic to assume that a product will always be associated with a single URL in a way that is stable over time. As a product evolves, it may rename its source code repository or move under a different organization; as a product graduates in its maturity model, it may be promoted from an `*.alpha.*` to a `*.prod.*` domain name.

In Observatory, the assumption we make is that products are a related graph of **Endpoints** that evolves over time (e.g. new endpoints are added and old endpoints are removed). The graph of endpoints has the property that viewing any of the endpoint nodes allows all of the endpoint nodes attached to it to be discovered.

Additionally, we add the ability to define `Product`s, which point to one or more `Endpoint`s, allowing for discovery of the subgraph of endpoints by querying a named `Product`. Or, conversely, given a URL of any endpoint on the graph, the associated `Product` node can be discovered.

Alternatively, if users wish to monitor individual URLs directly rather than create a product graph, this use case can be accommodated as well.
