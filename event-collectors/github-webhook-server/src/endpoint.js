
/**
 * Events from GitHub Webhooks usually correspond to GitHub endpoints,
 * with the exception that DNS A records are managed through a specific
 * GitHub repository. In this special case, there are 
 * @param {string} url 
 * @returns 
 */
export function endpointKind(url) {
  // If the webhook is from the DNS repo, we need to create a message
  // for two updates: one that scans the contents of the DNS repo, and
  // another to scan the DNS GitHub repository itself.
  if (url.endsWith("dns")) {
    return ["web", "github"]
  }
  return ["github"]
}
