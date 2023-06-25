import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function StaticForm(props) {
  const {children} = props;
  
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container
        sx={{
          backgroundColor: "#f5f5f5",
          ml: 30,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}

StaticForm.propTypes = {
  children: PropTypes.node,
};

export default StaticForm;
