import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { PATHS, SUBSCRIPTION_CYCLES, SUBSPRIPTION_PLANS } from "../util/CommonUtil";
import { axiosPublic } from "../util/axios";
import useAxiosPrivate from "../util/useAxiosPrivate";
import useErrorHandler from "../util/useErrorHandler";


// no need to come here if you already dont have a subscription plan, redirect to the projects or error page
function SubscriptionsPage() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const getSubscriptionPlans = async () => {
    await axiosPublic.get("/subscription/plans").then((response) => {
      if (response.status === 200) {
        setSubscriptionPlans(response.data?.data);
        console.log(response.data?.data);
      };
    }).catch((error) => {
      handleError(error, "Loading subscription plans");
    });
  }

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  const handleSubmit = async (plan) => {
    const body = {
      userEmail: "",
      subscriptionPlanName: plan.planType,
    }

    await axiosPrivate.post("/subscription", body).then((response) => {
      if (response.status === 200) {
        navigate(PATHS.PROJECTS);
      }
    }).catch((error) => {
      handleError(error, "Subscribing to a new plan");
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      <Container maxWidth="lg" sx={{ mt: 12, p: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
              Please select a subscription plan
            </Typography>
          </Grid>
          {subscriptionPlans.length && subscriptionPlans.map(plan => (
            <Grid item xs={4} key={plan.planType}>
              <Card sx={{ maxWidth: 300, m: 1 }}>
                <CardHeader
                  title={SUBSPRIPTION_PLANS[plan.name]}
                  sx={{ backgroundColor: "#EFEFEF" }}
                />
                <CardContent>
                  <Typography>
                    {plan.maxNumProject} projects
                  </Typography>
                  <Typography>
                    {plan.maxNumNode} nodes
                  </Typography>
                  <Typography variant="h6">
                    {
                      (plan.planType === "FREE") ? "Free subscription" : plan.rate + " LKR / " + SUBSCRIPTION_CYCLES[plan.cycle]
                    }
                  </Typography>
                </CardContent>
                <CardActions sx={{ m: 1 }}>
                  <Button
                    onClick={() => handleSubmit(plan)}
                    variant="outlined"
                    size="medium"
                    disabled={plan.planType !== "FREE"}
                  >
                    GET STARTED
                  </Button>
                  {plan.planType !== "FREE" && (
                    <Typography>
                      Coming soon
                    </Typography>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default SubscriptionsPage;