# Ubuntu Linux Setup

## Installing Podman

See the [Podman Ubuntu Installation Instructions](https://podman.io/docs/installation#ubuntu). Importantly, at the time of writing this documentation, it was necessary to install the more recent version of `podman` from the [Kubic Project](https://build.opensuse.org/package/show/devel:kubic:libcontainers:unstable/podman); the more recent version of `podman` was the resolution to a bug documented in [this ubuntu bug report](https://bugs.launchpad.net/ubuntu/+source/libpod/+bug/2024394).


## Podman Desktop

See [Setting up and running a Kubernetes cluster locally with Podman Desktop](https://podman-desktop.io/blog/running-a-local-kubernetes-cluster-with-podman-desktop) for a guide on using Podman Desktop with Kind.

### Using Podman with Kind

It might be necessary to follow the steps in [Kind - Rootless](https://kind.sigs.k8s.io/docs/user/rootless/#creating-a-kind-cluster-with-rootless-podman). After following these instructions, I had to run `systemd-run --user --scope --property=Delegate=yes kind create cluster` to create my kind cluster. This [Linkedin Arcticle](https://www.linkedin.com/pulse/deploying-kubernetes-in-docker-kind-cluster-using-podman-tom-dean-1c) is also a good resource that reviews step-by-step setup of a KIND cluster using podman on Ubuntu Linux.


## Related Issues
- [Kind - Running with rootless podman doesn't work as documented](https://github.com/kubernetes-sigs/kind/issues/2872)
- [Kind - Podman creation fails](https://github.com/kubernetes-sigs/kind/issues/2537)