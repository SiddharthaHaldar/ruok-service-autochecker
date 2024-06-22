import React from 'react'
import { PhacSignature } from './PhacSignature'
import {
  Theme,
  Box,
  Section,
  Container,
  Tabs,
  Text,
  Flex,
  Heading
} from '@radix-ui/themes'

import LocaleSwitcher from './LocaleSwitcher.js'
import { Plural, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import EndpointsList from './components/EndpointsList.jsx'

export default function App() {
  console.log(process.env.GRAPHQL_PORT)
  const { i18n } = useLingui()
  return (
    <Flex width="100%" height="100%" direction="column">
      <Flex justify="between">
        <Flex justify="start">
          <PhacSignature language={i18n.locale} />
        </Flex>

        <Flex display="inline" justify="end">
          <LocaleSwitcher />
        </Flex>
      </Flex>

      <Container>
        <br></br>
        <Heading size="8" mb="2" trim="start">
          RUOK <Trans>Dashboard :</Trans>
        </Heading>
        <EndpointsList/>
      </Container>
    </Flex>
  )
}
