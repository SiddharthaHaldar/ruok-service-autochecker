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
class AccessibilityInput:
    url: str
    area_alt: Optional[CheckPassesInput] = None
    aria_braille_equivalent: Optional[CheckPassesInput] = None
    aria_command_name: Optional[CheckPassesInput] = None
    aria_hidden_focus: Optional[CheckPassesInput] = None
    aria_input_field: Optional[CheckPassesInput] = None
    aria_meter_name: Optional[CheckPassesInput] = None
    aria_progressbar_name: Optional[CheckPassesInput] = None
    aria_required_children: Optional[CheckPassesInput] = None
    aria_required_parent: Optional[CheckPassesInput] = None
    aria_roledescription: Optional[CheckPassesInput] = None
    aria_toggle_field_name: Optional[CheckPassesInput] = None
    aria_tooltip_name: Optional[CheckPassesInput] = None
    audio_caption: Optional[CheckPassesInput] = None
    blink: Optional[CheckPassesInput] = None
    definition_list: Optional[CheckPassesInput] = None
    dlitem: Optional[CheckPassesInput] = None
    duplicate_id_aria: Optional[CheckPassesInput] = None
    frame_focusable_content: Optional[CheckPassesInput] = None
    frame_title_unique: Optional[CheckPassesInput] = None
    frame_title: Optional[CheckPassesInput] = None
    html_xml_lang_mismatch: Optional[CheckPassesInput] = None
    imageAlt: Optional[CheckPassesInput] = None
    input_button_name: Optional[CheckPassesInput] = None
    input_image_alt: Optional[CheckPassesInput] = None
    link_in_text_block: Optional[CheckPassesInput] = None
    list: Optional[CheckPassesInput] = None
    listitem: Optional[CheckPassesInput] = None
    marquee: Optional[CheckPassesInput] = None
    meta_refresh: Optional[CheckPassesInput] = None
    object_alt: Optional[CheckPassesInput] = None
    role_img_alt: Optional[CheckPassesInput] = None
    scrollable_region_focusable: Optional[CheckPassesInput] = None
    select_name: Optional[CheckPassesInput] = None
    server_side_image_map: Optional[CheckPassesInput] = None
    svg_img_alt: Optional[CheckPassesInput] = None
    td_headers_attr: Optional[CheckPassesInput] = None
    td_has_data_cells: Optional[CheckPassesInput] = None
    valid_lang: Optional[CheckPassesInput] = None
    video_caption: Optional[CheckPassesInput] = None
    no_autoplay_audio: Optional[CheckPassesInput] = None
    aria_allowed_attr: Optional[CheckPassesInput] = None
    aria_conditional_attr: Optional[CheckPassesInput] = None
    aria_deprecated_role: Optional[CheckPassesInput] = None
    aria_hidden_body: Optional[CheckPassesInput] = None
    aria_prohibited_attr: Optional[CheckPassesInput] = None
    aria_required_attr: Optional[CheckPassesInput] = None
    aria_roles: Optional[CheckPassesInput] = None
    aria_valid_attr_value: Optional[CheckPassesInput] = None
    aria_valid_attr: Optional[CheckPassesInput] = None
    button_name: Optional[CheckPassesInput] = None
    color_contrast: Optional[CheckPassesInput] = None
    document_title: Optional[CheckPassesInput] = None
    form_field_multiple_labels: Optional[CheckPassesInput] = None
    html_has_lang: Optional[CheckPassesInput] = None
    html_lang_valid: Optional[CheckPassesInput] = None
    label: Optional[CheckPassesInput] = None
    linkName: Optional[CheckPassesInput] = None
    meta_viewport: Optional[CheckPassesInput] = None
    nested_interactive: Optional[CheckPassesInput] = None
    bypass: Optional[CheckPassesInput] = None


@strawberry.input
class WebEndpointInput:
    url: str
    kind: str
    accessibility: Optional[List[AccessibilityInput]] = None

