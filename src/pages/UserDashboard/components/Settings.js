import { Box, Divider } from "@mui/material";
import React from "react";

import { VscSettings } from "react-icons/vsc";
import TarifficDataUpload from "./TarifficDataUpload";
import SubscriptionPlanUpload from "./SubscriptionPlanUpload";
function Settings() {
  return (
    <>
      <Box sx={{ mt: 15 }}>
        <Divider textAlign="left" sx={{ fontSize: 30 }}>
          <VscSettings />
        </Divider>
        <TarifficDataUpload />
        <SubscriptionPlanUpload />
      </Box>
    </>
  );
}

export default Settings;
