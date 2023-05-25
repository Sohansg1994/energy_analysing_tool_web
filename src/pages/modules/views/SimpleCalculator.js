import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Paper from "@mui/material/Paper";
import Snackbar from "../components/Snackbar";
import { Button, Card, CardActionArea } from "@mui/material";
import axios from "axios";

function SimpleCalculator() {
  const [units, setUnits] = useState(null);
  const [result, setResult] = useState({
    monthlyFixedCharge: 0,
    chargeForConsumption: 0,
    totalCharge: 0,
  });

  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (units.length <= 0 || isNaN(units)) {
      setIsError(true);
      return;
    }
    try {
      const response = await axios.get(`/playground/simpleBill?units=${units}`);
      console.log(response.data.data[0]);
      if (response.status === 200) {
        setResult(response.data.data[0]);
        setIsValid(true);
      }
    } catch (error) {}
  };

  return (
    <Container
      id="bill-calculator-component"
      component="section"
      sx={{ mt: 10, display: "flex" }}
    >
      <Grid container sx={{ bgcolor: "warning.main" }}>
        <Grid item xs={10} md={5} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
              px: 3,
            }}
          >
            <Box sx={{ maxWidth: 400, fontFamily: "Montserrat" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontFamily: "Montserrat" }}
              >
                Calculate Now
              </Typography>
              <Typography>
                Please enter the number of electricity units you have consumed,
                to calculate the price.
              </Typography>
              <TextField
                id="outlined-basic"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                noBorder
                placeholder="No of units"
                variant="standard"
                sx={{ width: "100%", mt: 3, mb: 2 }}
                error={
                  isError === true && (units.length <= 0 || isNaN(units))
                    ? true
                    : false
                }
                helperText={
                  isError === true && (units.length <= 0 || isNaN(units))
                    ? units.length <= 0
                      ? "Please fill all the feild"
                      : "Invalid input"
                    : ""
                } // Display error message if any
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  width: "100%",
                  mt: 3,
                  mb: 2,

                  fontFamily: "Montserrat",
                  backgroundColor: "#1F8A70",
                  "&:hover": {
                    backgroundColor: "#1c7861",
                  },
                }}
              >
                Calculate
              </Button>
            </Box>
          </Box>
        </Grid>
        {isValid ? (
          <Grid
            item
            xs={14}
            md={7}
            sx={{
              zIndex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //flexDirection: "column",
            }}
          >
            <Card
              sx={{
                width: "90%",
                height: "90%",
                background: "rgba(255, 255, 255, 0.1) ",
                /* background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%)",*/
                borderRadius: 5,
                boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
              }}
            >
              <CardActionArea>
                <Box
                  sx={{
                    justifyContent: "center",
                    py: 8,
                    px: 4,
                  }}
                >
                  <Box component="div">
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={5}
                        sx={{ px: 1, py: 1, textAlign: "right" }}
                      >
                        <Typography align="right">Consumed units</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sx={{ px: 0, py: 0, textAlign: "left" }}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "80%",
                            height: "100%",
                            mx: 0,
                            my: 0,
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            align="left"
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {result.totalUnits}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid
                        item
                        xs={5}
                        sx={{ px: 1, py: 1, textAlign: "right" }}
                      >
                        <Typography align="right">
                          Monthly fixed charge
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sx={{ px: 0, py: 0, textAlign: "left" }}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "80%",
                            height: "100%",
                            mx: 0,
                            my: 0,
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            align="left"
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {result.fixedCharge}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid
                        item
                        xs={5}
                        sx={{ px: 1, py: 1, textAlign: "right" }}
                      >
                        <Typography align="right">
                          Charge for consumption
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sx={{ px: 0, py: 0, textAlign: "left" }}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "80%",
                            height: "100%",
                            mx: 0,
                            my: 0,
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            align="left"
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {result.usageCharge}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid
                        item
                        xs={5}
                        sx={{ px: 1, py: 1, textAlign: "right" }}
                      >
                        <Typography align="right">Levy</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sx={{ px: 0, py: 0, textAlign: "left" }}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "80%",
                            height: "100%",
                            mx: 0,
                            my: 0,
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            align="left"
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {result.levy}
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid
                        item
                        xs={5}
                        sx={{ px: 1, py: 1, textAlign: "right" }}
                      >
                        <Typography align="right">Total charge</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sx={{ px: 0, py: 0, textAlign: "left" }}
                      >
                        <Paper
                          variant="outlined"
                          sx={{
                            width: "80%",
                            height: "100%",
                            mx: 0,
                            my: 0,
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            align="left"
                            sx={{ backgroundColor: "#fff" }}
                          >
                            {result.billAmount}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ) : (
          <Snackbar
            // open={open}
            closeFunc={() => setUnits(0)}
            message="We will send you our best offers, once a week."
          />
        )}
      </Grid>
    </Container>
  );
}

export default SimpleCalculator;
