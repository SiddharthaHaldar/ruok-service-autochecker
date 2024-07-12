import React, { useEffect, useState, useRef } from 'react';
import { Flex,Spinner } from '@radix-ui/themes';
import * as Separator from '@radix-ui/react-separator';
import {  ChevronDownIcon, 
          ReloadIcon, 
          UpdateIcon, 
          DoubleArrowRightIcon,
          ThickArrowLeftIcon,
          ThickArrowRightIcon } from '@radix-ui/react-icons';
import '../index.css';
import Endpoint from './Endpoint';
import Controls from './Controls.jsx';
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { ALL_ENDPOINTS_QUERY } from '../GraphQL/queries';
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
  const endpointRef = useRef();
  const controlsRef = useRef();
  const [hide,setHide] = useState([]);
  const [showAllEndpointsFlag,setShowAllEndpointsFlag] = useState(true);
  const [activeEndpoint,setActiveEndpoint] = useState({});
  const { data, loading, error, refetch, networkStatus } = useQuery(
    ALL_ENDPOINTS_QUERY,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <Spinner/>;
  if (loading) return <Spinner/>;
  if (error) return <pre>{error.message}</pre>

  function openEndpoint(endpoint){
    const {showAllEndpointsButtonRef,
           refreshRef,
           stack,
           stackPtr
          } = controlsRef.current;

    showAllEndpointsButtonRef.current.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
    refreshRef.current.style.display = "block";
    if(endpoint.url !== stack.current[stackPtr.current]){
      stackPtr.current += 1;
      if(endpoint.url !== stack.current[stackPtr.current]){
        stack.current.length = (stackPtr.current);
        stack.current.push(endpoint.url);
      }
    }
    setShowAllEndpointsFlag(false);
    setActiveEndpoint(endpoint);
  }

  function renderList(){
    if(showAllEndpointsFlag){
      data.allEndpoints.forEach((endpoint,idx) => {
        endpointsMap.current[endpoint.url] = idx;
      });
      return <ul key="ul" style={{listStyleType:'none',paddingLeft: '0px'}}>
        {data.allEndpoints.map((el,i)=>(
            <section className='endpoint' onClick={()=>openEndpoint(el)} style={{padding:'7px 0px 0px 0px'}} >
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
              {hide[i] && <Endpoint url={el.url} kind={el.kind}></Endpoint>}
              <hr style={{margin:'10px 0px'}}></hr>
            </section>
        ))}
      </ul>
    }
  }

  return (
    <div>
        <Controls data={data} 
                  endpointsMap={endpointsMap}
                  endpointRef={endpointRef} 
                  refetch={refetch} 
                  setActiveEndpoint={setActiveEndpoint}
                  setShowAllEndpointsFlag={setShowAllEndpointsFlag}
                  ref={controlsRef}></Controls>
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