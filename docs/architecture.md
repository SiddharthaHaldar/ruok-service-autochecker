# RUOK Architecture

The core architecture uses an event-driven workflow based on [GitHub Webhooks](github-webhooks.md) for repository events. Note that nothing about this architecture relies on event updates coming exclusively from webhooks, although this provides a convenient way to receive push notifications for the time being.

![Architecture Diagram](./diagrams/architecture.svg)

A webhook server listens for various webhook events. Two primary sources of events are considered, although the event sources are highly extensible.

1. **Github repository events**: any GitHub repository that creates webhooks registered with the webhook server URL will automatically send event notifications when selected repository events occur. Repositories can optionally include a `.product.yaml` file with links that can be used to make associations between the GitHub repository and other endpoint nodes on the graph.
2. **DNS repository events**: all DNS A-records for projects in [PHACDataHub](https://github.com/PHACDataHub) are provisioned using the [dns](https://github.com/PHACDataHub/dns) repository. Annotation metadata from these [Config Connector](https://cloud.google.com/config-connector/docs/overview) manifests can be parsed to make associations between the DNS A-record URL and other endpoints such as the associated Github repository.

Depending on the type of endpoint being updated, the webhook server adds an event to the appropriate queue group in NATS (e.g. `RepoEventsUpdate`, `WebEventsUpdate`, etc.).

Graph Updater components subscribe to `*EventUpdate` queue groups. Each kind of graph updater component performs a few tasks.

1. If a metadata file (e.g.`.product.yaml`) is present, parse the metadata file and construct the graph that associates the current endpoint with the endpoints it's related to. Note that if there is no metadata file, the graph is trivially a single node containing the current endpoint.
2. Traverse the graph from (1) and query the GraphQL API for each node on the graph to see if *any* entrypoint to the graph already exists in the database.
3. Merge the graphs from (1) and (2), where nodes from (1) take precedence over nodes from (2).
4. Write each node from the merged graph in (3) to the database using the appropriate mutation queries in the GraphQL API.
5. Traverse the graph from (3) and add endpoint nodes to the appropraite scanner queue groups.

Each kind of Endpoint Scanner subscribes to the appropriate queue groups, listening for endpoint nodes added by the appropriate Graph Updater component.

Each Endpoint Scanner performs a series of type-specific endpoint scans, largely reusing open source scanning tools such as [Trivy](https://github.com/aquasecurity/trivy), [gitleaks](https://github.com/gitleaks/gitleaks), and [axe-core](https://github.com/dequelabs/axe-core) (accessibility engine).

Endpoint Scanners write the updated endpoint nodes back to the GraphQL API via the appropriate mutation query.

Consumers of the GraphQL API (such as the web application) are able to read data about product subgraphs, using any valid entrypoint into the subgraph. A special kind of `Product` label can be added with pointers to one or more endpoints in a subgraph, which allows clients such as the web application to attach a meaningful label to a subgraph of connected endpoints.

Importantly, note that Graph Updater components are aware of graph structure, but have no knowledge of node attributes added by Endpoint Scanner. Conversely, Endpoint Scanners are aware of attributes for the type of endpoint node they scan, but have no knowledge of the graph structure maintained by the Graph Updater components. In this way, there is a clean separation of concerns between the Graph Updater components and the Endpoint Scanner components.