import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import {MdPerson} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const rightLinkStyles = {
  fontFamily: "Montserrat",
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function Header() {
  const [daysLeft, setDayLeft] = useState("");
  const [isTokenValid, setIsTokenValid] = React.useState(false);
  
  const [accessToken, setAccessToken] = React.useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = React.useState(
    localStorage.getItem("refreshToken")
  );
  
  const [firstName, setFirstName] = React.useState(
    localStorage.getItem("firstName")
  );
  
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  
  let navigate = useNavigate();
  
  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("/auth/token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.data.status === 200) {
        const newAccessToken = response.data.data[0].accessToken;
        const newExpirationTime = response.data.data[0].accessTokenExpireTime;
        
        setIsTokenValid(true);
        
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("accessTokenExpiration", newExpirationTime);
        setAccessToken(newAccessToken);
      }
    } catch (error) {
      console.log("here");
      setIsTokenValid(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("firstName");
      setAccessToken(null);
      setRefreshToken(null);
      setFirstName(null);
      navigate("/signIn");
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      const expireTime = parseInt(
        localStorage.getItem("accessTokenExpiration")
      );
      console.log("this expire Time" + expireTime);
      if (accessToken != null && expireTime != null) {
        const currentTime = new Date().getTime(); //expiration time have to calculate or should be received from backend
        //console.log(currentTime - expirationTime);
        
        if (currentTime < expireTime) {
          console.log(true);
          setIsTokenValid(true);
        } else {
          console.log("now here");
          refreshAccessToken();
        }
      }
    }, 300000); // run in 5 min interval
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    console.log("run with accessToken");
    const expireTime = parseInt(localStorage.getItem("accessTokenExpiration"));
    if (accessToken != null && expireTime != null) {
      setIsTokenValid(true);
    }
  }, [accessToken]);
  
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      
      if (response.status === 200) {
        setIsTokenValid(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("firstName");
        setAccessToken(null);
        setRefreshToken(null);
        setFirstName(null);
        navigate("/signIn");
      }
    } catch (error) {
      console.log("Error");
      setIsTokenValid(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("firstName");
      setAccessToken(null);
      setRefreshToken(null);
      setFirstName(null);
      navigate("/signIn");
    }
  };
  
  return (
    <div id="introduction-component" component="section">
      <AppBar position="fixed">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Link
            variant="h6"
            underline="none"
            href="/"
            sx={{
              fontSize: 24,
              fontFamily: "Montserrat",
              color: "inherit",
              "& .green-letter": {
                color: "green",
                fontSize: 35,
              },
            }}
          >
            <span className="green-letter">G</span>reenBill
          </Link>
          {!isTokenValid && (
            <Box sx={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/signIn"
                sx={rightLinkStyles}
              >
                {"Sign In"}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/Signup"
                sx={{...rightLinkStyles, color: "secondary.main"}}
              >
                {"Sign Up"}
              </Link>
            </Box>
          )}
          
          {isTokenValid && (
            <Box sx={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
              {/*<Box sx={{ position: "relative", mr: 10 }}>
                <CircularProgress
                  variant="determinate"
                  value={100 - ((60 - 55) / 60) * 100}
                  size={52}
                  thickness={5}
                  sx={{
                    color: 55 <= 10 ? "error.main" : "secondary.main",
                    position: "absolute",
                    top: -4,
                    left: -4,
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontSize: 16,
                    ml: 1,
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    "& span": {
                      fontSize: 10,
                      lineHeight: "1px",
                      marginLeft: "4px",
                    },
                  }}
                >
                  {180} <span>Days</span>
                </Box>
                </Box>*/}
              
              <Link
                colour="white"
                underline="none"
                href="/projects"
                sx={{
                  ...rightLinkStyles,
                  fontSize: "0.9rem ",
                  "&:hover": {color: "secondary.light"},
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <MdPerson size="1.5rem"/>
                  {screenWidth > 550 && (
                    <span sx={{marginTop: "0.5rem"}}>
                      {"Hi " + firstName}
                    </span>
                  )}
                </Box>
              </Link>
              
              <Link
                variant="h6"
                underline="none"
                sx={{
                  ...rightLinkStyles,
                  color: "secondary.main",
                  marginTop: "0.8rem",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                {"Log Out"}
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
