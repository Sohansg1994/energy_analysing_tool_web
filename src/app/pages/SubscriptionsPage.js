import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from "@mui/material";
import Header from "../components/common/Header";

function SubscriptionsPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      <Container maxWidth="lg" sx={{ mt: 12, p: 1 }}>
        <Card sx={{ maxWidth: 300, m: 1 }}>
          <CardHeader title="Free Plan" sx={{backgroundColor: "#EFEFEF"}} />
          <CardContent>
            <Typography>
              10 max projects
            </Typography>
            <Typography>
              100 max nodes
            </Typography>
            <Typography variant="h6">
              2000 LKR/YEAR
            </Typography>
          </CardContent>
          <CardActions sx={{ m: 1 }}>
            <Button 
              variant="outlined" 
              size="medium"
            >
              GET STARTED
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  )
}

export default SubscriptionsPage;