import { GithubEndpoint } from "./github-endpoint.js"
import { WebEndpoint } from "./web-endpoint.js"
import { ContainerEndpoint } from "./container-endpoint.js"
import { GenericEndpoint } from "./generic-endpoint.js"

export function getEndpoint(kind) {
  switch (kind) {
    case "github": return new GithubEndpoint()
    case "web": return new WebEndpoint()
    case "container": return new ContainerEndpoint()
    default: return new GenericEndpoint()
  }
}
