import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLORS, PATHS } from "../../util/CommonUtil";
import { useProjectsStore } from "../../util/store";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import useErrorHandler from "../../util/useErrorHandler";


const tableStyle = {
  p: 1, pt: 2, pb: 2,
  m: 0, mb: 2,
  backgroundColor: COLORS.LIGHT_GRAY
}

const actionCellStyles = {
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
}

function ProjectTable({ getProjectList }) {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const projects = useProjectsStore((state) => state.projects);

  const handleDelete = async (projectId) => {
    await axiosPrivate.delete(`/project?projectId=${projectId}`).then((response) => {
      if (response.status === 200) {
        getProjectList();
      }
    }).catch((error) => {
      handleError(error, "Deleting a project from the table");
    })
  };

  const goToEditor = (projectId) => {
    navigate(PATHS.EDITOR_PREFIX + projectId);
  };

  return (
    <Grid container spacing={0}>
      {projects.length !== 0 && (
        <TableContainer sx={tableStyle} component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
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
                        size="small"
                        variant="outlined"
                        color="info"
                        sx={{ mr: 2 }}
                        onClick={() => goToEditor(project.projectId)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
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

