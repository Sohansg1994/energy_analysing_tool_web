import React, { useEffect, useState } from "react";
import withRoot from "../modules/withRoot";
import AdminDashboard from "./components/AdminDashboard";
import StaticsSummary from "./components/StaticsSummary";
import StaticForm from "../modules/views/StaticForm";
import { Dashboard } from "@mui/icons-material";

function Statics() {
  return (
    <React.Fragment>
      <AdminDashboard />

      <StaticForm>
        <StaticsSummary />
      </StaticForm>
    </React.Fragment>
  );
}

export default Statics;
