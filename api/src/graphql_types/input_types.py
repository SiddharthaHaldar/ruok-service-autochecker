from typing import List, Optional

import strawberry

from graphql_types.typedef import JSON

@strawberry.input
class CheckPassesInput:
    check_passes: Optional[bool] = None
    metadata: Optional[JSON] = None


@strawberry.input
class GithubEndpointInput:
    url: str
    kind: str
    owner: str
    repo: str
    license: Optional[str] = None
    visibility: Optional[str] = None
    programming_language: Optional[List[str]] = None
    automated_security_fixes: Optional[CheckPassesInput] = None
    vulnerability_alerts: Optional[CheckPassesInput] = None
    branch_protection: Optional[CheckPassesInput] = None
    has_security_md: Optional[CheckPassesInput] = None
    has_dependabot_yaml: Optional[CheckPassesInput] = None


@strawberry.input
class AccessibilityScanInput:
    url: str
    area_alt: Optional[CheckPassesInput] = None
    aria_braille_equivalent: Optional[CheckPassesInput] = None
    aria_command_name: Optional[CheckPassesInput] = None
    aria_input_field: Optional[CheckPassesInput] = None
    aria_hidden_focus: Optional[CheckPassesInput] = None
    aria_meter_name: Optional[CheckPassesInput] = None

@strawberry.input
class WebEndpointInput:
    url: str
    kind: str
    accessibility: Optional[List[AccessibilityScanInput]] = None

