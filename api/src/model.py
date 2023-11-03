from arango import ArangoClient

from constants import Settings


class GraphDB:
    def __init__(self):
        # Add Arangodb host + port
        self.client = ArangoClient(hosts=Settings().DB_HOST)
        self.db = self.client.db(
            Settings().DB_NAME,
            username=Settings().USERNAME,
            password=Settings().PASSWORD,
        )
        self.graph = self.db.graph(Settings().GRAPH_NAME)
        self.nodes = self.graph.vertex_collection(Settings().VERTEX_COLLECTION)
        self.edges = self.graph.edge_collection(Settings().EDGE_COLLECTION)

    def __del__(self):
        self.client.close()

    def close(self) -> bool:
        self.client.close()
        return True

    def _key_safe_url(self, url: str) -> str:
        return url.replace("://", "-").replace("/", "-")

    def insert_endpoint(self, url):
        if url == '':
            return url
        if not self.nodes.get(self._key_safe_url(url)):
            self.nodes.insert({"url": url, "_key": self._key_safe_url(url)})
        return url

    def insert_edge(self, endpoint1, endpoint2):
        edge_key = f"{self._key_safe_url(endpoint1)}-to-{self._key_safe_url(endpoint2)}"
        if not self.edges.get(edge_key):
            self.edges.insert(
                {
                    "_key": edge_key,
                    "_from": f"{Settings().VERTEX_COLLECTION}/{self._key_safe_url(endpoint1)}",
                    "_to": f"{Settings().VERTEX_COLLECTION}/{self._key_safe_url(endpoint2)}",
                }
            )

    def insert_endpoints(self, urls):
        if len(urls) == 0:
            return
        if len(urls) == 1:
            self.insert_endpoint(urls[0])
            return
        # Split the list into the first url and remaining urls
        root_url = urls[0]
        other_urls = urls[1:]
        # Insert the root url
        self.insert_endpoint(root_url)
        # For all other urls, make a bidirectional edge between the root url and themselves.
        for url in other_urls:
            self.insert_endpoint(url)
            self.insert_edge(root_url, url)
            self.insert_edge(url, root_url)
        return urls

    def insert_product(self, product, urls):
        if not self.nodes.get(product):
            self.nodes.insert({"_key": product})
        for url in urls:
            self.insert_endpoint(url)
            self.insert_edge(product, url)
            self.insert_edge(url, product)

    def get_endpoint(self, url):
        if not self.nodes.get(self._key_safe_url(url)):
            return {
                "vertices": [],
                "paths": [],
            }
        return self.graph.traverse(
            start_vertex=f"{Settings().VERTEX_COLLECTION}/{self._key_safe_url(url)}",
            direction="outbound",
            strategy="bfs",
            vertex_uniqueness="global",
            edge_uniqueness="global",
        )

    def get_endpoints(self, urls):
        unique_urls = set()
        for url in urls:
            if url == '':
                continue
            url_vertices = self.get_endpoint(url)["vertices"]
            if url_vertices:
                unique_urls = unique_urls.union(
                    [v["url"] if "url" in v.keys() else v["_key"] for v in url_vertices]
                )
        return list(unique_urls)
