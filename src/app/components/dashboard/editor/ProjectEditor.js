import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Calculator from "./Calculator";
import NodeDetails from "./NodeDetails";
import NodeTree from "./NodeTree";

function ProjectEditor() {


  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
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
    </Container>
  );
}

export default ProjectEditor;