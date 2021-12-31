import React, { useState } from "react";
// import { Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import AdminLayout from "../../components/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const Candidates = ({ candidateCount, candidates }) => {
  return (
    <AdminLayout>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Candidates
      </Typography>
      <Divider sx={{ marginBottom: "2rem" }} />
      {candidateCount === 0 && (
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          No candidates registeres yet!
        </Typography>
      )}
      <Grid container spacing={2}>
        {candidates.map((candidate, key) => {
          return (
            <Grid item xs={1} sm={6} md={4} lg={3} xl={2.5} key={key}>
              <Card
                // variant="outlined"
                image="/images/CEO.png"
                header={candidate.name + ` (${candidate.age})`}
                meta={candidate.party}
                description={candidate.qualification}
              >
                <CardHeader title={candidate.name} subheader={candidate.party}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {(candidate.name, " (", candidate.age, ")")}
                  </Typography>
                </CardHeader>
                <CardMedia component="img" image="/images/CEO.png" />
                <CardContent>
                  <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                    Age: {candidate.age}
                  </Typography>
                  <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                    {candidate.qualification}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </AdminLayout>
  );
};

Candidates.getInitialProps = async ({}) => {
  const candidateCount = await elections.methods.getCandidateCount().call();

  const candidates = await Promise.all(
    Array(parseInt(candidateCount))
      .fill()
      .map((element, index) => {
        return elections.methods.candidates(index).call();
      })
  );

  return {
    candidateCount,
    candidates,
  };
};

export default Candidates;
