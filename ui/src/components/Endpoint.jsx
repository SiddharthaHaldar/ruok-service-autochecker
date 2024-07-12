import React from 'react';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { Flex,Spinner } from '@radix-ui/themes';
import { ChevronDownIcon, ReloadIcon, UpdateIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import {
  Tabs,
  Box,
  Text,
  Button,
  Badge
} from '@radix-ui/themes';
import { FETCH_GITHUB_URL_QUERY,FETCH_WEB_URL_QUERY,FETCH_RELATED_ENDPOINTS_QUERY } from '../GraphQL/queries';
import { Plural, Trans } from '@lingui/macro';
import {AccordionContent,AccordionTrigger} from './Accordian/Accordian.jsx';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

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

  // console.log(endpoint.networkStatus,related_endpoints.networkStatus);
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
    console.log("related endpoints")
    // const na = <Badge color="orange" size="3">N/A</Badge>;
    if(related_endpoints.data.endpoints.length > 1){
    return <ul key="ul" style={{listStyleType:'none',paddingLeft: '0px'}}>
        {related_endpoints.data.endpoints.map((el,i)=>(
              <section className='endpoint' onClick={()=>attachKindandOpenEndpoint(el)}  >
                  <section > 
                    <Flex width="100%" justify="between" >
                        <Flex justify="center" direction="column">
                          <li key={i} className='endpointText'>{el.url}</li>
                        </Flex>
                        <Flex justify="end">
                          <DoubleArrowRightIcon />
                        </Flex>
                    </Flex>
                  </section>
                <hr style={{margin:'10px 0px'}}></hr>
              </section>
          ))}
        </ul>}
      // return na;
  }

  return (
      <>
        <Text size="7" as="p">{Object.values(endpoint.data)[0].url}</Text>
        <section>
            <Accordion.Root className="AccordionRoot" type="multiple"  defaultValue={["item-1","item-2"]}>
              <Accordion.Item className="AccordionItem" value="item-1">
                <AccordionTrigger>
                    <Flex style={{alignItems:"center"}}>
                      <h3 style={{marginBottom:"0px",marginTop:"0px",marginRight:"8px"}}>
                        <Trans>Related Endpoints</Trans> :
                      </h3>
                      {(related_endpoints.data.endpoints.length == 1) &&
                        <Badge color="orange" size="3" variant="soft">N/A</Badge>
                      }
                      {(related_endpoints.data.endpoints.length > 1) &&
                        <Badge color="green" size="3" variant="surface">{related_endpoints.data.endpoints.length}</Badge>
                      }
                    </Flex>
                </AccordionTrigger>
                <AccordionContent>{renderRelatedEndpoints()}</AccordionContent>
              </Accordion.Item>

              <Accordion.Item className="AccordionItem" value="item-2">
                <AccordionTrigger>
                  <Flex style={{alignItems:"center"}}>
                    <h3 style={{margin:"0px"}}>
                      <Trans>Metadata</Trans> :
                    </h3>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  {JSON.stringify(endpoint.data)}
                </AccordionContent>
              </Accordion.Item>
            </Accordion.Root>
        </section>
    </>
  )
});

export default Endpoint