import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from '../../util/CommonUtil';

const navListStyle = { textDecoration: "none", color: "#424242" }

export const userListItems = (
  <React.Fragment>
    <NavLink to={PATHS.PROJECTS} style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AccountTreeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to={PATHS.TARIFF} style={navListStyle}>
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
      to={PATHS.PROJECTS} style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AccountTreeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to={PATHS.TARIFF} style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <TableViewRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Tariff Data" />
      </ListItemButton>
    </NavLink>
    <NavLink to={PATHS.SETTINGS} style={navListStyle}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

