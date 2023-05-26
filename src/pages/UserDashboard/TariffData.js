import React from "react";
import Dashboard from "./components/Dashboard";
import TariffDataTable from "./components/TarifficDataTable";
import withRoot from "../modules/withRoot";
import AdminDashboard from "./components/AdminDashboard";
import StaticForm from "../modules/views/StaticForm";
import TarifficDataUpload from "./components/TarifficDataUpload";

function TarifficData() {
  const role = localStorage.getItem("role");
  return (
    <>
      {role === "USER" && <AdminDashboard />}
      {role === "ADMIN" && <Dashboard />}

      <TariffDataTable />
    </>
  );
}

export default withRoot(TarifficData);
