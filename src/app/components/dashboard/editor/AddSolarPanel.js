import { Alert, Box, Button, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COLORS, INTEGER_REGEX } from "../../../util/CommonUtil";
import useAxiosPrivate from "../../../util/useAxiosPrivate";
import useErrorHandler from "../../../util/useErrorHandler";

function AddSolarPanel() {
  const axiosPrivate = useAxiosPrivate();
  const handleError = useErrorHandler();

  const [solarPanels, setSolarPanels] = useState([]);

  const [wattRate, setWattRate] = useState(0);
  const [hours, setHours] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [wattRateError, setWattRateError] = useState(false);
  const [hoursError, setHoursError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { projectId } = useParams();

  useEffect(() => {
    if (showAlert === false && alertMessage === "") {
      getSolarPanels(projectId);
    }
  }, []);

  const getSolarPanels = async () => {
    await axiosPrivate.get(`/solar_panel/?projectId=${projectId}`)
      .then((response) => {
        setSolarPanels(response?.data.data);
      })
      .catch((error) => {
        handleError(error, "Loading solar panel list for the project");
      });
  };

  const handleWattRateChange = (e) => {
    setWattRate(e.target.value);
    if (e.target.validity.valid && e.target.value > 0) {
      setWattRateError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setWattRateError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid and positive watt rate");
    }
  }

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && e.target.value <= 24) {
      setHoursError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setHoursError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid number of hours");
    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && INTEGER_REGEX.test(e.target.value)) {
      setQuantityError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setQuantityError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid quantity");
    }
  }

  const handleSolarSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity() && allFieldsProvided()) {
      saveNewSolarPanel();
    } else {
      setShowAlert(true);
      setAlertMessage(Boolean(alertMessage) ? alertMessage : "Please provide valid inputs for required fields");
    }
  };

  const allFieldsProvided = () => {
    return !(wattRateError || hoursError || quantityError) &&
      (wattRate > 0 && hours > 0 && quantity > 0);
  }

  const saveNewSolarPanel = async () => {
    const panelData = {
      id: 0,
      wattRate: wattRate,
      hours: hours,
      quantity: quantity,
      projectId: projectId
    };
    await axiosPrivate.post("/solar_panel/", panelData).then((response) => {
      if (response.status === 200) {
        setWattRate(0);
        setHours(0);
        setQuantity(0);
        getSolarPanels(projectId);
      }
    }).catch((error) => {
      handleError(error, "Adding a new solar panel");
    });
  }

  const handlePanelRemove = async (panelId) => {
    await axiosPrivate.delete(`/solar_panel/?panelId=${panelId}`).then((response) => {
      if (response.status === 200) {
        getSolarPanels(projectId);
      }
    }).catch((error) => {
      handleError(error, "Deleting a solar panel");
    });
  }

  return (
    <Box component={Paper} sx={{ p: 2, m: 0, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>Solar Panels</Typography>
        </Grid>

        {Array.isArray(solarPanels) && solarPanels.length > 0 && (
          <Grid item xs={12} component={Paper} sx={{ p: 2, mb: 2, backgroundColor: COLORS.WHITE }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      Watt Rate
                    </TableCell>
                    <TableCell align="left">
                      Hours
                    </TableCell>
                    <TableCell>
                      Quantity
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {solarPanels.map((panel) => (
                    <TableRow key={panel.id}>
                      <TableCell align="left">
                        {panel.wattRate}
                      </TableCell>
                      <TableCell align="left">
                        {panel.hours}
                      </TableCell>
                      <TableCell>
                        {panel.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handlePanelRemove(panel.id)}
                          variant="outlined"
                          size="small"
                          color="warning">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Grid>
        )}

        <Grid item xs={12} component={Paper} sx={{ p: 2, mb: 2, backgroundColor: COLORS.WHITE }}>
          <Grid container spacing={2} component={"form"}>
            
            <Grid item xs={12}>
              <Typography>Add new panel</Typography>
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                fullWidth
                id="wattRate"
                required
                value={wattRate}
                error={wattRateError}
                onChange={handleWattRateChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">W</InputAdornment>,
                  inputProps: { min: 0.01, step: 0.01 }
                }}
                label="Watt rate"
                size="small"
                variant="outlined" />
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                fullWidth
                id="hours"
                required
                value={hours}
                error={hoursError}
                onChange={handleHoursChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>,
                  inputProps: { min: 0.5, max: 24, step: 0.5 }
                }}
                label="Hours per day"
                size="small"
                variant="outlined" />
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                fullWidth
                id="quantity"
                required
                value={quantity}
                error={quantityError}
                onChange={handleQuantityChange}
                InputProps={{
                  inputProps: { min: 1, step: 1 }
                }}
                label="Quantity"
                size="small"
                variant="outlined" />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleSolarSubmit}
                type="button"
                variant="outlined"
                size="small"
                color="primary">
                Save
              </Button>
            </Grid>

          </Grid>
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

export default AddSolarPanel;