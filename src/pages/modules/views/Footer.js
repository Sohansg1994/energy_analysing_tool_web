import * as React from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box sx={{
        mt: 2,
        backgroundColor: "black",
        width: "100%"
      }}>
        <Typography
          sx={{
            color: "#69696a",
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        >
          {"© 2023 Copyright: greenbill.lk "}
        </Typography>
      </Box>
    </footer>
  );
}
