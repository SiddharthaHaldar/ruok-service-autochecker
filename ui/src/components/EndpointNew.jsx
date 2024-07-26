import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text, Heading, Flex, Badge } from '@radix-ui/themes'
import { endpointData } from '../assets/dummyData'

const EndpointDetails = () => {
  const { endpointId } = useParams()

  const endpoint = endpointData[endpointId]

  if (!endpoint) {
    return <Text>Endpoint not found</Text>
  }

  return (
    <Box
      padding="4"
      borderwidth="1"
      borderradius="md"
      boxshadow="sm"
      backgroundcolor="white"
    >
      <Heading size="4" marginbottom="4">
        Endpoint Details
      </Heading>

      <Flex direction="column" gap="4">
        <Text fontSize="lg" fontWeight="bold">
          Endpoint ID: {endpointId}
        </Text>
        <Text fontSize="md">Kind: {endpoint.kind}</Text>

        {endpoint.kind === 'Web' && endpoint.accessibility && (
          <Box
            borderwidth="1"
            borderradius="md"
            padding="4"
            bordercolor="gray"
            backgroundcolor="gray.50"
          >
            <Heading size="5" marginbottom="2">
              Accessibility Details
            </Heading>
            <Text fontSize="md">
              <Badge colorscheme="blue">Accessibility URL</Badge>:{' '}
              {endpoint.accessibility.url}
            </Text>
            <Text fontSize="md">
              <Badge colorscheme="blue">Image Alt Text</Badge>:{' '}
              {endpoint.accessibility.svgImgAlt}
            </Text>
            <Text fontSize="md">
              <Badge colorscheme="blue">Check Passes</Badge>:{' '}
              {endpoint.accessibility.checkPasses ? 'Yes' : 'No'}
            </Text>
          </Box>
        )}

        {endpoint.kind !== 'Web' && (
          <Box
            borderwidth="1"
            borderradius="md"
            padding="4"
            bordercolor="gray"
            backgroundcolor="gray.50"
          >
            <Heading size="5" marginbottom="2">
              Security Information
            </Heading>
            <Text fontSize="md">
              <Badge colorscheme="orange">URL</Badge>: {endpoint.url}
            </Text>
            <Text fontSize="md">
              <Badge colorscheme="orange">Kind</Badge>: {endpoint.kind}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default EndpointDetails
