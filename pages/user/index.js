import React from "react";
import UserLayout from "../../components/UserLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";

const index = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);

  return (
    <UserLayout>
      {/* <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        User Manual
      </Typography> */}
      <Divider sx={{ marginBottom: "2rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Accordion expanded>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4">User Detail</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Container>
                <Grid container>
                  <Grid item md={4}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Name
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {cookies.user && cookies.user.name}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Aadhar Number
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {cookies.user &&
                        cookies.user.aadharNumber &&
                        cookies.user.aadharNumber.replace(
                          /(\d{2})\d{8}(\d{2})/,
                          "$1********$2"
                        )}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Phone Number
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {cookies.user &&
                        cookies.user.phoneNumber &&
                        cookies.user.phoneNumber.replace(
                          /(\d{2})\d{5}(\d{3})/,
                          "91-$1*****$2"
                        )}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Email
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography
                      variant="overline"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {cookies.user &&
                        cookies.user.email &&
                        cookies.user.email.replace(
                          /(\w{3})[\w.-]+@([\w.]+\w)/,
                          "$1***@$2"
                        )}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item>
          <Accordion expanded>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4">User Manual</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                There are few guidelines for the user
              </Typography>
              <List dense>
                <ListItem>
                  <Typography variant="h6" component="h6" sx={{}}>
                    1. Voter Registration
                  </Typography>
                </ListItem>
                <List dense>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • For casting the vote user needs to first register
                      himself For this registration purpose, the user will be
                      provided a voter registration form on this website.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • The voter can only register in the registration phase.
                      After the registration phase is over the user can not
                      register and thus will not be able to vote.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • For registration, the user will have to enter the
                      account address which the user will be using for voting
                      purpose.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • At the first stage the user's age will be checked if the
                      user is 18 or above 18 years of age then only he is
                      eligible to vote.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • The second stage is OTP verification. This stage is
                      required to validate the voter itself. After entering the
                      aadhar number and successful age verification.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • After entering correct OTP user will get successfully
                      registered.
                    </Typography>
                  </ListItem>
                </List>
                <ListItem>
                  <Typography variant="h6" component="h6" sx={{}}>
                    2. Voting Process
                  </Typography>
                </ListItem>
                <List dense>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • Overall, voting process is divided into three phases All
                      of which will be initialized and terminated by the min
                      User have to participate in the process according to
                      current phase.
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <List dense>
                      <ListItem>
                        <Typography
                          variant="body1"
                          component="ol"
                          sx={{ flexGrow: 1 }}
                        >
                          <strong>1. Registration Phase:</strong> During this
                          phase the registration of the users (which are going
                          to cast the vote) will be carried out.
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography
                          variant="body1"
                          component="ol"
                          sx={{ flexGrow: 1 }}
                        >
                          <strong>2. Voting Phase:</strong> After initialization
                          of voting phase from the admin, user can cast the vote
                          in voting section. The casting of vote can be simply
                          done by clicking on "VOTE" button, after which
                          transaction will be initiated and after confirming
                          transaction the vote will get successfully casted.
                          After voting phase gets over user will not be able to
                          cast vote.
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography
                          variant="body1"
                          component="ol"
                          sx={{ flexGrow: 1 }}
                        >
                          <strong>3. Result Phase: </strong> This is the final
                          stage of whole voting process during which the results
                          of election will be displayed at "Result" section.
                        </Typography>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </List>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ marginBottom: "4rem" }} />
        </Grid>
      </Grid>
    </UserLayout>
  );
};

export default index;
