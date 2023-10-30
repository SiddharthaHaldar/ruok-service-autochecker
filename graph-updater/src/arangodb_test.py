from arango import ArangoClient

client = ArangoClient()

db = client.db("ruok", username="root", password="")

endpoints = db.graph("endpointGraph")

endpoint_nodes = endpoints.vertex_collection("endpointNodes")

endpoint_edges = endpoints.edge_collection("endpointEdges")

if not endpoint_nodes.get("https-github.com-someorg-somerepo"):
    endpoint_nodes.insert(
        {
            "url": "https://github.com/someorg/somerepo",
            "_key": "https-github.com-someorg-somerepo",
        }
    )
if not endpoint_nodes.get("https-someproject.phac.gc.ca"):
    endpoint_nodes.insert(
        {
            "url": "https://someproject.phac.gc.ca",
            "_key": "https-someproject.phac.gc.ca",
        }
    )
if not endpoint_edges.get(
    "https-github.com-someorg-somerepo-to-https-someproject.phac.gc.ca"
):
    endpoint_edges.insert(
        {
            "_key": "https-github.com-someorg-somerepo-to-https-someproject.phac.gc.ca",
            "_from": "endpointNodes/https-github.com-someorg-somerepo",
            "_to": "endpointNodes/https-someproject.phac.gc.ca",
        }
    )
# Insert bidirectional edge
if not endpoint_edges.get(
    "https-someproject.phac.gc.ca-to-https-github.com-someorg-somerepo"
):
    endpoint_edges.insert(
        {
            "_key": "https-someproject.phac.gc.ca-to-https-github.com-someorg-somerepo",
            "_from": "endpointNodes/https-someproject.phac.gc.ca",
            "_to": "endpointNodes/https-github.com-someorg-somerepo",
        }
    )

# Get all connected vertices by bfs traversal starting at *any* vertex
query_1_results = endpoints.traverse(
    start_vertex="endpointNodes/https-github.com-someorg-somerepo",
    direction="outbound",
    strategy="bfs",
    vertex_uniqueness="global",
    edge_uniqueness="global",
)

query_2_results = endpoints.traverse(
    start_vertex="endpointNodes/https-someproject.phac.gc.ca",
    direction="outbound",
    strategy="bfs",
    vertex_uniqueness="global",
    edge_uniqueness="global",
)
tmp = 1
