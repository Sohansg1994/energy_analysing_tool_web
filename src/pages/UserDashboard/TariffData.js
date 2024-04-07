import React from "react";
import AdminDrawer from "../../app/components/common/AdminDrawer";
import UserDrawer from "../../app/components/common/UserDrawer";
import TariffDataTable from "./components/TariffDataTable";

function TariffData() {
  const role = localStorage.getItem("role");
  return (
    <>
      {role === "ADMIN" && <AdminDrawer/>}
      {role === "USER" && <UserDrawer/>}
      <TariffDataTable/>
    </>
  );
}

export default TariffData;
