import { Fragment, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ChangePhase = ({
  electionStartStatus,
  electionEndStatus,
  winnerPicked,
  winner,
  electionFailed,
  votedCount,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const declareWinner = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.electionResults().send({ from: accounts[0] });

      /* Code to clean the database link */

      const res = await fetch("/api/admin/deleteLink", {
        method: "DELETE",
      });
      const json = await res.json();
      console.log(json);

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  const changeRegistrationPhase = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.startElection().send({ from: accounts[0] });

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  const changeVotingPhase = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await elections.methods.endElection().send({ from: accounts[0] });

      router.replace("/admin/change-phase");
    } catch (error) {
      setErrorMessage(error);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Change Phase
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
      <Grid container spacing={3}>
        {!electionStartStatus && (
          <>
            <Grid item lg={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
                gutterBottom={true}
              >
                Registeration Phase On
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <LoadingButton
                onClick={changeRegistrationPhase}
                loading={loading}
                primary
                variant="contained"
                size="large"
                fullWidth={true}
              >
                Change Phase
              </LoadingButton>
            </Grid>
          </>
        )}
        {electionStartStatus && !electionEndStatus && (
          <>
            <Grid item lg={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
                gutterBottom={true}
              >
                Voting Phase On
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <LoadingButton
                onClick={changeVotingPhase}
                loading={loading}
                primary
                variant="contained"
                fullWidth={true}
                size="large"
              >
                Change Phase
              </LoadingButton>
            </Grid>
          </>
        )}
        {electionStartStatus && electionEndStatus && !winnerPicked && (
          <>
            <Grid item lg={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
                gutterBottom={true}
              >
                Declare Results!
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <LoadingButton
                onClick={declareWinner}
                loading={loading}
                primary
                variant="contained"
                fullWidth={true}
                size="large"
              >
                Get Winner
              </LoadingButton>
            </Grid>
          </>
        )}
        {electionStartStatus && electionEndStatus && winnerPicked && (
          <Grid item lg={3}>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              gutterBottom={true}
            >
              Elections Over!
            </Typography>
            {electionFailed || votedCount == 0 ? (
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Election Failed!
              </Typography>
            ) : (
              <Card
              // variant="outlined"
              // image="/images/CEO.png"
              // header={winner.name}
              // meta={winner.party}
              // description={winner.qualification}
              >
                <CardHeader title={winner.name} subheader={winner.party}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {winner.name}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Vote Count: {winner.voteCount} / {votedCount}
                  </Typography>
                </CardContent>
                <CardMedia component="img" image="/images/CEO.png" />
              </Card>
            )}
          </Grid>
        )}
      </Grid>

      {
        errorMessage.length > 0 && (
          <Alert severity="error">{errorMessage}</Alert>
        )
        /* <Message error header="Oops!" content={errorMessage} /> */
      }
    </AdminLayout>
  );
};

ChangePhase.getInitialProps = async () => {
  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  const winnerPicked = await elections.methods.winnerPicked().call();

  let winner;

  const index = await elections.methods.winner().call();

  if (winnerPicked) winner = await elections.methods.candidates(index).call();

  const electionFailed = await elections.methods.electionFailed().call();

  const votedCount = await elections.methods.votedCount().call();

  return {
    electionStartStatus,
    electionEndStatus,
    winnerPicked,
    winner,
    electionFailed,
    votedCount,
  };
};

export default ChangePhase;
