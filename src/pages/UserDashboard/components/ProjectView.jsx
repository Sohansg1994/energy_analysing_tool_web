import { Container } from "@mui/system";
import React from "react";

import Grid from "@mui/material/Grid";

import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";

function ProjectView() {
  return (
    <Container
      sx={{ mb: 4, ml: 38, display: "flex", justifyContent: "center" }}
    >
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Grid item xs={12} md={8} lg={9}>
          <ProjectList />
        </Grid>
      </Container>
    </Container>
  );
}

export default ProjectView;
