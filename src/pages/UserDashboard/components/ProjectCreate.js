import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { ProjectListUpdate } from "./ProjectList";

import axios from "axios";

function ProjectCreate(props) {
  const { getProjectList } = props;
  const Type = [
    { label: "Domestic", id: 1 },
    { label: "Industry", id: 2 },
  ];

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");

  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setIsError(false);
    if (projectName.length <= 0 || projectType.length <= 0) {
      setIsError(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const data = {
      name: projectName,
      projectType: projectType,
    };
    console.log(data);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.post("/project", data, config);
      if (response.status === 200) {
        getProjectList();
        setProjectName("");
        setProjectType("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(isNaN(projectName));
  });

  return (
    <Container
      component={Paper}
      sx={{
        mt: 4,
        mb: 4,
        pb: 4,
        pt: 4,
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Project Name"
        defaultValue="Project Name"
        size="small"
        sx={{ width: "30%" }}
        value={projectName}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => setProjectName(e.target.value)}
        error={isError == true && projectName.length <= 0 ? true : false}
        helperText={
          isError == true && projectName.length <= 0
            ? "Please fill project name"
            : ""
        } // Display error message if any
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Type}
        size="small"
        sx={{ width: "30%" }}
        value={projectType}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type"
            error={isError == true && projectType.length <= 0 ? true : false}
            helperText={
              isError == true && projectType.length <= 0
                ? "Please select project type"
                : ""
            }
          />
        )}
        onChange={(event, newValue) => {
          setProjectType(newValue?.label || "");
        }}
      />
      <Button
        variant="contained"
        sx={{
          width: "30%",

          fontFamily: "Montserrat",
          backgroundColor: "#1F8A70",
          "&:hover": {
            backgroundColor: "#1c7861",
          },
        }}
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Container>
  );
}

export default ProjectCreate;
