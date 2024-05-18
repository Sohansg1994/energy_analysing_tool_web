import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { LAST_NAME_REGEX, PASSWORD_REGEX, PATHS, USERNAME_REGEX } from "../util/CommonUtil";
import { axiosPublic } from "../util/axios";
import { useAuthStore } from "../util/store";


function SignUp() {
  const navigate = useNavigate();

  // should be sign-offed at this moment ??
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [matchPswd, setMatchPswd] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pswdError, setPswdError] = useState(false);
  const [matchPswdError, setMatchPswdError] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.validity.valid) {
      if (USERNAME_REGEX.test(e.target.value)) {
        setShowAlert(false);
        setAlertMessage("");
        setFirstNameError(false);
      } else {
        setShowAlert(true);
        setAlertMessage("First name must be alphanumeric and 3-20 characters long");
        setFirstNameError(true);
      }
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide a valid first name");
      setFirstNameError(true);
    }
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value == "" || LAST_NAME_REGEX.test(e.target.value)) {
      setShowAlert(false);
      setAlertMessage("");
      setLastNameError(false);
    } else {
      setShowAlert(true);
      setAlertMessage("Last name must be alphanumeric and less than 20 characters long");
      setLastNameError(true);
    }
  }

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
    setPswd(e.target.value);
    if (e.target.validity.valid) {
      if (PASSWORD_REGEX.test(e.target.value)) {
        setShowAlert(false);
        setAlertMessage("");
        setPswdError(false);
      } else {
        setShowAlert(true);
        setAlertMessage("Password must consist of [A-z0-9-_!@#$%] and 5-20 characters long");
        setPswdError(true);
      }
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide a valid password");
      setPswdError(true);
    }
  }

  const handleMatchPasswordChange = (e) => {
    setMatchPswd(e.target.value);
    if (e.target.validity.valid) {
      if (PASSWORD_REGEX.test(e.target.value)) {
        if (e.target.value === pswd) {
          setMatchPswdError(false);
          setShowAlert(false);
          setAlertMessage("");
        } else {
          setMatchPswdError(true);
          setShowAlert(true);
          setAlertMessage("Value does not match with the password");
        }
      } else {
        setMatchPswdError(true);
        setShowAlert(true);
        setAlertMessage("Password must consist of [A-z0-9-_!@#$%] and 5-20 characters long");
      }
    } else {
      setMatchPswdError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid matching password");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity() && !firstNameError && !lastNameError && !emailError && !pswdError && !matchPswdError) {
      setAlertMessage("");
      setShowAlert(false);
      registerNewUser();
    } else {
      setAlertMessage("Please provide valid details");
      setShowAlert(true);
    }
  };

  const registerNewUser = async () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pswd
    }
    await axiosPublic.post("/user/register", body).then((response) => {
      if (response.status === 200) {
        setAuthData(response?.data?.data[0]);
        navigate(PATHS.SUBSPRIPTION, { replace: true });
      }
    }).catch((error) => {
      if (error.response.status === 409) {
        setShowAlert(true);
        setAlertMessage("Email already in use. Please use a different email address.");
      } else {
        navigate(PATHS.ERROR, {
          state:
          {
            action: "Registering a new user",
            error: error
          }
        });
      }
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />

      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>

          <Grid item xs={6} sx={{ m: 0, mb: 2 }}>
            <Box component={Paper} sx={{ p: 2 }}>
              <Grid component={"form"} onSubmit={handleSubmit} container sx={{ justifyContent: "center" }}>

                <Grid item xs={12} sx={{ mb: 4 }}>
                  <Typography variant="h4" align="center">
                    Sign Up
                  </Typography>
                </Grid>

                <Grid item lg={6} xs={12} sx={{ p: 1, mb: 1 }}>
                  <TextField fullWidth
                    id="firstName"
                    required
                    inputProps={{
                      autoComplete: "off",
                      type: "text"
                    }}
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={firstNameError}
                    label="First name"
                    size="small"
                    variant="outlined" />
                </Grid>

                <Grid item lg={6} xs={12} sx={{ p: 1, mb: 1 }}>
                  <TextField fullWidth
                    id="lastName"
                    value={lastName}
                    inputProps={{
                      autoComplete: "off",
                      type: "text"
                    }}
                    onChange={handleLastNameChange}
                    error={lastNameError}
                    label="Last name"
                    size="small"
                    variant="outlined" />
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
                    value={pswd}
                    onChange={handlePasswordChange}
                    error={pswdError}
                    label="Password"
                    size="small"
                    variant="outlined" />
                </Grid>

                <Grid item xs={12} sx={{ p: 1, mb: 1 }}>
                  <TextField fullWidth
                    id="matchPassword"
                    required
                    inputProps={{
                      autoComplete: "off",
                      type: "password"
                    }}
                    value={matchPswd}
                    onChange={handleMatchPasswordChange}
                    error={matchPswdError}
                    label="Confirm password"
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
                    Sign Up
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

export default SignUp;
