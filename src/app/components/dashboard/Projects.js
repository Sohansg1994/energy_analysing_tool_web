import React from "react";
import NewProject from "./NewProject";
import ProjectTable from "./ProjectTable";
import Container from "@mui/material/Container";
import {useProjectsStore} from "../../util/store";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const updateProjects = useProjectsStore((state) => state.updateProjects);
  
  const getProjectList = async () => {
    await axios.get("/project/getAll", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.data.status === 200) {
        updateProjects(response.data.data);
      }
    }).catch((error) => {
      console.log(error.message);
      navigate("/error");
    });
  };
  
  return (
    <Container maxWidth="lg" sx={{mt: 12}}>
      <ProjectTable getProjectList={getProjectList}/>
      <NewProject getProjectList={getProjectList}/>
    </Container>
  )
}

export default Projects;