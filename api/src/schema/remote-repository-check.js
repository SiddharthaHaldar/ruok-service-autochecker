import gql from 'graphql-tag';

export const typeDef = gql`
type RemoteRepositoryCheck {
    vulnerabilityAlertsEnabled: ComplianceCheck
    automatedSecurityFixesEnabled: ComplianceCheck
    branchProtectionEnabled: ComplianceCheck
}
`
