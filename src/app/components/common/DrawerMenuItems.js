import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { NavLink } from "react-router-dom";

const navListStyle = { textDecoration: "none", color: "#424242" }

export const userListItems = (
  <React.Fragment>
    <NavLink to="/projects" style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AccountTreeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/tariffdata" style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <TableViewRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Tariff Data" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const adminListItems = (
  <React.Fragment>
    <NavLink
      to="/projects" style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AccountTreeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/tariffdata" style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <TableViewRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Tariff Data" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/settings" style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

