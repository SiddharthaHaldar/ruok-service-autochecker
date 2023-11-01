# Logic to initialize arangodb
# TODO: move this to an init container in the future


from arango import ArangoClient

client = ArangoClient()

db = client.db("ruok", username="root", password="")


if db.has_graph("endpoints"):
    graph = db.graph("endpoints")
else:
    graph = db.create_graph("endpoints")

if graph.has_vertex_collection("endpointNodes"):
    nodes = graph.vertex_collection("endpointNodes")
else:
    nodes = graph.create_vertex_collection("endpointNodes")

if graph.has_edge_collection("endpointEdges"):
    nodes = graph.vertex_collection("endpointEdges")
else:
    nodes = graph.create_edge_definition(
        edge_collection="endpointEdges",
        from_vertex_collections=["endpointNodes"],
        to_vertex_collections=["endpointNodes"],
    )
