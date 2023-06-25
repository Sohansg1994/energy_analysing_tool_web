import React from "react";
import withRoot from "./modules/withRoot";
import {Box, Container, Typography} from "@mui/material";

function Error() {
  return (
    <>
      <Container
        sx={{
          mt: 20,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 200,
            width: 350,
            mt: 3,
          }}
          alt="The house from the offer."
          src="https://cdn.staticcrate.com/stock-hd/effects/footagecrate-red-error-icon-prev-full.png"
        />
        
        <Typography sx={{fontSize: 75}}>Oops !</Typography>
        <Typography sx={{fontSize: 40}}>Something went wrong</Typography>
      </Container>
    </>
  );
}

export default withRoot(Error);
