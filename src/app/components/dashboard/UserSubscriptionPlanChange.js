import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, PATHS } from "../../util/CommonUtil";
import useAxiosPrivate from "../../util/useAxiosPrivate";

const SUBSCRIPTION_PLANS = ["FREE", "DOMESTIC_LITE"];

const submitGridStyle = {
  display: "flex",
  justifyContent: "end"
};

function UserSubscriptionPlanChange() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setShowAlert(false);
      setShowSuccess(false);
      setAlertMessage("");
      setEmailError(false);
    } else {
      setShowAlert(true);
      setShowSuccess(false);
      setAlertMessage("Please provide an valid email");
      setEmailError(true);
    }
  }

  const handleSubscriptionPlanChange = (e) => {
    if (e.target.value &&  SUBSCRIPTION_PLANS.includes(e.target.value)) {
      setSubscriptionPlan(e.target.value);
      setAlertMessage("");
      setShowAlert(false);
      setShowSuccess(false);
    } else {
      setSubscriptionPlan("");
      setAlertMessage("Please select a valid subscription plan");
      setShowAlert(true);
      setShowSuccess(false);
    }
  }

  const handleSubmit = async (e) => {
    const body = {
      userEmail: email,
      subscriptionPlanName: subscriptionPlan
    }
    await axiosPrivate.post("/subscription", body).then((response) => {
      if (response.status === 200) {
        setSubscriptionPlan("");
        setEmail("");
        setShowAlert(false);
        setAlertMessage("");
        setShowSuccess(true);
      }
    }).catch((error) => {
      // handle use already has this subscription plan issue, and don't let change plan of current user
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Changing user subscription plan",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    })
  }

  return (
    <Box component={Paper} sx={{ p: 2, m: 0, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>
            Change user subscription plan
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="email"
            required
            inputProps={{
              autoComplete: "off",
              type: "email"
            }}
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            label="Email"
            size="small"
            variant="outlined" />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl
            sx={{ minWidth: 220 }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="subscriptionPlanLabel">
              Subscription plan
            </InputLabel>
            <Select
              labelId="subscriptionPlanLabel"
              value={subscriptionPlan}
              onChange={handleSubscriptionPlanChange}
            >
              {
                SUBSCRIPTION_PLANS.map(plan => (
                  <MenuItem key={plan} value={plan} >
                    {plan}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4} sx={submitGridStyle}>
          <Button
            disabled={!(Boolean(email) && Boolean(subscriptionPlan) && SUBSCRIPTION_PLANS.includes(subscriptionPlan))}
            size="small"
            variant="outlined"
            onClick={handleSubmit}
          >
            Change
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ p: 2 }}>
          {showAlert && (
            <Alert size="small" severity="warning" variant="outlined">
              {alertMessage}
            </Alert>
          )}
          {showSuccess && (
            <Alert size="small" severity="success" variant="outlined">
              Successfully changed the subscription plan
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserSubscriptionPlanChange;