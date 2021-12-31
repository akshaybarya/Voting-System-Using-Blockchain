import React, { useState, useEffect } from "react";
// import UserNavbar from "../../components/UserNavbar";
// import { Grid, Card, Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";
import UserLayout from "../../components/UserLayout";
import {
  Alert,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCookies } from "react-cookie";

const VotingArea = ({
  candidates,
  electionStartStatus,
  electionEndStatus,
  voted1,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [voted, setVoted] = useState(voted1);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  useEffect(() => {
    const f = async () => {
      const accounts = await web3.eth.getAccounts();
      if (!voted) {
        let temp = await elections.methods.voted(accounts[0]).call();
        setVoted(temp);
      }

      if (electionStartStatus === true && electionEndStatus === false) {
        if (accounts[0] !== cookies.user.address) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      }
    };
    f();
  }, []);

  const Vote = async (index) => {
    setErrorMessage("");
    setLoading(true);
    if (voted) {
      setErrorMessage("You have Already Voted!");
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts[0] === cookies.user.address) {
          await elections.methods
            .vote(parseInt(index))
            .send({ from: accounts[0] });

          router.push("/user/result");
        } else {
          throw new Error("Please select the account you have registered.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    setLoading(false);
  };

  const tempFxn = async () => {};
  return (
    <UserLayout>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Voting Area
      </Typography>
      <Divider sx={{ marginBottom: "2rem" }} />
      <Grid container spacing={2}>
        {!showAlert && errorMessage.length > 0 && (
          <Grid item md={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
        {showAlert && !voted && (
          <Grid item md={12}>
            <Alert severity="error">
              Please select your Metamask account and refresh the page!
            </Alert>
          </Grid>
        )}
        <Grid item>
          {/* <Grid.Column> */}
          {electionStartStatus && electionEndStatus && (
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Election Over
            </Typography>
          )}
          {!electionEndStatus && voted && <h3>You Have Alradey Voted !!</h3>}
          {!electionStartStatus && !electionEndStatus && (
            <>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Voting is Not started yet
              </Typography>
              <br />
            </>
          )}
          <Grid container spacing={2}>
            {candidates.map((candidate, key) => {
              return (
                <Grid item xs={1} sm={6} md={4} lg={4} xl={2.5} key={key}>
                  <Card key={key}>
                    <CardHeader
                      title={candidate.name}
                      subheader={candidate.party}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        {(candidate.name, " (", candidate.age, ")")}
                      </Typography>
                    </CardHeader>
                    <CardMedia component="img" image="/images/CEO.png" />
                    <CardActions>
                      {electionStartStatus &&
                      !electionEndStatus &&
                      !voted &&
                      !showAlert ? (
                        <LoadingButton
                          onClick={(e) => {
                            e.preventDefault();
                            Vote(key);
                          }}
                          fullWidth={true}
                          variant="contained"
                          loading={loading}
                        >
                          Vote
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          onClick={(e) => {
                            e.preventDefault();
                            Vote(key);
                          }}
                          // color="green"
                          fullWidth={true}
                          variant="contained"
                          disabled
                          loading={loading}
                        >
                          Vote
                        </LoadingButton>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* </Grid.Column> */}
        </Grid>
      </Grid>
    </UserLayout>
  );
};

VotingArea.getInitialProps = async () => {
  const candidateCount = await elections.methods.getCandidateCount().call();

  const candidates = await Promise.all(
    Array(parseInt(candidateCount))
      .fill()
      .map((element, index) => {
        return elections.methods.candidates(index).call();
      })
  );

  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  const accounts = await web3.eth.getAccounts();

  const voted = await elections.methods.voted(accounts[0]).call();

  return {
    candidateCount,
    candidates,
    electionStartStatus,
    electionEndStatus,
    voted,
  };
};

export default VotingArea;
