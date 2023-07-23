import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { FiDownload } from "react-icons/fi";

function TarifficDataTable() {
  const pdfDownload = () => {
    const fileUrl = process.env.PUBLIC_URL + "/Tariff-2023-July.pdf";
    console.log(fileUrl);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "tariffData.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Container
        sx={{
          mt: 15,
          ml: 38,
          pb: 5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "70vw",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <img src="/Tariff-2023-July-image.jpg" width={"100%"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 5,
            alignItems: "center",
            width: "70vw",
          }}
        >
          <Typography
            sx={{
              mr: 0.5,
              backgroundColor: "#1e1e1f",
              color: "white",
              py: 1,
              px: 5,
            }}
          >
            Download Tariff Data
          </Typography>
          <Button
            variant="contained"
            color="info"
            startIcon={<FiDownload />}
            onClick={pdfDownload}
          >
            Download
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default TarifficDataTable;
