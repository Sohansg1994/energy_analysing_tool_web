import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../util/CommonUtil";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import SubscriptionPlanUpload from "./SubscriptionPlanUpload";
import TariffDataUpload from "./TariffDataUpload";
import UserSubscriptionPlanChange from "./UserSubscriptionPlanChange";

const gridBlockStyle = {
  p: 1,
  m: 0, mb: 4
}

const countUpStyle = {
  textAlign: "center",
  fontSize: 40,
  fontWeight: "bold",
};

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  const getStatistics = async () => {
    await axiosPrivate.get(`/sudo/statistic`).then((response) => {
      if (response.status === 200) {
        setUserCount(response.data.totalUsers);
        setProjectCount(response.data.totalProjects);
      }
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Loading admin statistics",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    })
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} sx={gridBlockStyle}>
          <Box component={Paper} sx={{ p: 2 }}>
            <Typography sx={{ textAlign: "center" }} >
              Users
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={userCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={gridBlockStyle}>
          <Box component={Paper} sx={{ p: 2 }}>
            <Typography sx={{ textAlign: "center" }} >
              Projects
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={projectCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <SubscriptionPlanUpload />
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <TariffDataUpload />
        </Grid>

        <Grid item xs={12} sx={gridBlockStyle}>
          <UserSubscriptionPlanChange />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Settings;