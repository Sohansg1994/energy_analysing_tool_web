import { Divider, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import SubscriptionPlanUpload from "./SubscriptionPlanUpload";
import TariffDataUpload from "./TariffDataUpload";

const gridBlockStyle = {
  // display: "block",
  // border: "solid 1px"
}

const boxStyle = {
  p: 2,
  mt: 0, mr: 2, mb: 8
};

const countUpStyle = {
  textAlign: "center",
  fontSize: 40,
  fontWeight: "bold",
};

function Settings() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  const getStatistics = async () => {
    await axios.get(`/sudo/statistic`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setUserCount(response.data.totalUsers);
        setProjectCount(response.data.totalProjects);
      }
    }).catch((error) => {
      console.log(error.message);
      navigate("/error");
    })
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} sx={gridBlockStyle}>
          <Box component={Paper} sx={boxStyle}>
            <Typography sx={{ textAlign: "center" }} >
              Users
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={userCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={gridBlockStyle}>
          <Box component={Paper} sx={boxStyle}>
            <Typography sx={{ textAlign: "center" }} >
              Projects
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={projectCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <Box component={Paper} sx={boxStyle}>
            <Divider textAlign="center">
              <Typography>
                Upload subscription plans
              </Typography>
            </Divider>
            <SubscriptionPlanUpload />
          </Box>
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <Box component={Paper} sx={boxStyle}>
          <Divider textAlign="center">
              <Typography>
                Upload tariff data sheet
              </Typography>
            </Divider>
            <TariffDataUpload />
          </Box>
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <Box component={Paper} sx={boxStyle}>
            <p>UserSubPlanChange</p>
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Settings;