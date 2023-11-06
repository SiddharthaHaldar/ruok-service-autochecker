import { Octokit } from "octokit"

import { load } from "js-yaml";

import 'dotenv-safe/config.js'

const { GITHUB_TOKEN } = process.env

const GRAPH_METADATA_NAME = ".product.yaml";


export class GithubEndpoint {
  constructor() {
    this.octokit = new Octokit({ auth: GITHUB_TOKEN, });
  }

  /**
   * For GitHub endpoints, graph metadata is specified in `.product.yaml`
   * files in the repository root.
   */
  async getGraphMetaData(payload) {
    // GitHub urls always follow `github.com/orgName/repoName`, so from this
    // structure we can construct the org name and repo name.
    const prefix = (new URL(payload.endpoint)).pathname.split("/")
    const orgName = prefix[1];
    const repoName = prefix[2];
    // Try and get a .product.yaml file from the root of the repository
    const response = await this.octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: orgName,
      repo: repoName,
      path: GRAPH_METADATA_NAME
    }
    )
    var extraEndpoints = new Set([]);
    if (response.status === 200) {
      // base64 decode to ascii, then parse ascii string to yaml object
      const productDotYaml = load(
        Buffer
          .from(response.data.content, 'base64')
          .toString('ascii')
      );
      // Create list of endpoints associated with this endpoint
      var extraEndpoints = this.extractEndpoints(productDotYaml);
    }
    var newEndpoints = new Set([
      ...extraEndpoints,
      payload.endpoint
    ]);

    return newEndpoints;
  }

  
  /**
   * Given a yaml object, extract all endpoints and return a set of all endpoints
   * found.
   * @param {Object} yamlObj 
   */
  extractEndpoints(yamlObj) {
    return new Set([
      ...(yamlObj.webEndpoints || []),
      ...(yamlObj.githubEndpoints || []),
      ...(yamlObj.containerEndpoints || []),
    ])
  }
}
