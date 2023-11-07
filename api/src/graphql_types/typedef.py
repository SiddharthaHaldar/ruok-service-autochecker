from typing import NewType, List, Optional

import strawberry


@strawberry.type
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

@strawberry.type
class GithubEndpoint(Endpoint):
    url: str
    kind: str
    _key: str
    owner: str
    repo: str
    license: str
    visibility: str
    programming_language: List[str]
    automated_security_fixes: CheckPasses
    vulnerability_alerts: CheckPasses
    branch_protection: CheckPasses

@strawberry.type
class WebEndpoint(Endpoint):
    url: str
    kind: str
