import { Alert, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS, PROJECT_REGEX } from "../../util/CommonUtil";
import useAxiosPrivate from "../../util/useAxiosPrivate";

const PROJECT_TYPE = ["Domestic"];

const submitGridStyle = {
  display: "flex",
  justifyContent: "end"
};

function NewProject({ getProjectList }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectNameError, setProjectNameError] = useState(false);

  const handleProjectTypeChange = (e) => {
    if (e.target.value && PROJECT_TYPE.includes(e.target.value)) {
      setProjectType(e.target.value);
      setAlertMessage("");
      setShowAlert(false);
    } else {
      setProjectType("");
      setAlertMessage("Please select a valid project type");
      setShowAlert(true);
    }
  }

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
    if (e.target.validity.valid) {
      if (PROJECT_REGEX.test(e.target.value)) {
        setShowAlert(false);
        setAlertMessage("");
        setProjectNameError(false);
      } else {
        setShowAlert(true);
        setAlertMessage("Project name must be alphanumeric with spaces and 1-20 characters long");
        setProjectNameError(true);
      }
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide an valid project name");
      setProjectNameError(true);
    }
  }

  const handleSubmit = async (e) => {
    const data = {
      name: projectName,
      projectType: projectType,
    };
    await axiosPrivate.post("/project", data).then((response) => {
      if (response.status === 200) {
        setProjectName("");
        setProjectType("");
        getProjectList();
      }
    }).catch((error) => {
      if (error.status === 409) {
        showAlert(true);
        setAlertMessage("You have reached maximum project limit for the selected subscription plan");
      }
      else if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Creating a new project",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
    ;
  };

  return (
    <Container component={Paper} sx={{ p: 2, m: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Create a new project
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            required
            placeholder="Enter project name"
            id="outlined-required"
            label="Project name"
            size="small"
            error={projectNameError}
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl
            sx={{ minWidth: 300 }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="projectTypeLabel">
              Project type
            </InputLabel>
            <Select
              labelId="projectTypeLabel"
              value={projectType}
              onChange={handleProjectTypeChange}
            >
              {
                PROJECT_TYPE.map(type => (
                  <MenuItem key={type} value={type} >
                    {type}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4} sx={submitGridStyle}>
          <Button
            disabled={projectNameError || !PROJECT_TYPE.includes(projectType)}
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Grid>

        {showAlert && (
          <Grid item xs={12}>
            <Alert size="small" severity="warning" variant="outlined">
              {alertMessage}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>

  );
}

export default NewProject;
