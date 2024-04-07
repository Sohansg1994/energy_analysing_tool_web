import * as React from "react";

import {ThemeProvider} from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';

import theme from "../../../pages/modules/theme";
import {Divider} from "@mui/material";
import List from "@mui/material/List";
import {mainListItems} from "../../../pages/UserDashboard/components/listItems";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 200;

const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}

function UserDrawer() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer sx={drawerStyles} variant="permanent" anchor="left">
        <Toolbar />
        <List component="nav">
          {mainListItems}
        </List>
        <Divider/>
      </Drawer>
    </ThemeProvider>
  );
}

export default UserDrawer;
