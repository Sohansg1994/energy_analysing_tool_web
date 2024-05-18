export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN"
};

export const NODE_TYPES = {
  ROOT: "Root",
  SECTION: "Section",
  APPLIANCE: "Appliance"
}

export const PATHS = {
  HOME: "/",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  SUBSPRIPTION: "/subscriptions",
  PROJECTS: "/projects",
  TARIFF: "/tariff",
  EDITOR: "/editor",
  SETTINGS: "/settings",
  ERROR: "/error",
  WILDCARD: "/*"
}

export const INTEGER_REGEX = /^[1-9]\d*$/;
export const USERNAME_REGEX = new RegExp("^[A-z][A-z0-9-_]{2,19}$");
export const LAST_NAME_REGEX = new RegExp("^[A-z][A-z0-9-_]{0,19}$");
export const PASSWORD_REGEX = new RegExp("^[A-z0-9-_!@#$%]{5,20}$");
export const PWD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$";