import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AppShell,
  Navbar,
  Text,
  Burger,
  useMantineTheme,
  Group,
  NavLink,
} from "@mantine/core";

import { MainPagesType } from "./page/Configuration";
import {
  Icon360,
  IconArrowBadgeLeft,
  IconArrowBadgeRight,
  IconHeart,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Sidebar(props) {
  const pages: MainPagesType = props.pages;
  const router = useRouter();
  const [open, setOpen] = useState(true);

  // const router = useRouter();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar width={{ base: 250 }} hidden={open}>
          <Navbar.Section>
            <Group>
              <IconArrowBadgeLeft
                size={"4rem"}
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              />
              <IconArrowBadgeRight
                size={"4rem"}
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              />
            </Group>
          </Navbar.Section>
          <Navbar.Section>
            {pages.map((value, index) => (
              <Link key={value.name} href={value.location}>
                <NavLink
                  active={router.pathname === value.location}
                  key={value.name}
                  label={value.name}
                  icon={<value.icon size="1.5rem" />}
                  styles={(theme) => ({
                    root: {
                      // ":hover":{
                      //     backgroundColor:theme.colors.mint_green[0],
                      //     color:theme.colors.mint_green[6]
                      // },
                      transitionProperty: "background-color",
                      transitionTimingFunction: "ease-in-out",
                      transitionDuration: "100ms",
                      padding: "1rem",
                      // "::selection":{
                      //     borderRightColor:theme.colors.green[7],
                      //     borderRightWidth: "0.2rem",
                      //     borderRightStyle:"solid"
                      // }
                    },
                  })}
                  color="mint_green"
                  // onClick={() => setActive(value.location)}
                />
              </Link>
            ))}
          </Navbar.Section>
        </Navbar>
      }
    >
      {props.children}
    </AppShell>
  );
}
