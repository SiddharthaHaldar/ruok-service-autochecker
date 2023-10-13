# Webhook Server

This folder contains the webhook server that receives GitHub webhooks, and writes events for thsoe webhooks into a NATS queue.

## Development Environment Setup for Webhook Server

If you haven't done so alreaady, see the general [Development Environment](../docs/development-environment.md) documentation for this repository. This `README.md` assumes that a container runtime, local Kubernetes environment, and VSCode dev container are already setup for this project.

Local development of the Webhook Server requires interacting with GitHub event hooks, [smee.io](https://smee.io) (or similar proxy service), the webhook server itself, and the NATS queue. The red arrows in the diagram below indicate the extra flows required to get webhooks triggered from a GitHub repository sent to the local development environment.

![Architecture](../docs/diagrams/architecture.svg)

## Run and Debug Webhook Server

To run and debug the webhook server, see the steps below.

1. Open VSCode with the dev container for this repository.
2. Create a `.env` file based on the values in `.env.example` (`.env` is `.gitignore`d so real values aren't accidentally committed to source control).
3. Create a `.envrc` file based on `.envrc.example`. Since `direnv` is used in the dev container for this repository, you should only need the `dotenv` in your `.envrc` file.
4. Visit [smee.io](https://smee.io) to create a channel that can be used with the `smee` client to forward GitHub webhooks to the local webhook server. You'll need to update the environment variable called `SMEE_URL` with the URL that's generated for your new channel on smee.io.
5. Follow the [Creating webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks) instructions from GitHub's official documentation to create a webhook on a repository of interest. Keep track of the secret key you use and set the `WEBHOOK_SECRET` environment variable to this value (this is the secret key that is used to verify that a webhook did indeed originate with GitHub.com).
4. Start your local Kubernetes cluster, and port-forward the `nats` service to `localhost:4222`