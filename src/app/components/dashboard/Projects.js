import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useProjectsStore } from "../../util/store";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import useErrorHandler from "../../util/useErrorHandler";
import NewProject from "./NewProject";
import ProjectTable from "./ProjectTable";

function Projects() {
  const handleError = useErrorHandler();
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
      handleError(error, "Loading project list");
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