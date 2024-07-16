from typing import Union

from arango import ArangoClient

import strawberry

from constants import Settings

from graphql_types.input_types import GithubEndpointInput, WebEndpointInput, FilterCriteriaInput


class GraphDB:
    def __init__(self):
        # Add Arangodb host + port
        self.client = ArangoClient(hosts=Settings().DB_HOST)
        self.db = self.client.db(
            Settings().DB_NAME,
            username=Settings().USERNAME,
            password=Settings().PASSWORD,
        )
        self.aql = self.db.aql
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

    def insert_endpoint(self, endpoint):
        endpoint_dict = strawberry.asdict(endpoint)
        url = endpoint_dict["url"]
        kind = endpoint_dict["kind"]
        if url == "":
            return url
        if not self.nodes.get(self._key_safe_url(url)):
            self.nodes.insert({"url": url, "kind": kind, "_key": self._key_safe_url(url)})
        return url

    def upsert_scanner_endpoint(
        self, scanner_endpoint: Union[GithubEndpointInput, WebEndpointInput]
    ):
        # We only want to update non-null keys in the scanner endpoint.
        non_null_endpoints = {
            k: v
            for k, v in strawberry.asdict(scanner_endpoint).items()
            if v is not None
        }
        update_dict = {
            **non_null_endpoints,
            "_key": self._key_safe_url(scanner_endpoint.url),
        }
        if not self.nodes.get(self._key_safe_url(scanner_endpoint.url)):
            self.nodes.insert(update_dict)
        else:
            self.nodes.update(update_dict)
        return scanner_endpoint

    def insert_edge(self, endpoint1, endpoint2):
        endpoint1_dict = strawberry.asdict(endpoint1)
        endpoint2_dict = strawberry.asdict(endpoint2)
        endpoint1 = endpoint1_dict["url"]
        endpoint2 = endpoint2_dict["url"]
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

    def get_scanner_endpoint(self, url):
        return self.nodes.get(self._key_safe_url(url))

    def filter_endpoints(self, criteria : FilterCriteriaInput):
        criteriaDict = strawberry.asdict(criteria)
        criteriaDict = {k: v for k, v in criteriaDict.items() if v is not None}
        print(criteriaDict)
        nodes = self.nodes.find(criteriaDict, skip=0)
        return nodes
    
    def get_scanner_endpoints(self, kind, limit):
        cursor = self.nodes.find({"kind": kind}, skip=0, limit=limit)
        return [document for document in cursor]

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
            if url == "":
                continue
            url_vertices = self.get_endpoint(url)["vertices"]
            if url_vertices:
                unique_urls = unique_urls.union(
                    [v["url"] if "url" in v.keys() else v["_key"] for v in url_vertices]
                )
        return list(unique_urls)

    def get_all_edges(self):
        return [edge for edge in self.edges.all()]

    def get_all_endpoints(self):
        # return [node['_key'] for node in self.nodes.all()]
        return [node for node in self.nodes.all()]