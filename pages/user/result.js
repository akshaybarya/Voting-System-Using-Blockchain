import React from "react";
import elections from "../../ethereum/elections";
import UserLayout from "../../components/UserLayout";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const Result = ({
  electionStartStatus,
  electionEndStatus,
  winner,
  electionFailed,
  votedCount,
}) => {
  return (
    <UserLayout>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Results
      </Typography>
      <Divider sx={{ marginBottom: "2rem" }} />
      <Grid container spacing={2}>
        <Grid item>
          {!electionStartStatus && <h3>Go Register Yourself</h3>}
          {electionStartStatus && !electionEndStatus && (
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Voting Phase is On
            </Typography>
          )}
          {electionStartStatus && electionEndStatus && !winner && (
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Results Not Declared Yet!
            </Typography>
          )}
          {electionStartStatus &&
            electionEndStatus &&
            winner &&
            !electionFailed && (
              <Grid container spacing={2}>
                <Grid item xl={12} sm={12}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Congratulations!
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Card
                  // variant="outlined"
                  >
                    <CardHeader title={winner.name} subheader={winner.party}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        {winner.name}
                      </Typography>
                    </CardHeader>
                    <CardMedia component="img" image="/images/CEO.png" />
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        Vote Count: {winner.voteCount} / {votedCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                {/* <Card
                image="/images/CEO.png"
                header={winner.name}
                meta={winner.party}
              /> */}
              </Grid>
            )}
          {electionStartStatus &&
            electionEndStatus &&
            winner &&
            electionFailed && (
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                No Result Possible!
              </Typography>
            )}
        </Grid>
      </Grid>
    </UserLayout>
  );
};

Result.getInitialProps = async () => {
  const electionStartStatus = await elections.methods.start().call();

  const electionEndStatus = await elections.methods.end().call();

  let winner;
  if (electionStartStatus && electionEndStatus) {
    const index = await elections.methods.winner().call();

    const winnerPicked = await elections.methods.winnerPicked().call();

    if (winnerPicked) winner = await elections.methods.candidates(index).call();
  }
  const electionFailed = await elections.methods.electionFailed().call();

  const votedCount = await elections.methods.votedCount().call();

  return {
    electionStartStatus,
    electionEndStatus,
    winner,
    electionFailed,
    votedCount,
  };
};

export default Result;
