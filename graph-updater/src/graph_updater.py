from pathlib import Path
from enum import Enum
from typing import List
import yaml

import rustworkx
import matplotlib.pyplot as plt
from rustworkx.visualization import mpl_draw

from pydantic import BaseModel, HttpUrl


class NodeTypes(str, Enum):
    WEB = "webEndpoint"
    CONTAINER = "containerEndpoint"
    GITHUB = "githubEndpoint"


class EndpointNode(BaseModel):
    url: HttpUrl
    node_kind: NodeTypes
    pointers: List[HttpUrl] = []

    def __str__(self):
        return self.url


class ProductNode(BaseModel):
    name: str
    pointers: List[HttpUrl] = []

    def __str__(self):
        return self.url


def parse_yaml(yaml_path: Path):
    with open(yaml_path, "r") as stream:
        return yaml.safe_load(stream)


if __name__ == "__main__":
    # Create new graph
    graph = rustworkx.PyGraph()
    # The url associated with `test_endpoint.yaml` would be given
    endpoint_url = "https://github.com/someorg/somerepo"
    test_endpoint = parse_yaml(Path("test_endpoint.yaml"))
    # Add the endpoint URL to the graph.
    endpoint_node = graph.add_node(
        EndpointNode(url=endpoint_url, node_kind=NodeTypes.GITHUB)
    )
    # For each URL in test_endpoint, create a node and add
    for web_url in test_endpoint["webappUrls"]:
        web_node = graph.add_node(EndpointNode(url=web_url, node_kind=NodeTypes.WEB))
        graph.add_edge(endpoint_node, web_node, 1)
    tmp = 1
