// require('dotenv').config();

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import './styles.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages as enMessages } from './locales/en/messages'
import { messages as frMessages } from './locales/fr/messages'
import { Plural, Trans } from '@lingui/macro'
import App from './App'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.GRAPHQL_UI_URI)
const client = new ApolloClient({
  //  uri: `${process.env.GRAPHQL_HOST_UI}:${process.env.GRAPHQL_PORT_UI}/graphql`,
  uri: `${process.env.GRAPHQL_UI_URI}`,
  cache: new InMemoryCache()
});

i18n.load({
  en: enMessages,
  fr: frMessages,
})

i18n.activate('en')

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <I18nProvider i18n={i18n}>
        <Theme>
          <App/>
        </Theme>
      </I18nProvider>
    </React.StrictMode>,
  </ApolloProvider>
)
