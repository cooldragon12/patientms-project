import React, {useEffect, useState} from 'react';
import type { AppProps } from 'next/app';
import {MantineProvider} from '@mantine/core';
import { MainPages } from '../components/page/Configuration';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Sidebar from '../components/Sidebar';
import { RouterTransition } from '../components/RouteTransition';
import { useRouter } from 'next/router';
import { OperationProvider } from '../@context/operation';
import {queryClient} from '../server'
// const SideBar = React.lazy(()=> import )
function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  // useEffect(()=>{
  //   router.events.on("")
  // })
  return (
    <MantineProvider
      withGlobalStyles
      theme={{
        
        colorScheme:"light",
        colors:{
          "mint_green":["#e4fbfb",'#ddffff',"#c4deda","#9dd4d2","#4da59b","#4da4a5","#3eb6b8","#59c7ca","#43bcc7", "#30c3b2"]
        },
        primaryColor:"mint_green",
        black:"#495059",
        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },
        loader:'dots',
        
        
      }}
    >
      <QueryClientProvider client={queryClient}>
        <OperationProvider>
      
          <RouterTransition/>
          <Sidebar pages={MainPages}>
            <Component {...pageProps} />
          </Sidebar>
      
        </OperationProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
// How to create loading screen while loading the other resources in nextjs?

export default MyApp