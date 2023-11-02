
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
