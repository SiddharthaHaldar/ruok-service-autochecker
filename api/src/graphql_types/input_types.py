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
    license: Optional[str]
    visibility: Optional[str]
    programming_language: Optional[List[str]]
    automated_security_fixes: Optional[CheckPassesInput]
    vulnerability_alerts: Optional[CheckPassesInput]
    branch_protection: Optional[CheckPassesInput]
    has_security_md: Optional[CheckPassesInput]
    has_dependabot_yaml: Optional[CheckPassesInput]

@strawberry.input
class WebEndpointInput:
    url: str
    kind: str
