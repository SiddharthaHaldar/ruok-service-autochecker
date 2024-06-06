import React from 'react';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { Flex,Spinner } from '@radix-ui/themes';
import {
  Tabs,
  Box,
  Text,
  Button
} from '@radix-ui/themes';
import { FETCH_GITHUB_URL_QUERY,FETCH_WEB_URL_QUERY,FETCH_RELATED_ENDPOINTS_QUERY } from '../GraphQL/query';
import { Plural, Trans } from '@lingui/macro'

const Endpoint = forwardRef(
  function Endpoint({url,kind,openEndpoint,endpointsMap,allEndpoints},ref) {
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

  useImperativeHandle(ref, () => {
    return {
      reftechEndpoint() {
        endpoint.refetch();
      },
      refecthRelatedEndpoints() {
        related_endpoints.refetch();
      },
    };
  }, []);

  if (endpoint.networkStatus === NetworkStatus.refetch) return <Spinner/>;
  if (endpoint.loading) return <Spinner/>;
  if (endpoint.error) return <pre>{error.message}</pre>

  if (related_endpoints.networkStatus === NetworkStatus.refetch) return <Spinner/>;
  if (related_endpoints.loading) return <Spinner/>;
  if (related_endpoints.error) return <pre>{error.message}</pre>

  function attachKindandOpenEndpoint(endpoint){
    // console.log(endpoint,allEndpoints,endpointsMap)
    let endpointCopy = JSON.parse(JSON.stringify(endpoint));
    endpointCopy.kind = allEndpoints[endpointsMap.current[endpointCopy.url]].kind;
    openEndpoint(endpointCopy);
  }

  function renderRelatedEndpoints(){
    return <ul key="ul" style={{listStyleType:'none',paddingLeft: '0px'}}>
      {related_endpoints.data.endpoints.map((el,i)=>(
            <section className='endpoint' onClick={()=>attachKindandOpenEndpoint(el)}  >
                <section > 
                  <Flex width="100%" justify="between" >
                      <Flex justify="center" direction="column">
                        <li key={i} className='endpointText'>{el.url}</li>
                      </Flex>
                      <Flex justify="end">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </Flex>
                  </Flex>
                </section>
              <hr style={{margin:'10px 0px'}}></hr>
            </section>
        ))}
      </ul>
  }

  return (
    <>
        <section>
            <Text size="7" as="p">{Object.values(endpoint.data)[0].url}</Text>
            {JSON.stringify(endpoint.data)}
            <br></br>
            <br></br>
            <h3><Trans>Related Endpoints</Trans> :</h3>
            {renderRelatedEndpoints()}
        </section>
    </>
  )
});

export default Endpoint