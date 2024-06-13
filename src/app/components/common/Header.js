import { AppBar, Avatar, Box, Button, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS, PATHS, REFRESH_TOKEN_KEY } from "../../util/CommonUtil";
import { useAuthStore } from "../../util/store";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import useErrorHandler from "../../util/useErrorHandler";
import useRefreshToken from "../../util/useRefreshToken";

const UNAUTH_PATHS = [PATHS.SIGN_IN, PATHS.SIGN_UP, PATHS.ERROR, PATHS.HOME, PATHS.OUR_SERVICES];

const titleStyles = {
  m: 0, mr: 2,
  color: "white",
  flexGrow: 1,
  display: { xs: 'none', sm: 'block' },
  fontSize: 24,
  fontFamily: "Montserrat"
};

function stringToColor(string) {
  let hash = 0;
  let color = '#';
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

function Header() {
  // add load user details component here, to fix the home page issue
  // check for subscription plan and redirect to plan selection page (unless we are at subscription/error/home pages)

  const refresh = useRefreshToken();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const handleError = useErrorHandler();

  const notSignInPath = location.pathname !== PATHS.SIGN_IN;
  const notSignUpPath = location.pathname !== PATHS.SIGN_UP;

  const [anchorUser, setAnchorUser] = useState(null);

  const authData = useAuthStore((state) => state.authData);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(Boolean(authData?.accessToken));
  }, [authData]);

  useEffect(() => {
    refresh().catch((error) => {
      // will this ever reach this catch block
      if (error.response?.status === 404 || error.response?.status === 401) {
        if (!UNAUTH_PATHS.includes(location.pathname)) {
          navigate(PATHS.SIGN_IN);
        }
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Loading user auth data",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  }

  const handleLogOutClick = async () => {
    await axiosPrivate.post("/user/logout").then((response) => {
      if (response.status === 200) {
        setAuthData({});
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setAnchorUser(null);
        navigate(PATHS.SIGN_IN);
      }
    }).catch((error) => {
      handleError(error, "Logging out");
    });
  }

  const handleProjectsClick = () => {
    setAnchorUser(null);
    navigate(PATHS.PROJECTS);
  }

  const handleSignInClick = () => {
    navigate(PATHS.SIGN_IN);
  }

  const handleSignUpClick = () => {
    navigate(PATHS.SIGN_UP);
  }

  return (
    <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: COLORS.SUCCESS_GREEN }}>
      <Toolbar>
        <Link
          variant="h6"
          underline="none"
          href={PATHS.HOME}
          sx={titleStyles}
        >
          GREENBILL
        </Link>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {(!isLogged && notSignInPath) && (
            <Button
              onClick={handleSignInClick}
              sx={{ color: "white" }}
            >
              SIGN IN
            </Button>
          )}

          {(!isLogged && notSignUpPath) && (
            <Button
              onClick={handleSignUpClick}
              sx={{ color: "white" }}
            >
              SIGN UP
            </Button>
          )}

          {isLogged && authData?.firstName && (
            <>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar {...stringAvatar(authData?.firstName)} />
              </IconButton>
              <Menu
                sx={{ mt: 4 }}
                anchorEl={anchorUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProjectsClick}>
                  <Typography textAlign="center">
                    PROJECTS
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOutClick}>
                  <Typography textAlign="center">
                    LOG OUT
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
