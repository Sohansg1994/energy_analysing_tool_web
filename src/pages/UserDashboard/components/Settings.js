import { Box, Divider } from "@mui/material";
import React from "react";

import { VscSettings } from "react-icons/vsc";
import TarifficDataUpload from "./TarifficDataUpload";
import SubscriptionPlanUpload from "./SubscriptionPlanUpload";
import UserSubPlanChange from "./UserSubPlanChange";
function Settings() {
  return (
    <>
      <Box sx={{ mt: 15 }}>
        <Divider textAlign="left" sx={{ fontSize: 30 }}>
          <VscSettings />
        </Divider>
        <UserSubPlanChange />
        <TarifficDataUpload />
        <SubscriptionPlanUpload />
      </Box>
    </>
  );
}

export default Settings;
