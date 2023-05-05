import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "../components/Paper";

function StaticForm(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#94AF9F",
        height: 1,
        justifyContent: "space-between",
      }}
    >
      <Container
        sx={{
          backgroundColor: "#94AF9F",
        }}
      >
        <Box sx={{ mt: 7, mb: 12, backgroundColor: "#94AF9F" }}>
          <Paper
            sx={{
              backgroundColor: "#94AF9F",
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

StaticForm.propTypes = {
  children: PropTypes.node,
};

export default StaticForm;
