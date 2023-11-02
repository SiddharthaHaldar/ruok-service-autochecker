import { GithubEndpoint } from "./github-endpoint.js"
import { WebEndpoint } from "./web-endpoint.js"
import { ContainerEndpoint } from "./container-endpoint.js"
import { GenericEndpoint } from "./generic-endpoint.js"

export function endpoint(kind) {
  switch (kind) {
    case "github": return GithubEndpoint()
    case "web": return WebEndpoint()
    case "container": return ContainerEndpoint()
    default: return GenericEndpoint()
  }
}
