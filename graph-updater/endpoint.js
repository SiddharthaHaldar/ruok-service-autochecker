import { GithubEndpoint } from "./src/github-endpoint.js"
import { WebEndpoint } from "./src/web-endpoint.js"
import { ContainerEndpoint } from "./src/container-endpoint.js"
import { GenericEndpoint } from "./src/generic-endpoint.js"

export function endpoint(kind) {
  switch (kind) {
    case "github": return GithubEndpoint()
    case "web": return WebEndpoint()
    case "container": return ContainerEndpoint()
    default: return GenericEndpoint()
  }
}

export function endpointKind(url) {
  if (url.includes("github.com")) {
    return "github"
  }
  if (url.includes(".gc.ca")) {
    return "web"
  }
  if (url.includes("docker")) {
    return "container"
  }
  return "generic"
}
