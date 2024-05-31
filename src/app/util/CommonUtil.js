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

export const SUBSPRIPTION_PLANS = {
  FREE: "Free",
  DOMESTIC_LITE: "Domestic Lite",
  DOMESTIC_PRO: "Domestic Pro",
  INDUSTRIAL: "Industrial",
  INDUSTRIAL_FREEDOM: "Industrial Freedom",
  ADMIN_PLAN: "Admin Plan",
  UNSUBSCRIBE: "UnSubscribe"
}

export const SUBSCRIPTION_CYCLES = {
  SIX_MONTH: "6 months",
  UNLIMITED: "Unlimited",
  ONE_MONTH: "month",
  THREE_MONTH: "3 months",
  ONE_YEAR: "year",
  TWO_YEAR: "2 years"
}

export const INTEGER_REGEX = /^[1-9]\d*$/;
export const USERNAME_REGEX = new RegExp("^[A-z][A-z0-9-_]{2,19}$");
export const LAST_NAME_REGEX = new RegExp("^[A-z][A-z0-9-_]{0,19}$");
export const PASSWORD_REGEX = new RegExp("^[A-z0-9-_!@#$%]{5,20}$");
export const PROJECT_REGEX = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9 ]{1,18}$");;