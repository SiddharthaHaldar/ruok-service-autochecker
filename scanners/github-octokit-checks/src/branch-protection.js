// export async function getBranchProtectionDetails(owner, repo, octokit, branch) {
// https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#get-branch-protection


import { OctokitCheckStrategy } from './octokit-check-strategy.js'

export class BranchProtectionStrategy extends OctokitCheckStrategy {
  constructor(repoName, owner, octokit, branchName = 'main') {
    super(repoName, owner, octokit, branchName);

    this.options = {
      owner: this.owner,
      repo: this.repo,
      branch: this.branchName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
    this.endpoint = 'GET /repos/{owner}/{repo}/branches/main/protection'
  }
  async formatResponse() {
    //    ____                 _      ___  _     
    //   / ___|_ __ __ _ _ __ | |__  / _ \| |    
    //  | |  _| '__/ _` | '_ \| '_ \| | | | |    
    //  | |_| | | | (_| | |_) | | | | |_| | |___ 
    //   \____|_|  \__,_| .__/|_| |_|\__\_\_____|
    //                  |_|        
    const graphqlVars = {
      orgName: "PHACDataHub",
      repoName: "ruok-service-autochecker"
    }
    const branchProtectionRules = await this.octokit.graphql(
      `query MyQuery($orgName: String!, $repoName: String!)  {
        repository(name: $repoName, owner: $orgName) {
          branchProtectionRules(first: 10) {
            edges {
              node {
                allowsDeletions
                allowsForcePushes
                blocksCreations
                dismissesStaleReviews
                isAdminEnforced
                lockAllowsFetchAndMerge
                lockBranch
                pattern
                requireLastPushApproval
                requiredApprovingReviewCount
                requiredDeploymentEnvironments
                requiresApprovingReviews
                requiresCodeOwnerReviews
                requiresCommitSignatures
                requiresConversationResolution
                requiresDeployments
                requiresLinearHistory
                requiresStatusChecks
                requiresStrictStatusChecks
                restrictsPushes
                restrictsReviewDismissals
              }
            }
          }
        }
      }`,
      graphqlVars
    )
    const repoBranches = await this.octokit.graphql(
      `query getExistingRepoBranches($orgName: String!, $repoName: String!) {
        organization(login: $orgName) {
          repository(name: $repoName) {
            id
            name
            refs(refPrefix: "refs/heads/", first: 10) {
              edges {
                node {
                  branchName:name
                }
              }
              pageInfo {
                endCursor #use this value to paginate through repos with more than 100 branches
              }
            }
          }
        }
      }`,
      graphqlVars,
    )
    //   _____      _                  _   
    //  | ____|_  _| |_ _ __ __ _  ___| |_ 
    //  |  _| \ \/ / __| '__/ _` |/ __| __|
    //  | |___ >  <| |_| | | (_| | (__| |_ 
    //  |_____/_/\_\\__|_|  \__,_|\___|\__|

    const branches = repoBranches.organization.repository.refs.edges.map(({ node }) => node.branchName)
    const rules = branchProtectionRules.repository.branchProtectionRules.edges
      .map(({ node }) => ({ [node.pattern]: node }))
      .reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      });

    //    ____ _               _    
    //   / ___| |__   ___  ___| | __
    //  | |   | '_ \ / _ \/ __| |/ /
    //  | |___| | | |  __/ (__|   < 
    //   \____|_| |_|\___|\___|_|\_\

    const checkPasses = this.passesCheck(rules, branches);
    return {
      checkPasses,
      metadata: {
        rules,
        branches,
      }
    }
  }
  passesCheck(rules, branches) {
    // At least one protected branch rule matches branch in repository
    return branches.map(branch => branch in rules).includes(true)
  }
}
