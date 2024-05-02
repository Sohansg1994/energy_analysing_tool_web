import { Paper, TableCell } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../util/store";


const tableStyle = {
  p: 1, pt: 2, pb: 2,
  m: 0, mb: 2,
}

const actionCellStyles = {
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
}

function ProjectTable({ getProjectList }) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const projects = useProjectsStore((state) => state.projects);

  const handleDelete = async (projectId) => {
    await axios.delete(`/project?projectId=${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        getProjectList();
      }
    }).catch((error) => {
      console.log(error.message);
      navigate("/error");
    })
  };

  const goToEditor = (projectId) => {
    navigate("/editor", { state: { projectId: projectId } });
  };

  return (
    <Grid container spacing={0}>
      {projects.length !== 0 && (
        <TableContainer sx={tableStyle} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Project name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Last updated
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project.projectId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{project.name}</TableCell>
                  <TableCell align="right">{project.projectType}</TableCell>
                  <TableCell align="right">{project.lastUpdated}</TableCell>
                  <TableCell align="right">
                    <Box sx={actionCellStyles}>
                      <Button
                        variant="outlined"
                        color="info"
                        sx={{ mr: 2 }}
                        onClick={() => goToEditor(project.projectId)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(project.projectId)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  )
}

export default ProjectTable;

