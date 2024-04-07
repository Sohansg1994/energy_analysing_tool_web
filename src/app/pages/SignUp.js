import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Field, Form, FormSpy} from "react-final-form";
import Typography from "../../pages/modules/components/Typography";
import Header from "../components/common/Header";
import AppForm from "../../pages/modules/views/AppForm";
import {email, required} from "../../pages/modules/form/validation";
import RFTextField from "../../pages/modules/form/RFTextField";
import FormButton from "../../pages/modules/form/FormButton";
import FormFeedback from "../../pages/modules/form/FormFeedback";
import withRoot from "../../pages/modules/withRoot";
import {useNavigate} from "react-router-dom";
import {Alert, Stack} from "@mui/material";

import axios from "axios";

const validate = (values) => {
  const errors = required(
    ["firstName", "lastName", "email", "password"],
    values
  );
  if (!errors.email) {
    const emailError = email(values.email);
    if (emailError) {
      errors.email = emailError;
    }
  }
  return errors;
};


function SignUp() {
  let navigate = useNavigate();
  
  const [sent, setSent] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState(null);
  
  const handleSubmit = async (values) => {
    await axios.post("/user/register", values).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.data[0].accessToken);
        localStorage.setItem("refreshToken", response.data.data[0].refreshToken);
        localStorage.setItem("accessTokenExpiration", response.data.data[0].accessTokenExpireTime);
        localStorage.setItem("firstName", response.data.data[0].firstName);
        localStorage.setItem("role", response.data.data[0].role);
        localStorage.setItem("userId", response.data.data[0].userId);
        
        setSent(true);
        navigate("/subcription");
      }
    }).catch((error) => {
      setWarningMessage(error.response.data.message);
      setWarning(true);
    })
  };
  
  return (
    <React.Fragment>
      <Header/>
      <AppForm>
        <React.Fragment>
          <Typography
            variant="h3"
            align="center"
            sx={{fontFamily: "Montserrat"}}
          >
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signIn" underline="hover">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{submitting: true}}
          validate={validate}
        >
          {({handleSubmit: handleSubmit2, submitting}) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{mt: 6}}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{submitError: true}}>
                {({submitError}) =>
                  submitError ? (
                    <FormFeedback error sx={{mt: 2}}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "Montserrat",
                  backgroundColor: "#1F8A70",
                  "&:hover": {
                    backgroundColor: "#1c7861",
                  },
                }}
                disabled={submitting || sent}
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
              {warning && (
                <Stack spacing={2}>
                  <Alert severity="warning">{warningMessage}</Alert>
                </Stack>
              )}
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
