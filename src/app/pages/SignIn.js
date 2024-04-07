import * as React from "react";
import {Field, Form, FormSpy} from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "../../pages/modules/components/Typography";
import Footer from "../../pages/modules/views/Footer";
import Header from "../components/common/Header";
import AppForm from "../../pages/modules/views/AppForm";
import {email, required} from "../../pages/modules/form/validation";
import RFTextField from "../../pages/modules/form/RFTextField";
import FormButton from "../../pages/modules/form/FormButton";
import FormFeedback from "../../pages/modules/form/FormFeedback";
import withRoot from "../../pages/modules/withRoot";
import axios from "axios";
import {Alert, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

function SignIn() {
  let navigate = useNavigate();
  
  const [sent, setSent] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState(null);
  
  const handleSubmit = async (values) => {
    await axios.post("/user/login", values).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.data[0].accessToken);
        localStorage.setItem("refreshToken", response.data.data[0].refreshToken);
        localStorage.setItem("accessTokenExpiration", response.data.data[0].accessTokenExpireTime);
        localStorage.setItem("firstName", response.data.data[0].firstName);
        localStorage.setItem("role", response.data.data[0].role);
        localStorage.setItem("userId", response.data.data[0].userId);
        
        setSent(true);
        navigate("/projects");
      }
    }).catch((error) => {
      setWarningMessage(error.response.data.message);
      setWarning(true);
    });
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
      </AppForm>
      <Footer/>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
