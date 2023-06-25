import * as React from "react";
import {Field, Form, FormSpy} from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "./modules/components/Typography";
import Footer from "./modules/views/Footer";
import Header from "./modules/views/Header";
import AppForm from "./modules/views/AppForm";
import {email, required} from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import axios from "axios";
import {Alert, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [role, setRole] = React.useState(null);
  
  let navigate = useNavigate();
  
  const validate = (values) => {
    const errors = required(["email", "password"], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  };
  
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/user/login", values);
      console.log(response.data.data[0]);
      if (response.status === 200) {
        //const { accessToken, refreshToken } = response.data;
        const accessToken = response.data.data[0].accessToken;
        const refreshToken = response.data.data[0].refreshToken;
        const firstName = response.data.data[0].firstName;
        const role = response.data.data[0].role;
        const accessTokenET = response.data.data[0].accessTokenExpireTime;
        const userId = response.data.data[0].userId;
        const subcriptionPlan = response.data.data[0].subscriptionPlanName;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setFirstName(firstName);
        setRole(role);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessTokenExpiration", accessTokenET);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        console.log(accessTokenET);
        console.log(accessToken);
        console.log(userId);
        
        console.log(firstName);
        
        setSent(true);
        if (subcriptionPlan === "UnSubscribe") {
          navigate("/subcription");
        } else {
          navigate("/projects");
        }
      } else {
        console.log(response.status);
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "406 Wrong Password:Enter Correct Password" ||
        error.response.data.message === "404 Wrong Email:User not found"
      ) {
        setWarningMessage("Invalid Email or Password");
        setWarning(true);
      } else {
        navigate("/error");
      }
    }
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
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/signup" underline="hover">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
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
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
              {warning && (
                <Stack spacing={2}>
                  <Alert severity="error">{warningMessage}</Alert>
                </Stack>
              )}
            </Box>
          )}
        </Form>
        <Typography align="center">
          {/*<Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
              </Link>*/}
        </Typography>
      </AppForm>
      <Footer/>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
