# RUOK Architecture

The core architecture relies on an event-driven workflow based on [GitHub Webhooks](github-webhooks.md) for repository events.

![Architecture Diagram](./diagrams/architecture.svg)

A webhook server listens for repository events from GitHub.

When a webhook event is received, the webhook server verifies the authenticity of the event (i.e. that it actually originated from GitHub.com), then publishes a repository event in a NATS queue.

Multiple scanners are subscribed to NATS queue groups, where each scanner performs certain kinds of checks. For example, the "Clone Repo Scanner" shown on the diagram above may clone the repository on which an event was detected and perform certain compliance checks on the cloned repository, whereas the "Octokit API scanner" may call the GitHub API to verify certain properties of the repository.

Scanners write their results to the appropriate document in ArangoDB. A small web application uses the data in ArangoDB in order render pages for each repository to report on their health, compliance, and any other properties of interest.