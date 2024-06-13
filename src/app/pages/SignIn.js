import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { axiosPublic } from "../util/axios";
import { useAuthStore } from "../util/store";
import { COLORS, PATHS, REFRESH_TOKEN_KEY } from "../util/CommonUtil";
import useErrorHandler from "../util/useErrorHandler";

function SignIn() {
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  // should be sign-offed at this moment ??
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setShowAlert(false);
      setAlertMessage("");
      setEmailError(false);
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide an valid email");
      setEmailError(true);
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setShowAlert(false);
      setAlertMessage("");
      setPasswordError(false);
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide a valid password");
      setPasswordError(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity() && !emailError && !passwordError) {
      setAlertMessage("");
      setShowAlert(false);
      loginUser();
    } else {
      setAlertMessage("Please provide valid details");
      setShowAlert(true);
    }
  };

  const loginUser = async (e) => {
    const body = {
      email: email,
      password: password
    }
    await axiosPublic.post("/user/login", body).then((response) => {
      if (response.status === 200 && response?.data?.data[0]) {
        setAuthData(response?.data?.data[0]);
        localStorage.setItem(REFRESH_TOKEN_KEY, response?.data?.data[0].refreshToken)
        navigate(PATHS.PROJECTS, { replace: true });
      }
    }).catch((error) => {
      handleError(error, "Signing in");
    });
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />

      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>

          <Grid item xs={6} sx={{ m: 0, mb: 2 }}>
            <Box component={Paper} sx={{ p: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
              <Grid component={"form"} onSubmit={handleSubmit} container sx={{ justifyContent: "center" }}>

                <Grid item xs={12} sx={{ mb: 4 }}>
                  <Typography variant="h4" align="center">
                    Sign In
                  </Typography>
                </Grid>

                <Grid item xs={12} sx={{ p: 1, mb: 1 }}>
                  <TextField fullWidth
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

                <Grid item xs={12} sx={{ p: 1, mb: 1 }}>
                  <TextField fullWidth
                    id="password"
                    required
                    inputProps={{
                      autoComplete: "off",
                      type: "password"
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                    label="Password"
                    size="small"
                    variant="outlined" />
                </Grid>

                <Grid item xs={6} sx={{ p: 1, mb: 1 }}>
                  <Button
                    fullWidth
                    type="submit"
                    color="success"
                    variant="contained"
                    size="small">
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={8} sx={{ p: 2 }}>
            {showAlert && (
              <Alert severity="warning" variant="outlined">
                {alertMessage}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SignIn;
