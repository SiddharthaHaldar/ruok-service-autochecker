# Development Environment

This page outlines how to set up a development environment for this project. This document is meant to serve as a high-level mental model for how to set up a development environment. There are many ways to substitute certain components if a developer prefers one tool over another.

## Overview

The diagram below shows a high-level overview of the development environment.

![Development Environment](diagrams/dev-environment.svg)

[VSCode](https://code.visualstudio.com/) is used as the integrated development environment. VSCode is run in client-server mode: The desktop VSCode application is downloaded for the operating system of choice, and a project-specific [VSCode Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) is used to run VSCode server as a dev container.

[K9s](https://k9scli.io/) is used as a kubernetes dashboard, which provides a user interface for the developer to interact with the Kubernetes cluster.