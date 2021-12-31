import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import UserLayout from "../../components/UserLayout";
import { Alert, Divider, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCookies } from "react-cookie";

const Registration = ({ electionStartStatus, electionEndStatus }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerification, setOtpVerification] = useState();
  const [verifyRendering, setVerifyRendering] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState(undefined);

  // useEffect(() => {
  //   if (otpVerification) {
  //     registeringUser();
  //     setLoading(false);
  //     setOtpVerification(false);
  //   }
  // }, [otpVerification]);

  const otp_verification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerifyRendering(true);
    setErrorMessage("");
  };
  // TODO:  DO SOMETHING ABOUT VERIFY BLOCK
  // if (verifyRendering) {
  //   return (
  //     <Verify
  //       setOtpVerification={setOtpVerification}
  //       setVerifyRendering={setVerifyRendering}
  //       aadharNumber={aadhar}
  //     />
  //   );
  // } else {

  const register = async () => {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods
        .voterRegistration(web3.utils.toChecksumAddress(address))
        .send({ from: accounts[0] });

      // registeringUser();
      const res = await fetch("/api/user/registerAddress", {
        method: "POST",
        body: JSON.stringify({
          aadharNumber: cookies.user && cookies.user.aadharNumber,
          address,
          otp,
        }),
      });
      const json = await res.json();
      console.log(json);
      if (json.success) {
        setCookie("user", { ...cookies.user, address: json.data.address });
        router.push("/user/");
      } else {
        setErrMsg(json.data);
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Address Not Registered. \n");
      setOtpSend(false);
      setOtp(undefined);
    }
    setLoading(false);
  };
  /*
  const requestOTP = async () => {
    setLoading(true);

    const res = await fetch("/api/user/sendOTP", {
      method: "POST",
      body: JSON.stringify({
        aadharNumber: cookies.user && cookies.user.aadharNumber,
      }),
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      setOtpSend(true);
      // router.push("/admin/");
    } else {
      setErrMsg(json.data);
    }
    setLoading(false);
  };
*/
  return (
    <UserLayout>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Voter Registration
      </Typography>
      <Divider sx={{ marginBottom: "2rem" }} />
      {cookies.user && cookies.user["address"] ? (
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Voter already Registered
        </Typography>
      ) : electionStartStatus == true ? (
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Election Already Started !
        </Typography>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            register();
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
                label="Account Address"
                value={address}
                // style={styles.paperContainer}
                // inputProps={{
                //   inputMode: "numeric",
                //   pattern: "[0-9]{12}",
                // }}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth={true}
                disabled={otpSend || loading}
                required
              />
            </Grid>

            <Grid item>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                fullWidth={true}
                size={"large"}
                disabled={!address}
              >
                {"Register"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
      <Grid container>
        <Grid item>
          {/* <Grid.Column>
              <h1>Voter Registration</h1>
              <Form loading={loading} onSubmit={OTP_VERIFICATION}>
                <Form.Input
                  label="Aadhar Number"
                  placeholder="Enter your Aadhar Number"
                  value={aadhar}
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                />
                <Form.Input
                  label="Account Address"
                  placeholder="Ehereum Account"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />

                <Message error header="Oops!" content={errorMessage} />

                <Button primary>Submit</Button>
              </Form>
            </Grid.Column> */}
        </Grid>
      </Grid>
    </UserLayout>
  );
  // }
};

Registration.getInitialProps = async () => {
  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  return {
    electionStartStatus,
    electionEndStatus,
  };
};

export default Registration;
