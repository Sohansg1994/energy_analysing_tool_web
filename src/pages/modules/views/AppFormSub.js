import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "../components/Paper";

function AppFormSub(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#c1decd",
        minHeight: "93vh",
      }}
    >
      <Container maxWidth="100%">
        <Box sx={{ mt: 7, mb: 0 }}>
          <Paper
            sx={{
              my: { xs: 14, md: 14 },
              py: { xs: 4, md: 8 },
              px: { xs: 3, md: 6 },
              backgroundColor: "#c1decd",
              borderRadius: 2,
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppFormSub.propTypes = {
  children: PropTypes.node,
};

export default AppFormSub;
