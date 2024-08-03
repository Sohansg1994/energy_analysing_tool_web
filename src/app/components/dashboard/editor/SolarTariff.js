import { Alert, Box, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COLORS } from "../../../util/CommonUtil";
import useAxiosPrivate from "../../../util/useAxiosPrivate";
import useErrorHandler from "../../../util/useErrorHandler";

function SolarTariff() {
  const axiosPrivate = useAxiosPrivate();
  const handleError = useErrorHandler();

  const { projectId } = useParams();

  const [solarTariffRate, setSolarTariffRate] = useState(0);
  const [solarTariffRateError, setSolarTariffRateError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSolarTariffRateChange = (e) => {
    setSolarTariffRate(e.target.value);
    if (e.target.validity.valid && e.target.value > 0) {
      setSolarTariffRateError(false);
      setShowAlert(false);
      setAlertMessage("");

      saveTariffRate(e.target.value);
    } else {
      setSolarTariffRateError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid and positive solar tariff rate");
    }
  }

  useEffect(() => {
    loadSolarTariffRate();
  }, []);

  const loadSolarTariffRate = () => {
    axiosPrivate.get(`/project/solar-tariff-rate/?projectId=${projectId}`).then((response) => {
      if (response?.status === 200) {
        setSolarTariffRate(response?.data);
      }
    }).catch((error) => {
      handleError(error, "Loading solar tariff rate for the project");
    });
  }

  const saveTariffRate = async (tariffRate) => {
    const data = {
      projectId: projectId,
      solarTariffRate: tariffRate
    }
    await axiosPrivate.post(`/project/solar-tariff-rate/`, data)
    .then((response) => {
      if (response.status === 200) {}
    }).catch((error) => {
      handleError(error, "Saving solar tariff rate for the project");
    });
  }

  return (
    <Box component={Paper} sx={{ p: 2, m: 0, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography>
            Please provide the solar tariff rate you agreed with the electricity provider.
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <TextField
            type="number"
            fullWidth
            id="solarTariffRate"
            required
            value={solarTariffRate}
            error={solarTariffRateError}
            onChange={handleSolarTariffRateChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">LKR / Unit</InputAdornment>,
              inputProps: { min: 0.01, step: 0.01 }
            }}
            size="small"
            variant="outlined" />
        </Grid>

        {showAlert && (
          <Grid item xs={12}>
            <Alert severity="warning" variant="outlined" size="small">{alertMessage}</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SolarTariff;