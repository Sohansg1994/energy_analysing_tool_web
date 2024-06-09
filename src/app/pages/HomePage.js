import { Box, Container, Grid, Typography } from "@mui/material";
import Header from "../components/common/Header";
import Introduction from "../components/home/Introduction";
import SimpleCalculator from "../components/home/SimpleCalculator";
import WhatWeDo from "../components/home/WhatWeDo";
import Footer from "../components/common/Footer";

function HomePage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />

      <Grid container spacing={0} justifyContent="center" sx={{mb: 5}}>
        <Grid item xs={12}>
          <Introduction />
        </Grid>
        <Grid item xs={12}>
          <WhatWeDo />
        </Grid>
        <Grid item xs={8}>
          <SimpleCalculator />
        </Grid>
      </Grid>

      <Footer />
    </Box >
  )
}

export default HomePage;