import gql from 'graphql-tag';

export const typeDef = gql`
type ComplianceCheck {
    checkPasses: Boolean
    metadata: JSON
}
`

