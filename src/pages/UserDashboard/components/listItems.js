import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {NavLink} from "react-router-dom";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";

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
      to="/tariffdata"
      style={{textDecoration: "none", color: "#424242"}}
    >
      <ListItemButton>
        <ListItemIcon>
          <ScatterPlotIcon/>
        </ListItemIcon>
        <ListItemText primary="Tarrif Data"/>
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
