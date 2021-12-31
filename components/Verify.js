import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Background from "./Background";

const verify = ({
  setOtpVerification,
  setVerifyRendering,
  aadharNumber,
  registeringUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Verify Otp with Server
    /* 
      const res = await axios.post('')

      if(res){
        setOtpVerification(true);    
      }else{
        setOtpVerification(false);
      }
    */
    setOtpVerification(true);
    setVerifyRendering(false);
  };
  return (
    // <Background>
    //   <Typography
    //     align="center"
    //     variant="h4"
    //     component="div"
    //     sx={{ flexGrow: 1, margin: "3rem 0" }}
    //   >
    //     Enter Otp Sent to your Registered Email Address
    //   </Typography>
    //   <form onSubmit={verifyOtp}>
    //     <Grid contained spacing={2}>
    //       <Grid item>
    //         <TextField value={otp} onChange={(e) => setOtp(e.target.value)} />
    //       </Grid>
    //       <Grid item>
    //         <LoadingButton
    //           loading={loading}
    //           type="submit"
    //           variant="contained"
    //         />
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Background>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>OTP Authentication</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        <TextField
          autoFocus
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {/* <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton onClick={handleClose}>Submit</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default verify;
