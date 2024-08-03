import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Calculator from "./Calculator";
import NodeDetails from "./NodeDetails";
import NodeTree from "./NodeTree";
import SolarDetails from "./SolarDetails";

function ProjectEditor() {

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Project" value="1" />
            <Tab label="Solar" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <NodeTree />
            </Grid>

            <Grid item xs={12} lg={8}>
              <NodeDetails />
            </Grid>

            <Grid item xs={12}>
              <Calculator />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value="2">
          <SolarDetails />
        </TabPanel>
      </TabContext>


    </Container>
  );
}

export default ProjectEditor;