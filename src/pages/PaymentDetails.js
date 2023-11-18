import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function PaymentDetails() {
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
        <h2>Payment Method</h2>
        <Box
          sx={{
            alignItems: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
            }}
          >
            Send an SMS or WhatsApp to:Geenbill service hotline - 07522385095
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
            }}
          >
            The instructions will be sent.
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
            }}
          >
            Domestic Lite charge - Rs.3000/-
          </Typography>
          <Typography
            sx={{
              mt: 5,
            }}
          >
            Thank You
          </Typography>
          <Typography>Greenbill Service</Typography>
        </Box>
      </Container>
    </>
  );
}
