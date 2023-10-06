# GitHub Webhooks

`webhook-server/` contains the implementation of the GitHub webhook server portion of this project. The purpose of this server is to listen for events triggered by certain events of interest on GitHub resources.

## Local Development with GitHub Webhooks

In order to test `webhook-server` locally, it is necessary to use a webhook proxy URL to forward webhooks from GitHub to your computer. Instructions for how to do this are as follows:

1. In your browser, nagivate to https://smee.io/ and click **Start a new channel**.
2. Copy the full URL under **Webhook Proxy URL**.
3. Install the corresponding `smee-client` package from npm as a dev dependency: `npm i sme-client --save-dev`.
4. Start the `smee-client` as follows: `smee --url <Paste Webhook Proxy URL here> --path <Path to endpoint that handles webhook(s)> --port <port webhook server is listening on>`.
5. Go to a repository of interest in the PHACDataHub Github organization, go to **Settings** --> **Code and automation** --> **Webhooks** --> **Add new webhook** and paste the Webhook Proxy URL from step 1. Choose `application/json` for the content type. You can also choose which repo events get forwarded, or select **"sent me everything"** to receive all events.
6. Start up the `webhook-server`.
7. Trigger an event on the GitHub repo that you registered the webhook with. If everything is set up correctly, you should receive a request to `webhook-server` where `req.body` contains the JSON payload of the GitHub webhook event.



### Helpful Resources

- [testing webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks)
- [redelivering webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks)
- [about webhooks](https://docs.github.com/en/webhooks/about-webhooks)