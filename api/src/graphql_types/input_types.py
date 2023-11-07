from typing import List, Optional

import strawberry

from graphql_types.typedef import JSON

@strawberry.input
class CheckPassesInput:
    check_passes: Optional[bool]
    metadata: Optional[JSON]


@strawberry.input
class GithubEndpointInput:
    url: str
    kind: str
    owner: str
    repo: str
    license: str
    visibility: str
    programming_language: List[str]
    automated_security_fixes: CheckPassesInput
    vulnerability_alerts: CheckPassesInput
    branch_protection: CheckPassesInput


@strawberry.input
class WebEndpointInput:
    url: str
    kind: str
