import * as React from 'react';
import Header from "./modules/views/Header";
import Footer from "./modules/views/Footer";
import withRoot from "./modules/withRoot";
import Typography from "./modules/components/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Services() {
  return (<React.Fragment>
    <Header/>
    <Container sx={{mt: 15, mb: 15}}>
      <Container component="section" sx={{mt: 8, mb: 12}}>
        <Typography variant="h4" marked="center" align="center" component="h2" sx={{fontFamily: 'Montserrat'}}>
          WE WILL HELP YOU
        </Typography>
        <Box sx={{mt: 4, display: 'box', flexWrap: 'wrap'}}>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Personalized guidance and tailored solutions for optimal energy usage
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Navigate the maze of energy efficiency with ease
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Identify energy-guzzling appliances and find solutions
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Implement smart home technologies for maximum efficiency
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Empower yourself to take control of your energy consumption
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Enjoy a comfortable living environment while minimizing your carbon footprint
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Analyze energy patterns and provide practical strategies for optimization
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'grid', flexWrap: 'wrap', placeItems: 'center'}}>
            <Box
              component="img"
              sx={{
                height: 350,
                width: 650,
                mt: 3
              }}
              alt="The house from the offer."
              src="/home_visit_pic.jpg" />
          </Box>
        </Box>
      </Container>
      <Container component="section" sx={{mt: 8, mb: 12}}>
        <Typography variant="h4" marked="center" align="center" component="h2" sx={{fontFamily: 'Montserrat'}}>
          <a
            style={{ color: "inherit", textDecoration: "none" }} href={'/homevisit'}>
            WE CAN VISIT YOUR HOME
          </a>
          
        </Typography>
        <Box sx={{mt: 4, display: 'box', flexWrap: 'wrap'}}>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Say goodbye to skyrocketing Electricity bills
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Transform your energy usage and revolutionize your savings
            </Typography>
          </Box>
          <Box sx={{mt: 2, display: 'box', flexWrap: 'wrap'}}>
            <Typography variant="h5" marked="center" align="center" component="h5">
              Unleash the power of smart energy management
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
    <Footer/>
  </React.Fragment>);
}

export default withRoot(Services);