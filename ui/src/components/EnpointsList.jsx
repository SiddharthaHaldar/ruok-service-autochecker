import React, { useEffect, useState } from 'react';
import { Flex,Spinner } from '@radix-ui/themes';
import * as Separator from '@radix-ui/react-separator';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import '../index.css';
import Endpoint from './Endpoint';
import { useQuery, gql } from "@apollo/client";
import { ALL_ENDPOINTS_QUERY } from '../GraphQL/query';

function EnpointsList() {
  const [endpoints,setEndpoints] = useState([]);
  const [hide,setHide] = useState([]);
  const { data, loading, error } = useQuery(ALL_ENDPOINTS_QUERY);

  if (loading) return <Spinner/>;
  if (error) return <pre>{error.message}</pre>

  function toggleHide(idx){
    const hideCopy = JSON.parse(JSON.stringify(hide));
    hideCopy[idx] = !hideCopy[idx];
    setHide(hideCopy);
  }

  function renderList(){
    return <ul key="ul" style={{listStyleType:'none',paddingLeft: '0px'}}>
      {data.allEndpoints.map((el,i)=>(
          <section className='endpoint' style={{padding:'7px 0px 0px 0px'}} >
              <section onClick={()=>toggleHide(i)}>
                <Flex width="100%" justify="between" >
                    <Flex justify="center" direction="column">
                      <li key={i}>{el.url}</li>
                    </Flex>
                    <Flex justify="end">
                      <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Flex>
                </Flex>
              </section>
            {hide[i] && <Endpoint url={el.url} kind={el.kind}></Endpoint>}
            <hr style={{margin:'10px 0px'}}></hr>
          </section>
      ))}
    </ul>
  }

  return (
    <div>
      {renderList()}
    </div>
  )
}

export default EnpointsList