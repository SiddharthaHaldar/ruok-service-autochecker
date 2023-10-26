import gql from 'graphql-tag';

export const typeDef = gql`
type ContainerImageCheck {
    trivyReport: TrivyComplianceCheck
    gitleaksReport: GitleaksComplianceCheck
}

type trivyComplianceCheck {
    checkPasses: Boolean!
    trivyReport: [TrivyReport]
}

type TrivyReport {
    library: String!
    vulnerability: String!
    severity: String!
    installedVersion: String!
    fixedVersion: String
    title: String!
}
`
