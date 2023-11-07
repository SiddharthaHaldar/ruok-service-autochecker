from typing import NewType, List, Optional

import strawberry

@strawberry.interface
class Endpoint:
    url: str

JSON = strawberry.scalar(
    NewType("JSON", object),
    description="The `JSON` scalar type represents JSON values as specified by ECMA-404",
    serialize=lambda v: v,
    parse_value=lambda v: v,
)

@strawberry.type
class CheckPasses:
    check_passes: Optional[bool]
    metadata: Optional[JSON]

@strawberry.input
class CheckPassesInput:
    check_passes: Optional[bool]
    metadata: Optional[JSON]


@strawberry.input
@strawberry.type
class GithubEndpoint(Endpoint):
    """
    ## Example of how to use this as an input type:

    ```graphql
        mutation {
        githubEndpoint(
            endpoint: {
            url:"https://github.com/PHACDataHub/ruok-service-autochecker",
            owner: "PHACDataHub"
            repo:"ruok-service-autochecker"
            }
        )
        }
    ```
    """
    url: str
    owner: str
    repo: str
    license: str
    visibility: str
    programming_language: List[str]
    automated_security_fixes: CheckPassesInput
    vulnerability_alerts: CheckPassesInput
    branch_protection: CheckPassesInput


