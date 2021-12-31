import { ThemeProvider } from "@emotion/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import Layout from "./Layout";
import theme from "../css/admintheme";
import { useCookies } from "react-cookie";
import HomeIcon from "@mui/icons-material/Home";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";

const AdminLayout = (props) => {
  const router = useRouter();
  const adminRoutes = [
    ["Home", "/admin", <FormatListBulletedIcon />],
    ["Add Candidate", "/admin/add-candidate", <PersonAddIcon />],
    ["Candidate List", "/admin/candidates", <GroupIcon />],
    ["Change Phase", "/admin/change-phase", <PublishedWithChangesIcon />],
    // ["Logout", "/logout"],
  ];
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  useEffect(() => {
    if (!cookies.isAdmin) {
      router.push("/");
    }
    return () => {};
  }, []);

  const adminBtns = [
    [
      "Logout",
      () => {
        setCookie("user", undefined);
        setCookie("token", undefined);
        setCookie("isAdmin", undefined);
        removeCookie("isAdmin");
        removeCookie("user");
        removeCookie("token");
        router.push("/admin/login");
      },
    ],
  ];

  return (
    <ThemeProvider theme={theme}>
      <Layout
        title={"E-Voting System - Admin Panel"}
        sidebarKeys={adminRoutes}
        sidebarBtns={adminBtns}
      >
        {props.children}
      </Layout>
    </ThemeProvider>
  );
};

export default AdminLayout;
