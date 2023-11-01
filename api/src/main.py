from typing import List

from arango import ArangoClient

import strawberry

import uvicorn

from fastapi import FastAPI, Depends

from pydantic import HttpUrl

from strawberry.types import Info
from strawberry.fastapi import GraphQLRouter

DB_NAME = "ruok"
# TODO: replace test account creds with creds passed via env vars
USERNAME = "root"
PASSWORD = ""
# TODO: pass graph/vertex/edge collection names from config
GRAPH_NAME = "endpoints"
VERTEX_COLLECTION = "endpointNodes"
EDGE_COLLECTION = "endpointEdges"



@strawberry.type
class Endpoint:
    url: str

@strawberry.type
class Query:
    @strawberry.field
    def endpoint(self, url: str) -> List[Endpoint]:
        client = GraphDB()
        endpoints = client.get_endpoint(url)
        client.close()
        eps = []
        for vertex in endpoints["vertices"]:
            if "url" in vertex.keys():
                eps.append(Endpoint(url=vertex["url"]))
            else:
                eps.append(Endpoint(url=vertex["_key"]))
        # TODO: how to marshal endpoint into a type with strawberry?
        return eps

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

    @strawberry.mutation
    def product(self, name: str, urls: List[str]) -> str:
        client = GraphDB()
        client.insert_product(name, urls)
        client.close()
        return name


schema = strawberry.Schema(Query, Mutation)


graphql_app = GraphQLRouter(schema)


app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
