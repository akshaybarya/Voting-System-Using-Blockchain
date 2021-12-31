import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import web3 from "../../ethereum/web3";
import elections from "../../ethereum/elections";
import { useRouter } from "next/router";
import { Typography, TextField, Grid, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { AddRounded } from "@mui/icons-material";

const AddCandidate = () => {
  const minAge = 25;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(undefined);
  const [party, setParty] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [qualification, setQualification] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const formValidate = () => {
    if (age < minAge) {
      return false;
    }

    return true;
  };

  const candidateRegistration = async () => {
    setLoading(true);
    if (formValidate()) {
      console.log(loading);
      setErrorMessage("");
      try {
        const accounts = await web3.eth.getAccounts();

        await elections.methods
          .candidateRegistration(name, party, qualification, parseInt(age))
          .send({ from: accounts[0] });

        router.push("/admin/candidates");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    setLoading(false);
    // console.log(loading);
  };

  return (
    <AdminLayout>
      <Typography
        align="center"
        variant="h4"
        component="h4"
        sx={{ flexGrow: 1 }}
        // gutterBottom={true}
      >
        Candidate Details
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          !loading && candidateRegistration();
        }}
        // noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TextField
              // id=""
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth={true}
              disabled={loading}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              // id=""
              label="Party"
              value={party}
              onChange={(e) => {
                setParty(e.target.value);
              }}
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              // id=""
              label="Age"
              type="number"
              value={age}
              onChange={(e) => {
                setAge(+e.target.value);
              }}
              fullWidth={true}
              helperText={"Age should be above 25"}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              // id=""
              label="Qualification"
              value={qualification}
              onChange={(e) => {
                setQualification(e.target.value);
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <LoadingButton
              disabled={!name || !party || !age || age < minAge}
              loading={loading}
              loadingPosition="start"
              startIcon={<AddRounded />}
              variant="contained"
              type="submit"
              size="large"
            >
              Add Candidate
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
      {/* <h1>Candidate Details</h1>
      <Form loading={loading} onSubmit={candidateRegistration}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Form.Input
                label="Party"
                value={party}
                onChange={(e) => {
                  setParty(e.target.value);
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Age"
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <Form.Input
                label="Qualification"
                value={qualification}
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Message error header="Oops!" content={errorMessage} />
              <Button primary>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form> */}
    </AdminLayout>
  );
};

export default AddCandidate;
