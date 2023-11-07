import strawberry

from typing import List

from types.typedef import GithubEndpoint
from model import GraphDB

@strawberry.type
class Mutation:
    @strawberry.mutation
    def githubEndpoint(self, endpoint: GithubEndpoint) -> str:
        client = GraphDB()
        client.insert_github_endpoint(endpoint)
        client.close()
        return endpoint.url

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
