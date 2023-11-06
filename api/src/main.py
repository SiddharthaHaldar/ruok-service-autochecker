from typing import List


import strawberry

import uvicorn

from fastapi import FastAPI


from strawberry.fastapi import GraphQLRouter

from model import GraphDB

from constants import Settings


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
    uvicorn.run(app, host=Settings().GRAPHQL_HOST, port=Settings().GRAPHQL_PORT)
