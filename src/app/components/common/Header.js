import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../../../pages/modules/components/AppBar";
import Toolbar from "../../../pages/modules/components/Toolbar";
import {MdPerson} from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const rightLinkStyles = {
  fontFamily: "Montserrat", fontSize: 16, color: "common.white", ml: 3,
  "&:hover": {color: "secondary.light", cursor: "pointer"}
};

const linkBoxStyles = {
  flex: 1, display: "flex", justifyContent: "flex-end"
};

const titleStyles = {fontSize: 24, fontFamily: "Montserrat"};

function Header() {
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      const expireTime = parseInt(localStorage.getItem("accessTokenExpiration"));
      if (accessToken != null && expireTime != null) {
        const currentTime = new Date().getTime();
        if (currentTime < expireTime) {
          setIsTokenValid(true);
        } else {
          refreshAccessToken();
        }
      }
    }, 300000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const expireTime = parseInt(localStorage.getItem("accessTokenExpiration"));
    if (accessToken != null && expireTime != null) {
      setIsTokenValid(true);
    }
  }, [accessToken]);
  
  const refreshAccessToken = async () => {
    await axios.get("/auth/token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      },
    }).then((response) => {
      if (response.data.status === 200) {
        const newAccessToken = response.data.data[0].accessToken;
        const newExpirationTime = response.data.data[0].accessTokenExpireTime;
        setIsTokenValid(true);
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessTokenExpiration", newExpirationTime);
        setAccessToken(newAccessToken);
      } // what happens otherwise
    }).catch((error) => {
      console.log(error);
      setIsTokenValid(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("firstName");
      setAccessToken(null);
      setRefreshToken(null);
      navigate("/signIn");
    });
  };
  
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await axios.post(
      "/user/logout",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        setIsTokenValid(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("firstName");
        setAccessToken(null);
        setRefreshToken(null);
        navigate("/signIn");
      }
    }).catch((error) => {
      console.log(error);
      navigate("/error");
    });
  };
  
  return (
    <div>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Link variant="h6" underline="none" color="white" href="/" sx={titleStyles}>
            GREENBILL
          </Link>
          
          {!isTokenValid && (
            <Box sx={linkBoxStyles}>
              <Link color="inherit" variant="h6" underline="none" href="/signIn" sx={rightLinkStyles}>
                Sign In
              </Link>
              <Link color="inherit" variant="h6" underline="none" href="/Signup" sx={rightLinkStyles}>
                Sign Up
              </Link>
            </Box>
          )}
          {isTokenValid && (
            <Box sx={linkBoxStyles}>
              <Link colour="inherit" underline="none" href="/projects" sx={rightLinkStyles}>
                <MdPerson size="1.5rem"/>
              </Link>
              <Link variant="h6" underline="none" sx={rightLinkStyles} onClick={handleLogout}>
                Log Out
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
