import {Alert, AlertTitle, Autocomplete, Container, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

import axios from "axios";

function ProjectCreate(props) {
  let navigate = useNavigate();
  const {getProjectList} = props;
  const {isDelete} = props;
  const Type = [
    {label: "Domestic", id: 1},
    {label: "Religious & Charitable", id: 2},
  ];
  
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [isProjectNumberExceed, setIsProjectNumberExceed] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleSubmit = async () => {
    setIsError(false);
    if (projectName.length <= 0 || projectType.length <= 0) {
      setIsError(true);
      return;
    }
    
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    
    let selectProjectType;
    
    if (projectType === "Religious & Charitable") {
      selectProjectType = "ReligiousAndCharitable";
    } else {
      selectProjectType = projectType;
    }
    
    const data = {
      name: projectName,
      projectType: selectProjectType,
    };
    console.log(data);
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    
    try {
      const response = await axios.post("/project", data, config);
      console.log(data);
      if (response.status === 200) {
        getProjectList();
        setProjectName("");
        setProjectType("");
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (
        error.response.data.message ===
        "409 Sorry You had reach your subscription limitations upgrade your plan for more benefits"
      ) {
        setIsProjectNumberExceed(true);
      } else {
        navigate("/error");
      }
    }
  };
  
  useEffect(() => {
    setIsProjectNumberExceed(false);
  }, [isDelete]);
  
  return (
    <>
      <Container
        component={Paper}
        sx={{
          mt: 4,
          mb: 4,
          pb: 4,
          pt: 4,
          pl: 0,
          pr: 0,
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Project Name"
          defaultValue="Project Name"
          size="small"
          sx={{width: "30%"}}
          value={projectName}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => setProjectName(e.target.value)}
          error={isError && projectName.length <= 0 ? true : false}
          helperText={
            isError && projectName.length <= 0 ? "Please fill project name" : ""
          } // Display error message if any
        />
        
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Type}
          size="small"
          sx={{width: "30%"}}
          value={projectType}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              error={isError && projectType.length <= 0 ? true : false}
              helperText={
                isError && projectType.length <= 0
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
      {isProjectNumberExceed && (
        <Container>
          <Stack sx={{width: "100%"}} spacing={2}>
            <Alert
              severity="warning"
              sx={{fontSize: 16, backgroundColor: "#fff3e0"}}
            >
              <AlertTitle sx={{fontSize: 20}}>Warning</AlertTitle>
              You Reached to your Maximum Project Numbers{" "}
              <strong> Upgrade Your Plan!</strong>
            </Alert>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default ProjectCreate;
