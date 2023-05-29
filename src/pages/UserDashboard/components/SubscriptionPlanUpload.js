import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Input } from "@mui/material";

import { RiUploadCloudFill } from "react-icons/ri";
import axios from "axios";

function SubscriptionPlanUpload() {
  const [file, setFile] = useState(null);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    setIsSuccess(false);
    setIsError(false);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    setIsSuccess(false);
    setIsError(false);
    console.log(file);
    let uploadFile = file;
    let formdata = new FormData();
    formdata.append("file", uploadFile);

    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(accessToken);

    try {
      const response = await axios.post(
        "upload/subscription_plan",
        formdata,
        config
      );
      console.log(response);
      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <>
      <Box variant="outlined" sx={{ mt: 5, mb: 5 }}>
        <Paper elevation={3} sx={{ p: 5 }}>
          <Divider textAlign="center">
            <Typography sx={{ fontSize: 16, fontFamily: "Montserrat" }}>
              Tariffic Data Upload
            </Typography>
          </Divider>
          <Typography sx={{ fontSize: 15, mt: 5 }}>
            Please Browse the file and Upload{" "}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Input
              type="file"
              inputProps={{ style: { color: "blue" } }}
              onChange={handleFileChange}
            ></Input>

            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 3 }}
              endIcon={<RiUploadCloudFill />}
              onClick={handleFileUpload}
            >
              Upload
            </Button>

            {IsSuccess && (
              <Stack>
                <Alert severity="success" sx={{ fontSize: 16 }}>
                  File Successfully Uploaded
                </Alert>
              </Stack>
            )}
            {isError && (
              <Stack>
                <Alert severity="error" sx={{ fontSize: 16 }}>
                  Error
                </Alert>
              </Stack>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default SubscriptionPlanUpload;
