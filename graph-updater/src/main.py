from typing import List

from arango import ArangoClient

import strawberry

import uvicorn

from fastapi import FastAPI, Depends

from pydantic import HttpUrl

from strawberry.types import Info
from strawberry.fastapi import GraphQLRouter


class GraphDB:
    def __init__(self):
        self.client = ArangoClient()
        # TODO: remove hard-coded test values
        self.db = self.client.db("ruok", username="root", password="")
        self.graph = self.db.graph("endpointGraph")
        self.nodes = self.graph.vertex_collection("endpointNodes")
        self.edges = self.graph.edge_collection("endpointEdges")

    def __del__(self):
        self.client.close()

    def close(self) -> bool:
        self.client.close()
        return True

    def _key_safe_url(self, url: str) -> str:
        return url.replace("://", "-").replace("/", "-")

    def insert_endpoint(self, url):
        if not self.nodes.get(self._key_safe_url(url)):
            self.nodes.insert({"url": url, "_key": self._key_safe_url(url)})
        return url

    def insert_edge(self, endpoint1, endpoint2):
        edge_key = f"{self._key_safe_url(endpoint1)}-to-{self._key_safe_url(endpoint2)}"
        if not self.edges.get(edge_key):
            self.edges.insert(
                {
                    "_key": edge_key,
                    "_from": f"endpointNodes/{self._key_safe_url(endpoint1)}",
                    "_to": f"endpointNodes/{self._key_safe_url(endpoint2)}",
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

    def get_endpoint(self, url):
        return self.nodes.get(self._key_safe_url(url))["url"]


@strawberry.type
class Query:
    @strawberry.field
    def endpoint(self, url: str) -> str:
        client = GraphDB()
        endpoint = client.get_endpoint(url)
        client.close()
        # TODO: how to marshal endpoint into a type with strawberry?
        return endpoint

    @strawberry.field
    def product(self, name: str) -> str:
        # TODO: implement product
        return name


@strawberry.type
class Mutation:
    @strawberry.mutation
    def endpoint(self, url: str) -> str:
        client = GraphDB()
        client.insert_endpoint(url)
        client.close()
        return url

    @strawberry.mutation
    def endpoints(self, urls: List[str]) -> List[str]:
        client = GraphDB()
        client.insert_endpoints(urls)
        client.close()
        return urls


schema = strawberry.Schema(Query, Mutation)


graphql_app = GraphQLRouter(schema)


app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
