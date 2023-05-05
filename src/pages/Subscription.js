import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import Footer from "./modules/views/Footer";
import Header from "./modules/views/Header";
import AppFormSub from "./modules/views/AppFormSub";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import axios from "axios";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";

import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { DisabledByDefault } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Subcription() {
  let navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [subcriptionPlan, setSubcriptionPlan] = useState([]);

  /*const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
        console.log("email error");
      }
    }

    return errors;
  };*/

  const handleSubmit = async (plan) => {
    const accessToken = localStorage.getItem("accessToken");

    const data = {
      userEmail: "",
      subscriptionPlanName: plan,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(data);
    console.log(config);

    try {
      const response = await axios.post("/subscription", data, config);
      console.log(response);
      if (response.status === 200) {
        navigate("/projects");
        setSent(true);
      } else {
        // handle error
      }
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const getSubcriptionPlans = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`/subscription/plan`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setSubcriptionPlan(response.data.data[0]);
      } else {
      }
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const tiers = [
    {
      title: "Free",
      price: ``,
      description: [`Sentence 1 ${1}`, ` Projects - `, ` Nodes`],
      buttonText: "Get started",
      buttonVariant: "outlined",
      plan: "FREE",

      path: "/projects",
    },
    {
      title: "Domestic Lite",
      subheader: "Most popular",
      price: ``,
      description: [`Projects `, `Nodes`],
      buttonText: "Get started",
      // buttonVariant: 'contained',
      buttonVariant: "disabled",

      path: "/projects",
    },
  ];

  useEffect(() => {
    getSubcriptionPlans();
  });

  return (
    <React.Fragment>
      <Header />
      <AppFormSub>
        <Container maxWidth="md" component="main">
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              columnGap: 3,
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                //xs={12}
                //sm={tier.title === "Enterprise" ? 12 : 6}
                //md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    action={
                      tier.title === "Domestic Lite" ? <StarIcon /> : null
                    }
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h4"
                        color="text.primary"
                      >
                        LKR {tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      varient={tier.buttonStatus}
                      onClick={() => handleSubmit(tier.plan)}
                      //href={tier.path}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AppFormSub>
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Subcription);
