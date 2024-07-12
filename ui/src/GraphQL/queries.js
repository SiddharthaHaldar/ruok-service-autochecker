import { gql } from "@apollo/client";

export const ALL_ENDPOINTS_QUERY = gql`
    query ALLENDPOINTS 
    { 
        allEndpoints { 
            url 
            kind
        }
    }
`;

export const FETCH_GITHUB_URL_QUERY = gql`
    query FETCH_GITHUB_URL($url: String!)
    {
        githubEndpoint(url: $url) {
            url
            kind
            license
            visibility
            owner
            repo
            Key
            automatedSecurityFixes {
            checkPasses
            metadata
            }
            branchProtection {
            checkPasses
            metadata
            }
            programmingLanguage
            description
            gitleaks {
            checkPasses
            metadata
            }
            hadolint {
            checkPasses
            metadata
            }
            hasDependabotYaml {
            checkPasses
            metadata
            }
            hasSecurityMd {
            checkPasses
            metadata
            }
            vulnerabilityAlerts {
            checkPasses
            metadata
            }
        }
    }
`

export const FETCH_WEB_URL_QUERY = gql`
    query FETCH_WEB_URL($url: String!)
    {
        webEndpoint(url: $url) {
            url
            kind
            accessibility {
                url
                svgImgAlt
                {
                    checkPasses
                    metadata
                }
            }
        }
    }
`

export const FETCH_RELATED_ENDPOINTS_QUERY = gql`
    query FETCH_RELATED_ENDPOINTS($url: String!)
    {
        endpoints(urls: [$url]) {
            url
        }
    }
`