import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Flex,Spinner } from '@radix-ui/themes';
import {
  Tabs,
  Box,
  Text,
  Button
} from '@radix-ui/themes';
import {  ChevronDownIcon, 
          ReloadIcon, 
          UpdateIcon, 
          DoubleArrowRightIcon,
          ThickArrowLeftIcon,
          ThickArrowRightIcon } from '@radix-ui/react-icons';
import { Plural, Trans } from '@lingui/macro'

const Controls = 
forwardRef(function Controls({ data,
                                endpointsMap,
                                endpointRef,
                                refetch,
                                setActiveEndpoint,
                                setShowAllEndpointsFlag,},ref) {

    const showAllEndpointsButtonRef = useRef("Scanned Endpoints");
    const nextEndpointRef = useRef();
    const previousEndpointRef = useRef();
    const refreshRef = useRef();
    const stack = useRef([]);
    const stackPtr = useRef(-1);

    useImperativeHandle(ref, () => {
        return {
            showAllEndpointsButtonRef : showAllEndpointsButtonRef,
            refreshRef : refreshRef,
            stack : stack,
            stackPtr : stackPtr
        };
    }, []);

    function showAllEndpoints(){
        refreshRef.current.style.display = "none";
        showAllEndpointsButtonRef.current.innerText = 'Scanned Endpoints';
        stack.current = [];
        stackPtr.current = -1;
        refetch();
        setShowAllEndpointsFlag(true);
        setActiveEndpoint({});
    }

    function refreshEndpoint(){
        endpointRef.current.reftechEndpoint();
        endpointRef.current.refecthRelatedEndpoints();
    }

    function nextEndpoint(){
        stackPtr.current += 1;
        let activeEndpoint = data.allEndpoints[endpointsMap.current[stack.current[stackPtr.current]]];
        setActiveEndpoint(activeEndpoint);
    }

    function previousEndpoint(){
        stackPtr.current -= 1;
        let activeEndpoint = data.allEndpoints[endpointsMap.current[stack.current[stackPtr.current]]];
        setActiveEndpoint(activeEndpoint);
    }

    return (
        <Flex justify="between" align="center" style={{borderBottom:"solid",borderWidth:"1px",borderColor:"#ece2e2",paddingBottom:"10px"}}>
            <Flex justify="start" gap="4">
            <Button size="3" variant="soft" onClick={()=>{showAllEndpoints()}} color="blue" ref={showAllEndpointsButtonRef} style={{}}>
                <Trans>Scanned Endpoints</Trans>
            </Button>
            {(stack.current.length >= 2) && 
            <>
                {(stackPtr.current == 0) &&
                <Button disabled size="3" variant="soft" onClick={()=>{previousEndpoint()}} color="blue" ref={previousEndpointRef}>
                <ThickArrowLeftIcon />
                </Button>}
                {(stackPtr.current > 0) &&
                <Button size="3" variant="soft" onClick={()=>{previousEndpoint()}} color="blue" ref={previousEndpointRef}>
                <ThickArrowLeftIcon />
                </Button>}
                {(stackPtr.current == (stack.current.length - 1)) &&
                <Button disabled size="3" variant="soft" onClick={()=>{nextEndpoint()}} color="blue" ref={nextEndpointRef}>
                <ThickArrowRightIcon />
                </Button>}
                {(stackPtr.current < stack.current.length - 1) &&
                <Button size="3" variant="soft" onClick={()=>{nextEndpoint()}} color="blue" ref={nextEndpointRef}>
                <ThickArrowRightIcon />
                </Button>}
            </>
            }
            </Flex>
            <Flex justify="end">
            <Button size="3" variant="soft" onClick={()=>{refreshEndpoint();}} color="green" style={{display:"none"}} ref={refreshRef}>
                <Trans>Refresh  </Trans> <UpdateIcon />
            </Button>
            </Flex>
        </Flex>
    )
});

export default Controls