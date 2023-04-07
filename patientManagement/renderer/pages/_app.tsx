import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { MainPages } from "../components/page/Configuration";

import Sidebar from "../components/Sidebar";
import { RouterTransition } from "../components/RouteTransition";
import { useRouter } from "next/router";
import { OperationProvider } from "../@context/operation";
import { PatientsProvider } from "../@context/patient";
import { Notifications } from '@mantine/notifications';
// import {queryClient} from '../server'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      theme={{
        colorScheme: "light",
        colors: {
          mint_green: [
            "#e4fbfb",
            "#ddffff",
            "#c4deda",
            "#9dd4d2",
            "#4da59b",
            "#4da4a5",
            "#3eb6b8",
            "#59c7ca",
            "#43bcc7",
            "#30c3b2",
          ],
        },
        primaryColor: "mint_green",
        black: "#495059",
        shadows: {
          md: "1px 1px 3px rgba(0, 0, 0, .25)",
          xl: "5px 5px 3px rgba(0, 0, 0, .25)",
        },
        loader: "dots",
      }}
    >
      <Notifications/>
      <OperationProvider>
        <PatientsProvider>
          <RouterTransition />
          <Sidebar pages={MainPages}>
            <Component {...pageProps} />
          </Sidebar>
        </PatientsProvider>
      </OperationProvider>
    </MantineProvider>
  );
}
// How to create loading screen while loading the other resources in nextjs?

export default MyApp;
