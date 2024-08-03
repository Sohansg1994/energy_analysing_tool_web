import { Grid } from "@mui/material";
import AddSolarPanel from "./AddSolarPanel";
import SolarTariff from "./SolarTariff";

function SolarDetails() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <SolarTariff />
      </Grid>

      <Grid item xs={12}>
        <AddSolarPanel />
      </Grid>
    </Grid>
  );
}

export default SolarDetails;