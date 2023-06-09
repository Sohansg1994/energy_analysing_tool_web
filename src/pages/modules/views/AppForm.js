import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "../components/Paper";

function AppForm(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgb(148, 175, 159)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 7, mb: 12 }}>
          <Paper
            sx={{
              my: { xs: 14, md: 14 },
              py: { xs: 4, md: 8 },
              px: { xs: 3, md: 6 },
              backgroundColor: "#FBFBFB",
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

AppForm.propTypes = {
  children: PropTypes.node,
};

export default AppForm;
