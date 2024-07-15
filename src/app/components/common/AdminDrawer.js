
import { Drawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { adminListItems } from "./DrawerMenuItems";

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
    <Drawer sx={drawerStyles} variant="permanent" anchor="left">
      <Toolbar />
      <List component="nav">
        {adminListItems}
      </List>
      <Divider />
    </Drawer>
  );
}

export default AdminDrawer;
