import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Input,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";

import { MdOutlinePublishedWithChanges } from "react-icons/md";

import axios from "axios";

export default function UserSubPlanChange() {
  const subscriptionPlans = [
    { label: "FREE", id: 1 },
    { label: "DOMESTIC_LITE", id: 2 },
  ];
  const [userEmail, setUserEmail] = useState("");
  const [subscriptionPlanName, setSubscriptionPlanName] = useState("");
  const [isError, setIsError] = useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [isSystemError, setIsSystenError] = useState(false);

  const handleSubmit = async () => {
    setIsError(false);
    setIsSystenError(false);
    setIsSuccess(false);
    if (userEmail.length <= 0 || subscriptionPlanName.length <= 0) {
      setIsError(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    const data = {
      userEmail: userEmail,
      subscriptionPlanName: subscriptionPlanName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post("/subscription", data, config);
      console.log(response);
      if (response.status === 200) {
        setUserEmail("");
        setSubscriptionPlanName("");
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSystenError(true);
    }
  };

  return (
    <>
      <Box variant="outlined" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 5 }}>
          <Divider textAlign="center">
            <Typography sx={{ fontSize: 16, fontFamily: "Montserrat" }}>
              User Subscription Plan Change
            </Typography>
          </Divider>
          <Box
            sx={{
              display: "flex",
              columnGap: 3,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Box
              sx={{
                mt: 3,
                display: "flex",
                columnGap: 3,
                width: "75%",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Email"
                fullWidth
                size="small"
                sx={{ width: "60%" }}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                error={isError && userEmail.length <= 0 ? true : false}
                helperText={
                  isError && userEmail.length <= 0
                    ? "Please fill user email"
                    : ""
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subscriptionPlans}
                size="small"
                sx={{ width: "40%" }}
                value={subscriptionPlanName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Plan"
                    error={
                      isError && subscriptionPlanName.length <= 0 ? true : false
                    }
                    helperText={
                      isError && subscriptionPlanName.length <= 0
                        ? "Please select subscription plan"
                        : ""
                    }
                  />
                )}
                onChange={(event, newValue) => {
                  setSubscriptionPlanName(newValue?.label || "");
                }}
              />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                fontFamily: "Montserrat",

                height: 40,
              }}
              endIcon={<MdOutlinePublishedWithChanges />}
              onClick={handleSubmit}
            >
              Change
            </Button>
          </Box>
          {IsSuccess && (
            <Stack>
              <Alert severity="success" sx={{ fontSize: 16, mt: 3 }}>
                Subscription Plan Successfully Changed
              </Alert>
            </Stack>
          )}
          {isSystemError && (
            <Stack>
              <Alert severity="error" sx={{ fontSize: 16, mt: 3 }}>
                Error
              </Alert>
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  );
}
