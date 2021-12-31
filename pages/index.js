import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import dbConnect from "../lib/dbConnect";
// import Pet from "../models/Pet";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "isAdmin",
    "token",
  ]);
  useEffect(() => {
    setCookie("user", undefined);
    setCookie("token", undefined);
    setCookie("isAdmin", undefined);
    return () => {};
  }, []);

  return (
    <Background img="/images/homepage.jpg" pos="right" size="inherit">
      <Navbar title="E-Voting System" />
      <Container>
        <Typography
          align="center"
          variant="h3"
          component="div"
          sx={{ flexGrow: 1, margin: "3rem 0" }}
        >
          Welcome to E-Voting System
        </Typography>
        {/* <Segment placeholder> */}
        <Grid container>
          <Grid item md={6}>
            <Grid container spacing={4}>
              <Grid item lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2rem",
                    // padding: "1rem",
                  }}
                >
                  <Link href="/user/login">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        padding: "1rem",
                        borderRadius: "100% 100% 100% 100%",
                      }}
                    >
                      {/* Register */}
                      <Typography
                        align="center"
                        variant="h4"
                        component="div"
                        sx={{
                          flexGrow: 1,
                          margin: "3rem",
                        }}
                      >
                        Register as Voter
                      </Typography>
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2rem",
                    // padding: "1rem",
                  }}
                >
                  <Link href="/admin/login">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        padding: "1rem",
                        borderRadius: "100% 100% 100% 100%",
                      }}
                    >
                      <Typography
                        align="center"
                        variant="h6"
                        component="div"
                        sx={{
                          flexGrow: 1,
                          margin: "0.5rem",
                        }}
                      >
                        Admin Login
                      </Typography>
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
            {/* <Link href="/user/login">
              <Button variant="contained" size="large">User</Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="contained" size="large">Admin</Button>
            </Link> */}
          </Grid>
          {/* <Grid.Column>
            <Link href="/user/login">
              <Button content="User" size="big" />
            </Link>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Link href="/admin/login">
              <Button content="Admin" icon="signup" size="big" />
            </Link>
          </Grid.Column> */}
        </Grid>
        {/* <Divider>Or</Divider> */}
        {/* </Segment> */}
      </Container>
    </Background>
    // <>
    //   {/* Create a card for each pet */}
    //   {pets.map((pet) => (
    //     <div key={pet._id}>
    //       <div className="card">
    //         <img src={pet.image_url} />
    //         <h5 className="pet-name">{pet.name}</h5>
    //         <div className="main-content">
    //           <p className="pet-name">{pet.name}</p>
    //           <p className="owner">Owner: {pet.owner_name}</p>

    //           {/* Extra Pet Info: Likes and Dislikes */}
    //           <div className="likes info">
    //             <p className="label">Likes</p>
    //             <ul>
    //               {pet.likes.map((data, index) => (
    //                 <li key={index}>{data} </li>
    //               ))}
    //             </ul>
    //           </div>
    //           <div className="dislikes info">
    //             <p className="label">Dislikes</p>
    //             <ul>
    //               {pet.dislikes.map((data, index) => (
    //                 <li key={index}>{data} </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div className="btn-container">
    //             <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
    //               <button className="btn edit">Edit</button>
    //             </Link>
    //             <Link href="/[id]" as={`/${pet._id}`}>
    //               <button className="btn view">View</button>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </>
  );
};

/* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {
//   await dbConnect();

//   /* find all the data in our database */
//   const result = await Pet.find({});
//   const pets = result.map((doc) => {
//     const pet = doc.toObject();
//     pet._id = pet._id.toString();
//     return pet;
//   });

//   return { props: { pets: pets } };
// }

export default Index;
