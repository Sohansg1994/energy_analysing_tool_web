
import Drawer from '@mui/material/Drawer';
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { userListItems } from "./DrawerMenuItems";

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
    <Drawer sx={drawerStyles} variant="permanent" anchor="left">
      <Toolbar />
      <List component="nav">
        {userListItems}
      </List>
      <Divider />
    </Drawer>
  );
}

export default UserDrawer;
