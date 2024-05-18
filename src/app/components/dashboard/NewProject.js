import { Autocomplete, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../util/useAxiosPrivate";
import { PATHS } from "../../util/CommonUtil";


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
  backgroundColor: "#1F8A70",
  "&:hover": {
    backgroundColor: "#1c7861",
  },
}

const Type = [
  { label: "Domestic", id: 1 },
  { label: "Industry", id: 2 },
];

function NewProject({ getProjectList }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState();
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => setProjectName(e.target.value)
  const handleDropdownChange = (event, newValue) => {
    setProjectType(newValue?.label || "");
  }
  const renderAutoComplete = (params) => <TextField {...params} label="Type" />

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
      await axiosPrivate.post("/project", data).then((response) => {
        if (response.status === 200) {
          setProjectName("");
          setProjectType(null);
          getProjectList();
        }
      }).catch((error) => {
        // if status = 409 => project limit reached / ask to update the subscription plan
        if (error.status === 403 || error.status === 401) {
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
            sx={{ width: "40%" }}
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
            sx={{ width: "30%" }}
            value={projectType}
            // error={Boolean(errors.projectType)}
            // helperText={errors.projectType}
            renderInput={renderAutoComplete}
            onChange={handleDropdownChange}
          />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            sx={{ width: "20%" }}
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
