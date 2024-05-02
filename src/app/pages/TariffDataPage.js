import React from "react";
import AdminDrawer from "../components/common/AdminDrawer";
import UserDrawer from "../components/common/UserDrawer";
import { ROLES } from "../util/CommonUtil";
import TariffDataTable from "../components/dashboard/TariffDataTable";
import Box from "@mui/material/Box";
import Header from "../components/common/Header";

function TariffDataPage() {
  const role = localStorage.getItem("role");
  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      {role === ROLES.ADMIN && <AdminDrawer />}
      {role === ROLES.USER && <UserDrawer />}
      <TariffDataTable />
    </Box>
  );
}

export default TariffDataPage;
