import { Alert, Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile'

const acceptedFileFormats = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce";

function SubscriptionPlanUpload() {
  const accessToken = localStorage.getItem("accessToken");

  const [file, setFile] = useState(null);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    setIsSuccess(false);
    setIsError(false);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    // setIsSuccess(false);
    // setIsError(false);
    let formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log("method called");

    // await axios.post("upload/subscription_plan", formData, config).then((response) => {
    //   if (response.status === 200) {
    //     setIsSuccess(true);
    //   }
    // }).catch((error) => {
    //   console.log(error.response.data.message);
    //   setIsError(true);
    // });
  };

  return (
    <Box sx={{ p: 0, pt: 4, pb: 2 }}>
      <MuiFileInput
        label="Select subscription sheet"
        size="small"
        value={file}
        onChange={handleFileUpload}
        accept={acceptedFileFormats}
      />

      {/* <input
        type="file"
        inputProps={{ style: { color: "blue" } }}
        onChange={handleFileChange}
      ></input>

      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 3 }}
        endIcon={<RiUploadCloudFill />}
        onClick={handleFileUpload}
      >
        Upload
      </Button> */}



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
  )
}

export default SubscriptionPlanUpload;