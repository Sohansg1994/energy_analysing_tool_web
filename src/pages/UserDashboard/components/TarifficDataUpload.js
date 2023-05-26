import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { Input } from "@mui/material";

function TarifficDataUpload() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleFileUpload = () => {
    console.log(file);
  };
  return (
    <>
      <Box variant="outlined" sx={{ mt: 5 }}>
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
              onChange={handleFileUpload}
            >
              Upload
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default TarifficDataUpload;
