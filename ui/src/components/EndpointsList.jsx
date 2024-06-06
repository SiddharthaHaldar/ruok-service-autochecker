import React, { useEffect, useState, useRef } from 'react';
import { Flex,Spinner } from '@radix-ui/themes';
import * as Separator from '@radix-ui/react-separator';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import '../index.css';
import Endpoint from './Endpoint';
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { ALL_ENDPOINTS_QUERY } from '../GraphQL/query';
import {
  Tabs,
  Box,
  Text,
  Button
} from '@radix-ui/themes';
import LocaleSwitcher from './LocaleSwitcher.js'
import { Plural, Trans } from '@lingui/macro'

function EnpointsList() {
  const endpointsMap = useRef({});
  const showAllEndpointsButtonRef = useRef("Scanned Endpoints");
  const refreshRef = useRef();
  const endpointRef = useRef();
  const [hide,setHide] = useState([]);
  const [showep,setShowep] = useState(true);
  const [activeEndpoint,setActiveEndpoint] = useState({});
  const [stack,setStack] = useState([])
  const { data, loading, error, refetch, networkStatus } = useQuery(
    ALL_ENDPOINTS_QUERY,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <Spinner/>;
  if (loading) return <Spinner/>;
  if (error) return <pre>{error.message}</pre>


  function showAllEndpoints(){
    refreshRef.current.style.display = "none";
    showAllEndpointsButtonRef.current.innerText = 'Scanned Endpoints';
    refetch();
    setShowep(true);
    setActiveEndpoint({});
  }

  function toggleHide(idx){
    const hideCopy = JSON.parse(JSON.stringify(hide));
    hideCopy[idx] = !hideCopy[idx];
    setHide(hideCopy);
  }

  function openEndpoint(endpoint){
    showAllEndpointsButtonRef.current.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
    refreshRef.current.style.display = "block";
    setShowep(false);
    setActiveEndpoint(endpoint);
  }

  function refreshEndpoint(){
    console.log(endpointRef.current)
    endpointRef.current.reftechEndpoint();
    endpointRef.current.refecthRelatedEndpoints();
  }

  function renderList(){
    if(showep){
      data.allEndpoints.forEach((endpoint,idx) => {
        endpointsMap.current[endpoint.url] = idx;
      });
      console.log(endpointsMap)
      return <ul key="ul" style={{listStyleType:'none',paddingLeft: '0px'}}>
        {data.allEndpoints.map((el,i)=>(
            <section className='endpoint' onClick={()=>openEndpoint(el)} style={{padding:'7px 0px 0px 0px'}} >
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
              {hide[i] && <Endpoint url={el.url} kind={el.kind}></Endpoint>}
              <hr style={{margin:'10px 0px'}}></hr>
            </section>
        ))}
      </ul>
    }
  }

  return (
    <div>
        <Flex justify="between" align="center" style={{borderBottom:"solid",borderWidth:"1px",borderColor:"#ece2e2",paddingBottom:"10px"}}>
          <Flex justify="start" gap="4">
            <Button size="3" variant="ghost" onClick={()=>{showAllEndpoints()}} color="gray" ref={showAllEndpointsButtonRef}>
              <Trans>Scanned Endpoints</Trans>
            </Button>
          </Flex>
          <Flex justify="end">
            <Button size="2" variant="ghost" onClick={()=>{refreshEndpoint();}} color="gray" style={{display:"none"}} ref={refreshRef}>
              <Trans>Refresh</Trans>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Button>
          </Flex>
        </Flex>
        {
          renderList()
        }
        {
          (Object.entries(activeEndpoint).length > 0) && 
          <Endpoint url={activeEndpoint.url} kind={activeEndpoint.kind} 
                    openEndpoint={openEndpoint} endpointsMap={endpointsMap}
                    allEndpoints={data.allEndpoints}
                    ref={endpointRef}></Endpoint> 
        }
    </div>
  )
}

export default EnpointsList