import Box from "@mui/material/Box";
import React from "react";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import Settings from "../components/dashboard/Settings";
import { ROLES } from "../util/CommonUtil";

function SettingsPage() {
  const role = localStorage.getItem("role");

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      {role === ROLES.ADMIN && <AdminDrawer />}
      {role === ROLES.USER && <UserDrawer />}
      <Settings />
    </Box >
  );
}

export default SettingsPage;
