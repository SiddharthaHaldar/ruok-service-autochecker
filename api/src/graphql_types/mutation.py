import strawberry

from typing import List

from graphql_types.typedef import GithubEndpoint
from model import GraphDB

@strawberry.type
class Mutation:
    @strawberry.mutation
    def endpoint(self, url: str) -> str:
        """
        Insert an endpoint with no additional metadata. This mutation should only
        be used by the graph updater component to update the graph structure.
        """
        client = GraphDB()
        client.insert_endpoint(url)
        client.close()
        return url

    @strawberry.mutation
    def githubEndpoint(self, endpoint: GithubEndpoint) -> str:
        """
        Insert a githubEndpoitn along with the appropriate metadata.
        """
        client = GraphDB()
        client.insert_github_endpoint(endpoint)
        client.close()
        return endpoint.url
    
    @strawberry.mutation
    def endpoints(self, urls: List[str]) -> List[str]:
        """
        Writes a list of URLs to the graph. Each URL will be associated with
        every other URL in the list.
        """
        client = GraphDB()
        client.insert_endpoints(urls)
        client.close()
        return urls

    @strawberry.mutation
    def product(self, name: str, urls: List[str]) -> str:
        """
        Attaches a product label to a list of URLs.
        """
        client = GraphDB()
        client.insert_product(name, urls)
        client.close()
        return name
