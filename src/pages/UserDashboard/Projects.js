import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import ProjectView from "./components/ProjectView";
import withRoot from "../modules/withRoot";
import AdminDashboard from "./components/AdminDashboard";

function Projects() {
  const role = localStorage.getItem("role");

  return (
    <React.Fragment>
      {role === "ADMIN" && <AdminDashboard />}
      {role === "USER" && <Dashboard />}
      <ProjectView />
    </React.Fragment>
  );
}

export default withRoot(Projects);
