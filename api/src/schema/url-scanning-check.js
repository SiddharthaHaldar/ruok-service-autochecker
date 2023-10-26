import gql from 'graphql-tag';

export const typeDef = gql`
type URLCheck {
    accessibility: AccessibilityReport
}

type AccessibilityReport {
   objectAlt: ComplianceCheck 
   areaAlt: ComplianceCheck
   ariaAllowedAttribute: ComplianceCheck
}
`

