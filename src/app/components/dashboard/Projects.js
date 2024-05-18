import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../util/CommonUtil";
import { useProjectsStore } from "../../util/store";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import NewProject from "./NewProject";
import ProjectTable from "./ProjectTable";

function Projects() {
  const navigate = useNavigate();
  const updateProjects = useProjectsStore((state) => state.updateProjects);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    await axiosPrivate.get("/project/getAll").then((response) => {
      if (response.data.status === 200) {
        updateProjects(response.data.data);
      }
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Loading project list",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <ProjectTable getProjectList={getProjectList} />
      <NewProject getProjectList={getProjectList} />
    </Container>
  )
}

export default Projects;