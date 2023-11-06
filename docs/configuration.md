# Configuration

Since this repository contains multiple deployable services, each service needs to be configured with environment variables. This page outlines the necessary configuration for all services in this repository.

## Webhook Server

```bash
--8<-- "webhook-server/.env.example"
```

## Graph Updater

```bash
--8<-- "graph-updater/.env.example"
```

## Endpoint Scanners

### Github Cloned Repo Checks

```bash
--8<-- "scanners/github-cloned-repo-checks/.env.example"
```

### Github Octokit Checks

```bash
--8<-- "scanners/github-octokit-checks/.env.example"
```

### Web Endpoint Checks

```bash
--8<-- "scanners/web-endpoint-checks/.env.example"
```

### Container Checks

> TODO

## GraphQL API

```bash
--8<-- "api/src/.env.example"
```

## Web UI

> TODO