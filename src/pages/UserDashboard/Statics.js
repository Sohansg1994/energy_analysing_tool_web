import React from "react";
import AdminDrawer from "../../app/components/common/AdminDrawer";
import StaticsSummary from "./components/StaticsSummary";
import StaticForm from "../modules/views/StaticForm";

function Statics() {
  return (
    <React.Fragment>
      <AdminDrawer/>
      <StaticForm>
        <StaticsSummary/>
      </StaticForm>
    </React.Fragment>
  );
}

export default Statics;
