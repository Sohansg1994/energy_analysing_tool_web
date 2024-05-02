import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NodeDetails from "./NodeDetails";
import NodeTree from "./NodeTree";

function ProjectEditor({ projectId }) {

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={0}>

        <Grid item xs={12} lg={4} sx={{ p: 1 }}>
          <NodeTree projectId={projectId} />
        </Grid>

        <Grid item xs={12} lg={8} sx={{ p: 1 }}>
          <NodeDetails />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectEditor;