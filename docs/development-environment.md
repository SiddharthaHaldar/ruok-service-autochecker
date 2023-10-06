# Development Environment

This page outlines how to set up a development environment for this project. This document is meant to serve as a high-level mental model for how to set up a development environment. There are many ways to substitute certain components if a developer prefers one tool over another.

## Overview

The diagram below shows a high-level overview of the development environment.

![Development Environment](diagrams/dev-environment.svg)

[VSCode](https://code.visualstudio.com/) is used as the integrated development environment. VSCode is run in client-server mode: The desktop VSCode application is downloaded for the operating system of choice, and a project-specific [VSCode Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) is used to run VSCode server as a dev container. The VSCode Dev Container is attached to the host network, so the development container can access ports exposed on `127.0.0.1`, for example.

[K9s](https://k9scli.io/) is used as a kubernetes dashboard, which provides a user interface for the developer to interact with the Kubernetes cluster.

[Podman](https://podman.io/) is a daemonless and rootless OCI-compliant runtime and container manager that can be used to build OCI images and run containers on your development machine.

[Kubernetes in Docker](https://kind.sigs.k8s.io/) (KinD) is a tool for running local kubernetes clusters entirely in OCI containers (i.e. OCI containers are used to run Kubernetes nodes). 

The sections below outline how to set up each component of this environment.

## VSCode Development Containers

### Attach Development Container to Host Network

As per [this thread answer](https://community.home-assistant.io/t/developing-in-devcontainer-how-to-access-local-network-of-host/271935/2), add the following key in `devcontainer.json`.

```json
...,
	"runArgs": [
		"--network=host"
	],
...
```

## Podman

Instructions for installing the Podman runtime on all platforms can be found [at this link](https://podman.io/docs/installation). Additionally (and optionally), you can install [Podman Desktop](https://podman-desktop.io/), which provides a graphical tool to facilitate working with podman.

### Using Podman with KinD

It might be necessary to follow the steps in [Kind - Rootless](https://kind.sigs.k8s.io/docs/user/rootless/#creating-a-kind-cluster-with-rootless-podman). After following these instructions, I had to run `systemd-run --user --scope --property=Delegate=yes kind create cluster` to create my kind cluster. This [Linkedin Arcticle](https://www.linkedin.com/pulse/deploying-kubernetes-in-docker-kind-cluster-using-podman-tom-dean-1c) is also a good resource that reviews step-by-step setup of a KIND cluster using podman on Ubuntu Linux.

### Related Issues
- [Kind - Running with rootless podman doesn't work as documented](https://github.com/kubernetes-sigs/kind/issues/2872)
- [Kind - Podman creation fails](https://github.com/kubernetes-sigs/kind/issues/2537)