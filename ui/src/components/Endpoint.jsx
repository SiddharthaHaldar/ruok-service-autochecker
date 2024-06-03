import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { Flex,Spinner } from '@radix-ui/themes';
import { FETCH_GITHUB_URL_QUERY,FETCH_WEB_URL_QUERY,FETCH_RELATED_ENDPOINTS_QUERY } from '../GraphQL/query';

function Endpoint({url,kind}) {
  const query = kind == "Web" ? FETCH_WEB_URL_QUERY : FETCH_GITHUB_URL_QUERY
  const endpoint = useQuery(query,
                            {
                                variables : { url },
                                fetchPolicy : "network-only"
                            });


  const related_endpoints = useQuery(FETCH_RELATED_ENDPOINTS_QUERY,
                            {
                                variables : { url },
                                fetchPolicy : "network-only"
                            });

  if (endpoint.loading) return <Spinner/>;
  if (endpoint.error) return <pre>{error.message}</pre>
  if (related_endpoints.loading) return <Spinner/>;
  if (related_endpoints.error) return <pre>{error.message}</pre>

  return (
    <>
        <section>
            {JSON.stringify(endpoint.data)}
            <br></br>
            <br></br>
            {JSON.stringify(related_endpoints.data)}
        </section>
    </>
  )
}

export default Endpoint