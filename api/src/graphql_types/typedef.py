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
    has_security_md: CheckPasses
    has_dependabot_yaml: CheckPasses

@strawberry.type
class AccessibilityInput:
    url: str
    area_alt: Optional[CheckPasses]
    aria_braille_equivalent: Optional[CheckPasses]
    aria_command_name: Optional[CheckPasses]
    aria_hidden_focus: Optional[CheckPasses]
    aria_input_field: Optional[CheckPasses]
    aria_meter_name: Optional[CheckPasses]
    aria_progressbar_name: Optional[CheckPasses]
    aria_required_children: Optional[CheckPasses]
    aria_required_parent: Optional[CheckPasses]
    aria_roledescription: Optional[CheckPasses]
    aria_toggle_field_name: Optional[CheckPasses]
    aria_tooltip_name: Optional[CheckPasses]
    audio_caption: Optional[CheckPasses]
    blink: Optional[CheckPasses]
    definition_list: Optional[CheckPasses]
    dlitem: Optional[CheckPasses]
    duplicate_id_aria: Optional[CheckPasses]
    frame_focusable_content: Optional[CheckPasses]
    frame_title_unique: Optional[CheckPasses]
    frame_title: Optional[CheckPasses]
    html_xml_lang_mismatch: Optional[CheckPasses]
    imageAlt: Optional[CheckPasses]
    input_button_name: Optional[CheckPasses]
    input_image_alt: Optional[CheckPasses]
    link_in_text_block: Optional[CheckPasses]
    list: Optional[CheckPasses]
    listitem: Optional[CheckPasses]
    marquee: Optional[CheckPasses]
    meta_refresh: Optional[CheckPasses]
    object_alt: Optional[CheckPasses]
    role_img_alt: Optional[CheckPasses]
    scrollable_region_focusable: Optional[CheckPasses]
    select_name: Optional[CheckPassesInput]
    server_side_image_map: Optional[CheckPassesInput] 
    svg_img_alt: Optional[CheckPassesInput] 
    td_headers_attr: Optional[CheckPassesInput]
    td_has_data_cells: Optional[CheckPassesInput]
    valid_lang: Optional[CheckPassesInput] 
    video_caption: Optional[CheckPassesInput] 
    no_autoplay_audio: Optional[CheckPassesInput] 
    aria_allowed_attr: Optional[CheckPassesInput] 
    aria_conditional_attr: Optional[CheckPassesInput] 
    aria_deprecated_role: Optional[CheckPassesInput] 
    aria_hidden_body: Optional[CheckPassesInput] 
    aria_prohibited_attr: Optional[CheckPassesInput] 
    aria_required_attr: Optional[CheckPassesInput] 
    aria_roles: Optional[CheckPassesInput] 
    aria_valid_attr_value: Optional[CheckPassesInput] 
    aria_valid_attr: Optional[CheckPassesInput] 
    button_name: Optional[CheckPassesInput] 
    color_contrast: Optional[CheckPassesInput] 
    document_title: Optional[CheckPassesInput] 
    form_field_multiple_labels: Optional[CheckPassesInput] 
    html_has_lang: Optional[CheckPassesInput] 
    html_lang_valid: Optional[CheckPassesInput] 
    label: Optional[CheckPassesInput] 
    linkName: Optional[CheckPassesInput] 
    meta_viewport: Optional[CheckPassesInput] 
    nested_interactive: Optional[CheckPassesInput] 
    bypass: Optional[CheckPassesInput] 

@strawberry.type
class WebEndpoint(Endpoint):
    url: str
    kind: str
    accessibility: Optional[List[AccessibilityInput]]
