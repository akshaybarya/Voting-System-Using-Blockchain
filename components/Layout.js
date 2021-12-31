import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "@mui/material/Container";
import Background from "./Background";
import Navbar from "./Navbar";
import { Box } from "@mui/system";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { MailIcon, InboxIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
// import { Container } from "semantic-ui-react";

const Layout = (props, href) => {
  const drawerWidth = 240;

  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    return () => {};
  }, []);

  return (
    <Background>
      <Navbar title={props.title} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {props.sidebarKeys &&
              props.sidebarKeys.map((listItem) => (
                <Link href={listItem[1]}>
                  <ListItem
                    button
                    key={listItem[0]}
                    selected={router.pathname === listItem[1]}
                  >
                    <ListItemIcon>{listItem[2]}</ListItemIcon>
                    <ListItemText primary={listItem[0]} />
                  </ListItem>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
            {props.sidebarBtns &&
              props.sidebarBtns.map((listItem) => (
                <ListItem
                  button
                  key={listItem[0]}
                  selected={router.pathname === listItem[1]}
                  onClick={(e) => {
                    e.preventDefault();
                    listItem[1]();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={listItem[0]} />
                </ListItem>
              ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, marginLeft: `${drawerWidth}px` }}
      >
        <Toolbar />
        <Container maxWidth="lg">{props.children}</Container>
      </Box>
    </Background>
  );
};

export default Layout;
