import gql from 'graphql-tag';

export const typeDef = gql`
type URLCheck {
    accessibility: AccessibilityReport
}

type AccessibilityReport {
    minimumColourContrast: ComplianceCheck
    ariaLabelsIncluded: ComplianceCheck

}
`

