import React from "react";
import UserDrawer from "../components/common/UserDrawer";
import AdminDrawer from "../components/common/AdminDrawer";
import {ROLES} from "../util/CommonUtil";
import Header from "../components/common/Header";
import Box from "@mui/material/Box";
import Projects from "../components/dashboard/Projects";

function ProjectsPage() {
  const role = localStorage.getItem("role");
  
  return (
    <React.Fragment>
      <Box sx={{display: 'flex'}}>
        <Header position="absolute"/>
        {role === ROLES.ADMIN && <AdminDrawer/>}
        {role === ROLES.USER && <UserDrawer/>}
        <Projects/>
      </Box>
    </React.Fragment>
  );
}

export default ProjectsPage;
