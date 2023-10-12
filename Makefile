# k8s is a folder and a target, so we need to declare that `make k8s`
# should still run, even if there have been no changes to the k8s/
# folder.
.PHONY: k8s

APP_NAME := ruok
APP_VERSION := 0.0.1

# Figure out if podman or docker is being used as the container runtime
CONTAINER_RUNTIME := $(shell command -v podman 2> /dev/null || echo docker)

# Build all images in the repo
build: build-api-image build-webhook-server-image

# Main RUOK API
build-api-image:
	$(CONTAINER_RUNTIME) build ./api/ -t $(APP_NAME)-api:$(APP_VERSION)

# Scanners
# TODO

# Webhook Server API
build-webhook-server-image:
	$(CONTAINER_RUNTIME) build ./webhook-server/ -t $(APP_NAME)-webhook-server:$(APP_VERSION)


# K8s

k8s:
    # Deploy CRDs separately from rest of manifests to avoid race condition
	echo DEPLOY ARANGODB OPERATOR CRDS
	kubectl apply -k ./k8s/arangodb-crds/
	echo DEPLOY MAIN APPLICATION AFTER CRDS ARE INSTALLED
	sleep 2
	kubectl apply -k ./k8s/