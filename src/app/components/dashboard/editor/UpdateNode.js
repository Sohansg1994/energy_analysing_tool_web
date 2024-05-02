import { Box, Grid, Paper, Typography } from "@mui/material";

const containerStyles = {
  p: 2,
  m: 0, mb: 2
}

function UpdateNode({ nodeDetails }) {
  const handleSubmit = (e) => {
    alert("submit button pressed");
  }

  return (
    <Box component={Paper} sx={containerStyles}>
      <Grid container component={"form"} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography>
            Component details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            Component details
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UpdateNode;