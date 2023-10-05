# Skaffold for K8S Development

## Running Skaffold

Need to [set `DOCKER_HOST` to the podman socket](https://podman-desktop.io/docs/migrating-from-docker/using-the-docker_host-environment-variable) if using podman. Setting `--check-cluster-node-platforms=false` [stops skaffold from trying to use the local Docker CLI by default](https://github.com/GoogleContainerTools/skaffold/issues/8430#issuecomment-1741159402).

```bash
DOCKER_HOST=unix:///run/user/${UID}/podman/podman.sock skaffold run --check-cluster-node-platforms=false
```