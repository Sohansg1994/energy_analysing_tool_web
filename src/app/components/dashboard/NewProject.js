import {Autocomplete, Container, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";


const formContainerStyle = {
  p: 1, pt: 2, pb: 2,
  m: 0, mb: 2,
  display: "flex",
  alignItems: "left",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  borderRadius: "4px"
}

const newGroupTextStyle = {
  p: 1,
  m: 0,
}

const submitButtonStyle = {
  width: "20%",
  fontFamily: "Montserrat",
  backgroundColor: "#1F8A70",
  "&:hover": {
    backgroundColor: "#1c7861",
  },
}

const Type = [
  {label: "Domestic", id: 1},
  {label: "Industry", id: 2},
];

function NewProject({getProjectList}) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState();
  const [errors, setErrors] = useState({});
  
  const handleNameChange = (e) => setProjectName(e.target.value)
  const handleDropdownChange = (event, newValue) => {
    setProjectType(newValue?.label || "");
  }
  const renderAutoComplete = (params) => <TextField {...params} label="Type"/>
  
  useEffect(() => {
    getProjectList();
  }, [accessToken]);
  
  const validateForm = () => {
    const errorMessages = {};
    if (!projectName) {
      errorMessages.projectName = 'Name is required';
    }
    if (!projectType) {
      errorMessages.projectType = 'Project type is required';
    }
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };
  
  const handleSubmit = async (e) => {
    const data = {
      name: projectName,
      projectType: projectType,
    };
    e.preventDefault();
    if (validateForm()) {
      await axios.post("/project", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          setProjectName("");
          setProjectType(null);
          getProjectList();
        }
      }).catch((error) => {
        console.log(error.message)
        navigate("/error");
      });
    }
    ;
  };
  
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="p" component="p" sx={newGroupTextStyle}>
          Create a new project
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Container component={Paper} disableGutters sx={formContainerStyle}>
          <TextField
            required
            placeholder="Enter project name"
            id="outlined-required"
            label="Project name"
            size="small"
            sx={{width: "40%"}}
            error={Boolean(errors.projectName)}
            helperText={errors.projectName}
            value={projectName}
            onChange={handleNameChange}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            label="Project type"
            options={Type}
            size="small"
            sx={{width: "30%"}}
            value={projectType}
            // error={Boolean(errors.projectType)}
            // helperText={errors.projectType}
            renderInput={renderAutoComplete}
            onChange={handleDropdownChange}
          />
          <Button
            variant="contained"
            sx={submitButtonStyle}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
}

export default NewProject;
