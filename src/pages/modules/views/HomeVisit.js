import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import Box from "@mui/material/Box";

export default function HomeVisits() {
  return (
    <Container id="home-visits-component" component="section" sx={{mt: 8, mb: 12}}>
      <Typography variant="h4" marked="center" align="center" component="h2" sx={{fontFamily: 'Montserrat'}}>
        HOME VISITS
      </Typography>
      <Box sx={{mt: 4, display: 'box', flexWrap: 'wrap'}}>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Say goodbye to skyrocketing Electricity bills.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Transform your energy usage and revolutionize your savings.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Unleash the power of smart energy management.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
