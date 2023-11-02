import { GithubEndpoint } from "./src/github-endpoint.js"
import { WebEndpoint } from "./src/web-endpoint.js"
import { ContainerEndpoint } from "./src/container-endpoint.js"
import { GenericEndpoint } from "../graph-updater/src/generic-endpoint.js"

export function endpoint(kind) {
  switch (kind) {
    case "github": return GithubEndpoint()
    case "web": return WebEndpoint()
    case "container": return ContainerEndpoint()
    default: return GenericEndpoint()
  }
}
