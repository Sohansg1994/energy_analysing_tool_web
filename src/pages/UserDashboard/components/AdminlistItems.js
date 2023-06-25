import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {NavLink} from "react-router-dom";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import SettingsIcon from "@mui/icons-material/Settings";

export const mainListItems = (
  <React.Fragment>
    <NavLink
      to="/projects"
      style={{textDecoration: "none", color: "#424242"}}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Projects"/>
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/tarifficdata"
      style={{textDecoration: "none", color: "#424242"}}
    >
      <ListItemButton>
        <ListItemIcon>
          <ScatterPlotIcon/>
        </ListItemIcon>
        <ListItemText primary="Tarrif Data"/>
      </ListItemButton>
    </NavLink>
    <NavLink to="/statics" style={{textDecoration: "none", color: "#424242"}}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <ListItemText primary="Settings "/>
      </ListItemButton>
    </NavLink>
    {/*<NavLink to="/statics" style={{ textDecoration: "none", color: "#424242" }}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
</NavLink>*/}
    
    {/*<ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
</ListItemButton>*/}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/*<ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
</ListItemButton>*/}
  </React.Fragment>
);
