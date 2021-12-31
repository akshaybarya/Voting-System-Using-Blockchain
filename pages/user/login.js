import dbConnect from "../../lib/dbConnect";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Typography, Grid, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCookies } from "react-cookie";
// import User from "../../models/User";

const Login = () => {
  const router = useRouter();

  const loginFormInitialState = {
    aadharNumber: undefined,
    otp: undefined,
  };
  const [errMsg, setErrMsg] = useState(undefined);
  const [loginForm, setLoginForm] = useState(loginFormInitialState);
  const [OTPSend, setOTPSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  const login = async () => {
    setLoading(true);

    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      setOTPSend(true);
      setCookie("user", res.data);
      setCookie("token", res.token);
      setCookie("isAdmin", false);
      router.push("/user/");
    } else {
      setErrMsg(res.data);
    }
    setLoading(false);
  };

  const requestOTP = async () => {
    setLoading(true);

    const res = await fetch("/api/user/sendOTP", {
      method: "POST",
      body: JSON.stringify(loginForm),
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      setOTPSend(true);
      // router.push("/admin/");
    } else {
      setErrMsg(json.data);
    }
    setLoading(false);
  };

  const styles = {};

  return (
    <Background>
      <Navbar title="E-Voting System - User Panel" />
      <Container maxWidth="xs">
        <Box sx={{ paddingTop: "2rem" }}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, margin: "3rem 0" }}
          >
            Voter Login
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (OTPSend) {
                login();
              } else {
                requestOTP();
              }
            }}
          >
            <Grid container spacing={2} direction="column">
              {errMsg && (
                <Grid item>
                  <Alert severity="error">{errMsg}</Alert>
                </Grid>
              )}
              <Grid item>
                <TextField
                  id=""
                  type="tel"
                  label="Aadhar Number"
                  value={loginForm.aadharNumber}
                  // style={styles.paperContainer}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]{12}",
                  }}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, aadharNumber: e.target.value })
                  }
                  fullWidth={true}
                  disabled={OTPSend || loading}
                  required
                />
              </Grid>
              {OTPSend && (
                <Grid item lg={12} sm={12}>
                  <TextField
                    id=""
                    type="tel"
                    label="OTP"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]{6}",
                    }}
                    value={loginForm.otp}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, otp: e.target.value })
                    }
                    // onBlur={e => }
                    fullWidth={true}
                  />
                </Grid>
              )}
              <Grid item>
                {OTPSend ? (
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    size={"large"}
                    disabled={!loginForm.aadharNumber || !loginForm.otp}
                  >
                    Login
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    size={"large"}
                    disabled={!loginForm.aadharNumber}
                  >
                    Request OTP
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Background>
    // <Layout>
    //   <Segment placeholder>
    //     <Grid columns={2} relaxed="very" stackable>
    //       <Grid.Column>
    //         <h1>Login</h1>
    //       </Grid.Column>

    //       <Grid.Column verticalAlign="middle">
    //         <Form onSubmit={login}>
    //           <Form.Input label="Email" type="email" />
    //           <Form.Input label="Password" type="password" />
    //           <Button primary>Login</Button>
    //         </Form>
    //       </Grid.Column>
    //     </Grid>

    //     <Divider vertical>Or</Divider>
    //   </Segment>
    // </Layout>
  );
};

// export async function getInitialProps() {
//   await dbConnect();
//   return { props: {} };
// }

export default Login;
