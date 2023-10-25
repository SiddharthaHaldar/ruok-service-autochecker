import gql from 'graphql-tag';

export const typeDef = gql`
type RepoCheck {
    vulnerabilityAlertsEnabled: ComplianceCheck
    hasSecurityMd: ComplianceCheck
}
`
