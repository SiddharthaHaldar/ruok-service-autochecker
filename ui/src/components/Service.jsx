import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Flex, Box, Text, Heading, DataList, Badge } from '@radix-ui/themes'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { servicesData } from '../assets/dummyData'

const Service = () => {
  const { serviceName } = useParams()
  const service = servicesData.allServices.find(
    (service) => service.name === serviceName,
  )

  if (!service) {
    return <Text>Service not found</Text>
  }

  const renderVulnerabilities = () => (
    <Box
      margintop="4"
      padding="4"
      borderwidth="1"
      borderradius="md"
      bordercolor="red"
      backgroundcolor="red.50"
    >
      <Text fontSize="lg" fontWeight="bold" color="red.600">
        Vulnerabilities & Issues:
      </Text>
      {service.hadolint && !service.hadolint.checkPasses && (
        <Text fontSize="sm" color="red.600">
          <Badge colorscheme="red">Hadolint Issues</Badge>:{' '}
          {service.hadolint.metadata.vulnerabilities.join(', ')}
        </Text>
      )}
      {service.vulnerabilityAlerts &&
        !service.vulnerabilityAlerts.checkPasses && (
          <Text fontSize="sm" color="red.600">
            <Badge colorscheme="red">Vulnerability Alerts</Badge>:{' '}
            {service.vulnerabilityAlerts.metadata.vulnerabilities.join(', ')}
          </Text>
        )}
      {service.automatedSecurityFixes &&
        !service.automatedSecurityFixes.checkPasses && (
          <Text fontSize="sm" color="red.600">
            <Badge colorscheme="red">Automated Security Fixes</Badge>: Issues
            detected
          </Text>
        )}
      {service.hasDependabotYaml && !service.hasDependabotYaml.checkPasses && (
        <Text fontSize="sm" color="red.600">
          <Badge colorscheme="red">Dependabot YAML</Badge>: Issues detected
        </Text>
      )}
      {service.hasSecurityMd && !service.hasSecurityMd.checkPasses && (
        <Text fontSize="sm" color="red.600">
          <Badge colorscheme="red">Security MD</Badge>: Issues detected
        </Text>
      )}
    </Box>
  )

  return (
    <Box padding="4">
      <Heading size="4" margintop="4" marginbottom="4">
        {service.name}
      </Heading>

      {service.webUrl && (
        <Box
          margintop="4"
          padding="3"
          borderwidth="1"
          borderradius="md"
          backgroundcolor="blue.50"
        >
          <Text fontSize="lg" fontWeight="bold" color="blue.600">
            <Link
              to={`/${service.name}/${service.webUrlId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Web URL: {service.webUrl}
            </Link>
          </Text>
        </Box>
      )}

      <DataList.Root orientation="vertical" size="2">
        <DataList.Item>
          <DataList.Label minwidth="120px">Description</DataList.Label>
          <DataList.Value>{service.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minwidth="120px">Programming Language</DataList.Label>
          <DataList.Value>{service.programmingLanguage}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minwidth="120px">License</DataList.Label>
          <DataList.Value>{service.license || 'N/A'}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minwidth="120px">Visibility</DataList.Label>
          <DataList.Value>{service.visibility || 'N/A'}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {renderVulnerabilities()}

      <Heading size="3" margintop="6" marginbottom="4">
        Referencing Endpoints
      </Heading>
      <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
        {service.referencingEndpoints.map((endpoint, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <Link
              to={`/${service.name}/${endpoint.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Flex
                align="center"
                justify="between"
                padding="3"
                backgroundcolor="gray"
                borderradius="md"
                boxshadow="sm"
              >
                <Text>{endpoint.url}</Text>
                <DoubleArrowRightIcon />
              </Flex>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default Service
