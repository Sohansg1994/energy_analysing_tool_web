import Box from "@mui/material/Box";
import React from "react";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import Projects from "../components/dashboard/Projects";
import { ROLES } from "../util/CommonUtil";

function ProjectsPage() {
  const role = localStorage.getItem("role");

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      {role === ROLES.ADMIN && <AdminDrawer />}
      {role === ROLES.USER && <UserDrawer />}
      <Projects />
    </Box>
  );
}

export default ProjectsPage;
