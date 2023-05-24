import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import Box from "@mui/material/Box";

export default function WhatWeDo() {
  return (
    <Container component="section" sx={{mt: 8, mb: 12}}>
      <Typography variant="h4" marked="center" align="center" component="h2" sx={{fontFamily: 'Montserrat'}}>
        WHAT WE DO
      </Typography>
      <Box sx={{mt: 4, display: 'box', flexWrap: 'wrap'}}>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Personalized guidance and tailored solutions for optimal energy usage.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Navigate the maze of energy efficiency with ease.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Identify energy-guzzling appliances and find solutions.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Implement smart home technologies for maximum efficiency.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Empower yourself to take control of your energy consumption.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Enjoy a comfortable living environment while minimizing your carbon footprint.
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
          <Typography variant="h5" marked="center" align="center" component="h5">
            Analyze energy patterns and provide practical strategies for optimization.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}


// •	Personalized guidance and tailored solutions for optimal energy usage
// •	Navigate the maze of energy efficiency with ease
//   •	Identify energy-guzzling appliances and find solutions
// •	Implement smart home technologies for maximum efficiency
// •	Empower yourself to take control of your energy consumption
// •	Enjoy a comfortable living environment while minimizing your carbon footprint
// •	Analyze energy patterns and provide practical strategies for optimization
