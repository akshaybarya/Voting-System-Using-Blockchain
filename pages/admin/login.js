import React, { useState } from "react";
import { useRouter } from "next/router";
import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Typography, Grid, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCookies } from "react-cookie";

const Login = () => {
  const router = useRouter();

  const [errMsg, setErrMsg] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const loginFormInitialState = {
    username: undefined,
    password: undefined,
  };

  const [loginForm, setLoginForm] = useState(loginFormInitialState);

  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      setCookie("user", undefined);
      setCookie("token", undefined);
      setCookie("isAdmin", true);
      router.push("/admin/");
    } else {
      setErrMsg(json.data);
    }
    // const { data, error } = useSWR('/api/user', fetcher)
    // console.log(loginForm.username, process.env);
    // console.log(loginForm.password, process.env.ADMIN_PASSWORD);
    // if (
    //   loginForm.username === process.env.ADMIN_USERNAME &&
    //   loginForm.password === process.env.ADMIN_PASSWORD
    // ) {
    //   router.push("/admin/");
    // } else {
    //   setErr("Wrong Username or Password");
    // }

    // console.log("Login");
    setLoading(false);
  };
  return (
    <Background>
      <Navbar title="E-Voting System - Admin Panel" />
      <Container maxWidth="xs">
        <Box sx={{ paddingTop: "2rem" }}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, margin: "3rem 0" }}
          >
            Admin Login
          </Typography>
          <form onSubmit={loginAdmin}>
            <Grid container spacing={2} direction="column">
              {errMsg && (
                <Grid item>
                  <Alert severity="error">{errMsg}</Alert>
                </Grid>
              )}
              <Grid item>
                <TextField
                  id=""
                  label="Username"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  onFocus={(e) => setErrMsg(undefined)}
                  fullWidth={true}
                />
              </Grid>
              <Grid item lg={12} sm={12}>
                <TextField
                  id=""
                  type="password"
                  label="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  onFocus={(e) => setErrMsg(undefined)}
                  // onBlur={e => }
                  fullWidth={true}
                />
              </Grid>
              <Grid item>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth={true}
                  size={"large"}
                  loading={loading}
                  disabled={!loginForm.username || !loginForm.password}
                >
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Background>
  );
};

export default Login;
