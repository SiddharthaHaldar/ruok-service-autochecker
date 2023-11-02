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
    const {
      orgName,
      repoName,
    } = payload;

    const response = await this.octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: orgName,
      repo: repoName,
      path: GRAPH_METADATA_NAME
    }
    )
    // base64 decode to ascii, then parse ascii string to yaml object
    const productDotYaml = load(
      Buffer
        .from(response.data.content, 'base64')
        .toString('ascii')
    );
    var productEndpoints = this.extractEndpoints(productDotYaml);

    let tmp = 1;
    return "test"
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
