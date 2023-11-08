import strawberry

from typing import List

from graphql_types.input_types import GithubEndpointInput
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
    def githubEndpoint(self, endpoint: GithubEndpointInput) -> str:
        """
        # Update/Insert Github Endpoint

        Insert a Github Endpoint with "upsert" semantics. If the endpoint doesn't already
        exist, the endpoint document will be created. If the endpoint already exists, its
        fields will be updated with the values provided in the mutation.

        # Example

        ```graphql
        mutation {
            githubEndpoint(
                endpoint: {
                url:"https://github.com/someOrg/someRepo"
                kind: "Github"
                owner: "someOrg"
                repo:"someRepo"
                license: "MIT"
                visibility:"Public"
                programmingLanguage:["Python", "JavaScript", "Bash", "Dockerfile"]
                automatedSecurityFixes: {
                    checkPasses: true
                    metadata: {}
                }
                vulnerabilityAlerts: {
                    checkPasses: false
                    metadata: {
                    key: "value"
                    }
                }
                branchProtection:{
                    checkPasses:true,
                    metadata:{
                    key:"value"
                    }
                }
                }
            )
        }
        ```
        """
        client = GraphDB()
        client.upsert_scanner_endpoint(endpoint)
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
