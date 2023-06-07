import { Box, Container, Typography } from "@mui/material";
import React from "react";

function TarifficDataTable() {
  return (
    <>
      <Container
        sx={{
          mt: 15,
          ml: 38,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 90 }}>COMING SOON</Typography>
        <Typography sx={{ fontSize: 25 }}>
          This feature is under development.
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          Stay tune for something amazing.
        </Typography>

        <Box
          component="img"
          sx={{
            height: 350,
            width: 650,
            mt: 3,
          }}
          alt="The house from the offer."
          src="https://t4.ftcdn.net/jpg/03/85/25/03/360_F_385250385_zywKHrbWbUnqU3Fap1PsEsRvKuAC67lw.jpg"
        />
      </Container>
    </>
  );
}

export default TarifficDataTable;
