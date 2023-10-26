import gql from 'graphql-tag';

export const typeDef = gql`
type RemoteRepositoryCheck {
    hasSecurityMd: ComplianceCheck
    gitleaksReport: GitleaksComplianceCheck
    fileSizeCheck: ComplianceCheck
    hadolintDockerfile: HadolintComplianceCheck
}

type HadolintComplianceCheck {
    checkPasses: Boolean!
    hadolintReport: [HadolintReport]
}

type HadolintReport {
    dockerfilePath: String!
    rule: String!
    severity: String!
    description: String!
}

type GitleaksComplianceCheck {
    checkPasses: Boolean!
    gitleaksReport: [GitleaksReport]
}

type GitleaksReport {
    finding: String!
    ruleId: String!
    file: String!
    line: Int!
    commit: String!
    author: String!
    email: String!
    date: String!
}
`
