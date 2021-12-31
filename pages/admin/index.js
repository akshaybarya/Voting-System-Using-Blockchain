import AdminLayout from "../../components/AdminLayout";
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

const index = () => {
  return (
    <AdminLayout>
      <Divider sx={{ marginBottom: "2rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Accordion expanded>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4">Admin - User Manual</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                There are few guidelines for the admin
              </Typography>
              <List dense>
                <ListItem>
                  <Typography variant="h6" component="h6" sx={{}}>
                    1. Candidate Registration
                  </Typography>
                </ListItem>
                <List dense>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • Before registration phase starts admin must register all
                      candidates by using the candidate registration form and
                      each candidate should be over 25 in age.
                    </Typography>
                  </ListItem>
                </List>
                <ListItem>
                  <Typography variant="h6" component="h6" sx={{}}>
                    2. Voting Phase Change
                  </Typography>
                </ListItem>
                <List dense>
                  <ListItem>
                    <Typography
                      variant="body1"
                      component="ol"
                      sx={{ flexGrow: 1 }}
                    >
                      • Election Starts - Candidate registration.
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
                          Registration Phase - Voters must register themself in
                          this phase
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography
                          variant="body1"
                          component="ol"
                          sx={{ flexGrow: 1 }}
                        >
                          Voting Phase - Votes must cast their votes to their
                          respective candidates.
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography
                          variant="body1"
                          component="ol"
                          sx={{ flexGrow: 1 }}
                        >
                          Phases can only be changed in order and once change
                          cant be reverted back.
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
    </AdminLayout>
  );
};

export default index;
