import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FiDownload } from "react-icons/fi";

const imageContainerStyles = {
  p: 1,
  m: 0, mb: 2,
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
}

const buttonContainerStyles = {
  display: "flex",
  p: 1,
  m: 0, mb: 2,
  justifyContent: "center",
};

const pdfDownload = () => {
  const fileUrl = process.env.PUBLIC_URL + "/Tariff-2023-October.pdf";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", "tariffData.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function TariffDataTable() {
  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sx={imageContainerStyles}>
          <img alt="Tariff data sheet" src="/Tariff-2023-October-image.jpg" width={"100%"} />
        </Grid>
        <Grid item xs={12} sx={buttonContainerStyles}>
          <Button
            variant="outlined"
            color="info"
            startIcon={<FiDownload />}
            onClick={pdfDownload}
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TariffDataTable;