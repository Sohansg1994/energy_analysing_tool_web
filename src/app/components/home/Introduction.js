import { Box, Button, Container, Typography } from "@mui/material";
import { COLORS, IMAGES, PATHS } from "../../util/CommonUtil";

const containerStyles = {
  backgroundImage: `url(${IMAGES.INTRODUCTION_BACKGROUND})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  m: 0, mt: 5,
  p: 5, pt: 15, pb: 20,
  textAlign: "center"
}

function Introduction() {
  return (
    <Container sx={containerStyles} maxWidth={false} id="build-project">
      <Box>
        <Typography variant="h6" sx={{ color: COLORS.WHITE}}>
          Are you worried about your energy bill
        </Typography>
        <Typography variant="h6" sx={{pt: 1, color: COLORS.WHITE}}>
          Do you need to optimise your electricity consumption
        </Typography>
        <Typography variant="h4" sx={{p: 2, color: COLORS.WHITE}}>
          CALCULATE YOUR GREEN BILL
        </Typography>
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          color="success"
          component="a"
          href={PATHS.SIGN_UP}
        >
          GET STARTED HERE
        </Button>
      </Box>
    </Container>
  );
}

export default Introduction;