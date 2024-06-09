import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { IMAGES } from "../util/CommonUtil";

function OurServicesPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />

      <Container sx={{ mt: 10, mb: 10, textAlign: "center" }} maxWidth={false}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">
              We Will Help You
            </Typography>
          </Grid>

          <Grid item xs={12} justifySelf="center">
            <Typography variant="h6">
              Personalized guidance and tailored solutions for optimal energy usage
            </Typography>
            <Typography variant="h6">
              Navigate the maze of energy efficiency with ease
            </Typography>
            <Typography variant="h6">
              Identify energy-guzzling appliances and find solutions
            </Typography>
            <Typography variant="h6">
              Implement smart home technologies for maximum efficiency
            </Typography>
            <Typography variant="h6">
              Empower yourself to take control of your energy consumption
            </Typography>
            <Typography variant="h6">
              Enjoy a comfortable living environment while minimizing your carbon footprint
            </Typography>
            <Typography variant="h6">
              Analyze energy patterns and provide practical strategies for optimization
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Container maxWidth="lg">
              <img src={IMAGES.OUR_SERVICES_BACKGROUND} style={{ width: '100%', height: 'auto' }} />
            </Container>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">
              WE CAN VISIT YOUR HOME
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Say goodbye to skyrocketing Electricity bills
            </Typography>
            <Typography variant="h6">
              Transform your energy usage and revolutionize your savings
            </Typography>
            <Typography variant="h6">
              Unleash the power of smart energy management
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box >
  )
}

export default OurServicesPage;