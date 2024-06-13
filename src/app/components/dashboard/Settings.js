import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { COLORS } from "../../util/CommonUtil";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import useErrorHandler from "../../util/useErrorHandler";
import SubscriptionPlanUpload from "./SubscriptionPlanUpload";
import TariffDataUpload from "./TariffDataUpload";
import UserSubscriptionPlanChange from "./UserSubscriptionPlanChange";

const countUpStyle = {
  textAlign: "center",
  fontSize: 40,
  fontWeight: "bold",
};

const statsBoxStyle = { p: 2, backgroundColor: COLORS.LIGHT_GRAY }

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const handleError = useErrorHandler();

  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  const getStatistics = async () => {
    await axiosPrivate.get(`/sudo/statistic`).then((response) => {
      if (response.status === 200) {
        setUserCount(response.data.totalUsers);
        setProjectCount(response.data.totalProjects);
      }
    }).catch((error) => {
      handleError(error, "Loading admin statistics");
    })
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box component={Paper} sx={statsBoxStyle}>
            <Typography sx={{ textAlign: "center" }} >
              Users
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={userCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box component={Paper} sx={statsBoxStyle}>
            <Typography sx={{ textAlign: "center" }} >
              Projects
            </Typography>
            <Typography sx={countUpStyle} >
              <CountUp start={0} end={projectCount} duration={10 / 5} delay={0.5} />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <SubscriptionPlanUpload />
        </Grid>

        <Grid item xs={12}>
          <TariffDataUpload />
        </Grid>

        <Grid item xs={12} sx={{ mb: 4 }}>
          <UserSubscriptionPlanChange />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Settings;