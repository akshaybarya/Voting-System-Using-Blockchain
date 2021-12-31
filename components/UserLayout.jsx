import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "./Layout";
import { useCookies } from "react-cookie";
import HomeIcon from "@mui/icons-material/Home";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const UserLayout = (props) => {
  const router = useRouter();
  const userRoutes = [
    ["Information", "/user", <FormatListBulletedIcon />],
    ["Voter Registration", "/user/registration", <CheckBoxIcon />],
    ["Voting Area", "/user/voting-area", <MoveToInboxIcon />],
    ["Result", "/user/result", <EmojiEventsIcon />],
  ];
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  useEffect(() => {
    if (!cookies.isAdmin && cookies.token) {
      router.push("/");
    }
    return () => {};
  }, []);

  const userBtns = [
    [
      "Logout",
      () => {
        setCookie("user", undefined);
        setCookie("token", undefined);
        setCookie("isAdmin", undefined);
        removeCookie("isAdmin");
        removeCookie("user");
        removeCookie("token");
        router.push("/user/login");
      },
    ],
  ];

  return (
    <Layout
      title={"E-Voting System - User Panel"}
      sidebarKeys={userRoutes}
      sidebarBtns={userBtns}
    >
      {props.children}
    </Layout>
  );
};

export default UserLayout;
