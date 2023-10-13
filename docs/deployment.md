# Deploying on Kubernetes

This document outlines how to deploy the Kubernetes application for `ruok-service-autochecker`.

## Deploying on a Local Kubernetes Cluster

To deploy the `ruok-service-autochecker` application onto a local Kubernetes environment, ensure your current context is set to your local cluster (i.e. `kubectl config set-context <your cluster>`). You can verify your Kubernetes context by running `kubectl config get-contexts`; your current context will be indicated with `*`.

Before deploying the application, it is necessary to first build and tag all of the images in this repository. You can build and tag all of the images by running `make build`.

Note that you may need to perform an extra step of loading your locally built images into your local cluster's image registry (see [Loading an image into the KinD Cluster](./development-environment.md#loading-an-image-into-the-kind-cluster), for example).

Once connected to your local cluster, run `make k8s` to deploy the various manifests and `kustomization.yaml` files associated with the application.

## Continuous Deployment onto GKE

> TODO