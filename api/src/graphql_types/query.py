import strawberry

from model import GraphDB

from typing import List

from graphql_types.typedef import Endpoint


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
        return eps

    @strawberry.field
    def endpoints(self, urls: List[str]) -> List[Endpoint]:
        client = GraphDB()
        endpoints = client.get_endpoints(urls)
        client.close()
        return [Endpoint(url=vertex) for vertex in endpoints]

    @strawberry.field
    def product(self, name: str) -> str:
        # TODO: implement product
        return name
