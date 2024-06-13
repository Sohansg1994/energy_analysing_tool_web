import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { COLORS } from "../../util/CommonUtil";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import useErrorHandler from "../../util/useErrorHandler";

const fileLabelStyle = {
  backgroundColor: COLORS.WHITE,
  p: 0.5, pl: 2, pr: 2,
  border: "1px solid #FFF",
  borderRadius: "4px"
}


function TariffDataUpload() {
  const handleError = useErrorHandler();
  const axiosPrivate = useAxiosPrivate();
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("Please select a tariff data sheet");

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      const selectedFile = files[0];
      if (selectedFile) {
        if (selectedFile.type === "text/csv") {
          console.log(selectedFile);
          setFile(selectedFile);
          setMessage(selectedFile.name);
        } else {
          setFile(null);
          setMessage("Select a CSV file with tariff data");
        }
      } else {
        setMessage("Something went wrong");
        setFile(null);
      }
    } else {
      setMessage("Please select one file to upload");
      setFile(null);
    }
  }

  const handleFileUpload = async () => {
    setMessage("Fille uploading...");
    let formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    await axiosPrivate.post("upload/tariff", formData, config).then((response) => {
      if (response.status === 200) {
        setMessage("File successfully uploaded");
      }
    }).catch((error) => {
      handleError(error, "Uploading tariff data");
    });
  };

  return (
    <Box component={Paper} sx={{ p: 2, m: 0, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>
            Upload tariff data
          </Typography>
        </Grid>
        <Grid item xs={12} md={1} sx={{ display: "flex", justifyContent: "start" }}>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={() => fileInput.current.click()}
          >
            Browse
          </Button>
          <input
            ref={fileInput}
            accept={".csv"}
            type="file"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography sx={fileLabelStyle}>
            {message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            disabled={!file}
            size="small"
            variant="outlined"
            onClick={handleFileUpload}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TariffDataUpload;