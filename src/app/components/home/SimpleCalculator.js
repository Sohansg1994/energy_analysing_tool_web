import { Box, Button, Container, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { COLORS, PATHS } from "../../util/CommonUtil";
import { axiosPublic } from "../../util/axios";
import { useNavigate } from "react-router-dom";

const containerStyles = {
  p: 2,
  m: 0, mb: 5,
  backgroundColor: COLORS.LIGHT_GRAY
}

function SimpleCalculator() {
  const navigate = useNavigate();

  const [units, setUnits] = useState(0);
  const [unitsError, setUnitsError] = useState(false);
  const [placeholder, setPlaceholder] = useState("Number of units");
  const [isResultAvailable, setResultAvailable] = useState(false);
  const [result, setResult] = useState(null);

  const handleUnitChange = (e) => {
    setUnits(e.target.value);
    if (e.target.validity.valid && e.target.value > 0) {
      setUnitsError(false);
      setPlaceholder("");
    } else {
      setUnitsError(true);
      setPlaceholder("Please provide number of units");
      setResultAvailable(false);
    }
  }

  const calculate = async () => {
    await axiosPublic.get(`/playground/simpleBill?units=${units}`)
    .then((response) => {
      if (response.status === 200 && response?.data?.data[0]) {
        console.log(response.data.data[0]);
        setResultAvailable(true);
        setResult(response.data.data[0]);
      }
    }).catch((error) => {
      navigate(PATHS.ERROR, {
        state: {
          action: "Calculating the bill from given number of units",
          code: error.code,
          message: error.message,
          stack: error.stack
        }
      });
    });
  };

  return (
    <Box sx={containerStyles} component={Paper} id="simple-calculator">
      <Grid container spacing={5}>

        <Grid item xs={5} >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                CALCULATE YOUR BILL
              </Typography>
              <Typography>
                Please enter the number of electricity units you have consumed, to calculate your monthly bill
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                required
                helperText={placeholder}
                id="num-of-units"
                size="small"
                onChange={handleUnitChange}
                error={unitsError}
                value={units}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Units</InputAdornment>,
                  inputProps: { min: 1.0, step: 1 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                color="success"
                disabled={unitsError || units < 1}
                onClick={calculate}
              >
                CALCULATE NOW
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {isResultAvailable && (
          <Grid item xs={7} >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: COLORS.WHITE, p: 1 }}>
                  <Typography sx={{ p: 0, pl: 2 }}>
                    Bill breakdown
                  </Typography>

                  <Table size="medium">
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">Consumed units</TableCell>
                        <TableCell align="right">{result.totalUnits} Units</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Monthly fixed charge</TableCell>
                        <TableCell align="right">{result.fixedCharge} LKR</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Charge for consumption</TableCell>
                        <TableCell align="right">{result.usageCharge} LKR</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Levy</TableCell>
                        <TableCell align="right">{result.levy} LKR</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Total charge</TableCell>
                        <TableCell align="right">{result.totalCharge} LKR</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}

      </Grid>
    </Box>
  )
}

export default SimpleCalculator;