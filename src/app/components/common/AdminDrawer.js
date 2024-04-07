import * as React from "react";

import {ThemeProvider} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import theme from "../../../pages/modules/theme";
import {mainListItems} from "../../../pages/UserDashboard/components/listItems";
import {Drawer} from "@mui/material";

const drawerWidth = 200;

const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}

function AdminDrawer() {
  
  return (
    <ThemeProvider theme={theme}>
      <Drawer sx={drawerStyles} variant="permanent" anchor="left">
        <Toolbar/>
        <List component="nav">
          {mainListItems}
        </List>
        <Divider/>
      </Drawer>
    </ThemeProvider>
  );
}

export default AdminDrawer;
