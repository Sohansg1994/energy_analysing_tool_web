import {Container} from "@mui/system";
import React, {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import withRoot from "../modules/withRoot";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import AdminDashboard from "./components/AdminDashboard";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import {Typography} from "@mui/material";
import axios from "axios";
import ResultCalculation from "./ResultCalculation.js";
import SectionComponents from "./SectionComponents";
import Graph from "./Graph";

function ProjectDetails() {
  //get project name from Project page
  let navigate = useNavigate();
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get("projectName");
  const projectId = new URLSearchParams(location.search).get("projectId");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  
  const [inputName, setInputName] = useState("");
  
  const [selectedType, setSelectedType] = useState(0);
  
  const [selectedApplianceType, setSelectedApplianceType] = useState(0);
  
  const [wattCapacity, setWattCapacity] = useState("");
  
  const [quantity, setQuantity] = useState("");
  
  const [hours, setHours] = useState("");
  
  const [isNodeNumberExceed, setisNodeNumberExceed] = useState(false);
  
  const [data, setData] = useState({
    frontEndId: "root",
    name: projectName,
    nodeType: "Root",
    children: [],
  });
  
  // Appliance data contain
  const [applianceData, setApplianceData] = useState({
    name: "",
    wattRate: "",
    hours: "",
    applianceType: "",
    quantity: "",
  });
  
  const [selectedNode, setSelectedNode] = useState("root");
  
  const [counter, setCounter] = useState(0);
  
  //Appliance or not
  
  const [isAppliance, setIsAppliance] = useState(false);
  
  //Project or not
  const [isProject, setIsProject] = useState(false);
  
  const [isSection, setIsSection] = useState(false);
  
  const [isAddClick, setIsAddClick] = useState(false);
  
  const [isCalculated, setIsCalculated] = useState(false);
  
  const [isError, setIsError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);
  const [isSectionError, setIsSectionError] = useState(false);
  const [isWattRateError, setIsWattRateError] = useState(false);
  const [isHourError, setIsHourError] = useState(false);
  const [isQuantityError, setIsQuantityError] = useState(false);
  
  const isOptionEqualToValue = (option, value) => option.id === value.id;
  
  const type = [
    {label: "Section", id: 1},
    {label: "Appliance", id: 2},
  ];
  
  const applianceType = [
    {label: "Fan", id: 1},
    {label: "Light", id: 2},
    {label: "Refrigerator", id: 3},
    {label: "Kitchen_Appliance", id: 4},
    {label: "AC", id: 5},
    {label: "TV", id: 6},
    {label: "Laptop", id: 7},
    {label: "PC", id: 8},
    {label: "Other", id: 9},
  ];
  
  const [refreshKey, setRefreshKey] = useState(0);
  
  //to generate custom node id
  const generateNodeId = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return `${userId}_${projectId}_${Date.now()}_${counter}`;
  };
  
  //for select node
  const handleNodeSelect = (event, nodeId, nodetype, data) => {
    event.preventDefault();
    
    //to disable the add button if node type is appliance
    if (nodetype === "Root") {
      setIsAppliance(false);
      setIsProject(true);
      setIsSection(false);
      setIsError(false);
      setIsTypeError(false);
      setIsSectionError(false);
      setIsWattRateError(false);
      setIsHourError(false);
      setIsQuantityError(false);
      setisNodeNumberExceed(false);
    } else if (nodetype === "Section") {
      setIsAppliance(false);
      setIsProject(false);
      setIsSection(true);
      setIsError(false);
      setIsTypeError(false);
      setIsSectionError(false);
      setIsWattRateError(false);
      setIsHourError(false);
      setIsQuantityError(false);
      setisNodeNumberExceed(false);
    } else {
      setIsAppliance(true);
      setIsProject(false);
      setIsSection(false);
      setIsError(false);
      setIsTypeError(false);
      setIsSectionError(false);
      setIsWattRateError(false);
      setIsHourError(false);
      setIsQuantityError(false);
      setisNodeNumberExceed(false);
      
      // Check if selected node is an appliance node
      
      setApplianceData({
        name: data.name,
        wattRate: data.wattRate,
        hours: data.hours,
        applianceType: data.applianceType,
        quantity: data.quantity,
      });
    }
    
    setSelectedNode(nodeId);
  };
  //For render Treeview
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.frontEndId}
      nodeId={nodes.frontEndId}
      nodetype={nodes.nodeType}
      label={
        nodes.selectedType === 2
          ? `${nodes.name} - Watt Capacity: ${nodes.wattCapacity} - Hours: ${nodes.hours} - Quantity: ${nodes.quantity} `
          : nodes.name
      }
      onClick={(event) =>
        handleNodeSelect(event, nodes.frontEndId, nodes.nodeType, nodes)
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  
  const getData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    
    const response = await axios.get(`/project?projectId=${projectId}`, config);
    const backEndData = response.data.root;
    setData(backEndData);
  };
  
  //Node Add function
  
  const addNode = async () => {
    setIsError(false);
    setIsSectionError(false);
    setIsTypeError(false);
    
    if (selectedType.id === 0 || selectedType.id === undefined) {
      console.log(selectedType.id === 0 || selectedType.id === undefined);
      setIsTypeError(true);
      return;
    }
    
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    
    if (selectedType.id === 1) {
      let label = `${inputName} (${selectedType.label})`;
      let type = `${selectedType.label}`;
      let frontEndId = generateNodeId();
      
      const nodeSectionData = {
        frontEndId: frontEndId,
        nodeType: type,
        parentFrontEndId: selectedNode,
        name: label,
      };
      
      if (inputName.length <= 0) {
        setIsSectionError(true);
        return;
      }
      
      try {
        const response = await axios.post("/node/add", nodeSectionData, config);
        if (response.status === 200) {
          setInputName("");
          setSelectedType(0);
          setIsAddClick(!isAddClick);
          setRefreshKey(refreshKey + 1);
        }
      } catch (error) {
        if (
          error.response.data ===
          "409 Sorry You had reach your subscription limitations upgrade your plan for more benefits"
        ) {
          setisNodeNumberExceed(true);
        } else {
          navigate("/error");
        }
      }
    } else if (selectedType.id === 2) {
      let label = `${inputName} `;
      let type = `${selectedType.label}`;
      let applianceCategory = `${selectedApplianceType.label}`;
      
      let frontEndId = generateNodeId();
      
      let applianceHours = hours;
      
      let wattRate = wattCapacity;
      
      let applianceQuantity = quantity;
      
      const nodeApplianceData = {
        frontEndId: frontEndId,
        nodeType: type,
        parentFrontEndId: selectedNode,
        name: label,
        wattRate: wattRate,
        hours: applianceHours,
        quantity: applianceQuantity,
        applianceType: applianceCategory,
      };
      console.log(nodeApplianceData);
      
      if (
        inputName.length <= 0 ||
        selectedApplianceType.id === 0 ||
        selectedApplianceType.id === undefined ||
        wattCapacity.length <= 0 ||
        isNaN(wattCapacity) ||
        hours.length <= 0 ||
        isNaN(hours) ||
        quantity.length <= 0 ||
        isNaN(quantity)
      ) {
        setIsError(true);
        setIsWattRateError(true);
        
        return;
      }
      
      try {
        const response = await axios.post(
          "/node/add",
          nodeApplianceData,
          config
        );
        if (response.status === 200) {
          setHours("");
          setQuantity("");
          setWattCapacity("");
          setInputName("");
          setSelectedApplianceType("");
          setIsAddClick(!isAddClick);
          setRefreshKey(refreshKey + 1);
        }
      } catch (error) {
        if (
          error.response.data ===
          "409 Sorry You had reach your subscription limitations upgrade your plan for more benefits"
        ) {
          setisNodeNumberExceed(true);
        } else {
          navigate("/error");
        }
      }
    }
  };
  
  const updateNode = async () => {
    setIsError(false);
    setIsTypeError(false);
    setIsWattRateError(false);
    setIsHourError(false);
    setIsQuantityError(false);
    
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    
    let type = `Appliance`;
    let applianceCategory = applianceData.applianceType;
    
    let frontEndId = selectedNode;
    
    let label;
    if (inputName.length > 0) {
      label = inputName;
    } else {
      label = `${applianceData.name}`;
    }
    
    let applianceHours;
    if (hours.length > 0) {
      if (isNaN(hours)) {
        setIsHourError(true);
        
        return;
      } else {
        applianceHours = hours;
      }
    } else {
      applianceHours = `${applianceData.hours}`;
    }
    
    let wattRate;
    if (wattCapacity.length > 0) {
      if (isNaN(wattCapacity)) {
        setIsWattRateError(true);
        
        return;
      } else {
        wattRate = wattCapacity;
      }
    } else {
      wattRate = `${applianceData.wattRate}`;
    }
    
    let applianceQuantity;
    if (quantity.length > 0) {
      if (isNaN(quantity)) {
        setIsQuantityError(true);
        
        return;
      } else {
        applianceQuantity = quantity;
      }
    } else {
      applianceQuantity = `${applianceData.quantity}`;
    }
    
    const nodeApplianceData = {
      frontEndId: frontEndId,
      nodeType: type,
      name: label,
      wattRate: wattRate,
      hours: applianceHours,
      quantity: applianceQuantity,
      applianceType: applianceCategory,
    };
    console.log(nodeApplianceData);
    
    try {
      const response = await axios.put(
        "/node/update",
        nodeApplianceData,
        config
      );
      if (response.status === 200) {
        getData();
        setApplianceData({
          name: nodeApplianceData.name,
          wattRate: nodeApplianceData.wattRate,
          hours: nodeApplianceData.hours,
          applianceType: nodeApplianceData.applianceType,
          quantity: nodeApplianceData.quantity,
        });
        setSelectedApplianceType(0);
        setSelectedType(0);
        setHours("");
        setQuantity("");
        setWattCapacity("");
        setInputName("");
      }
    } catch (error) {
      navigate("/error");
    }
  };
  
  const deleteNode = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let nodeId = selectedNode;
    try {
      const response = await axios.delete(`/node?frontEndId=${nodeId}`, config);
      if (response.status === 200) {
        setIsAddClick(!isAddClick);
      }
    } catch (error) {
      navigate("/error");
    }
  };
  
  //Node find function
  const findNode = (data, nodeId) => {
    if (data.frontEndId === nodeId) {
      return data;
    }
    for (let i = 0; i < data.children.length; i++) {
      let node = findNode(data.children[i], nodeId);
      
      if (node) {
        return node;
      }
    }
    return null;
  };
  
  //find Parent node
  const findParentNode = (data, nodeId) => {
    if (data.children) {
      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].frontEndId === nodeId) {
          return data;
        }
        let parentNode = findParentNode(data.children[i], nodeId);
        if (parentNode) {
          return parentNode;
        }
      }
    }
    return null;
  };
  
  const convertToJSON = (nodes) => {
    //convert to Jason for Appliance
    if (nodes.nodeType === "Appliance") {
      return {
        frontEndId: nodes.frontEndId,
        name: nodes.name,
        selectedType: nodes.nodeType,
        wattCapacity: nodes.wattCapacity,
        hours: nodes.hours,
        quantity: nodes.quantity,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    } else {
      //convert to Jason for Sections
      return {
        frontEndId: nodes.frontEndId,
        name: nodes.name,
        selectedType: nodes.nodeType,
        children: nodes.children?.map((node) => convertToJSON(node)),
      };
    }
  };
  
  useEffect(() => {
    getData();
  }, [isAddClick]);
  
  const handleAddClick = () => {
    getData();
  };
  
  const handleCalculation = () => {
    setIsCalculated(!isCalculated);
    console.log(isCalculated);
  };
  
  return (
    <React.Fragment>
      {role === "ADMIN" && <AdminDashboard/>}
      {role === "USER" && <Dashboard/>}
      <Container
        sx={{
          ml: 38,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            mt: 15,
            display: "flex",
            columnGap: 3,
            width: "1250px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "33%",
              boxShadow: 2,
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Paper elevation={3}>
              <Box p={3}>
                <Typography
                  sx={{
                    backgroundColor: "#1e1e1f",
                    color: "white",
                    p: 1,
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 10,
                  }}
                >
                  Project Tree
                </Typography>
                <TreeView
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon/>}
                  defaultExpanded={["root"]}
                  defaultExpandIcon={<ChevronRightIcon/>}
                  sx={{
                    height: "100%",
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "hidden",
                    mt: 3,
                  }}
                >
                  {renderTree(data)}
                </TreeView>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              width: "67%",
              boxShadow: 2,
              height: "100%",
              overflowY: "auto",
              p: 3, // to adjest padding of whole form
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#1e1e1f",
                color: "white",
                p: 1,
                textAlign: "center",
                fontFamily: "Montserrat",
                fontSize: 16,
                fontWeight: 10,
              }}
            >
              Create Your Component
            </Typography>
            {isSection && (
              <Box
                sx={{
                  pt: 3,
                }}
              >
                <SectionComponents
                  selectedNode={selectedNode}
                  isSection={isSection}
                  handleAddClick={handleAddClick}
                  isAddClick={isAddClick}
                />
              </Box>
            )}
            <Paper elevation={3}>
              <Box
                sx={{
                  pt: 3,
                  p: 3,
                  mt: 3,
                }}
              >
                <TextField
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      opacity: 0.75, // Adjust the opacity value as per your preference
                    },
                  }}
                  label="Name"
                  id="outlined-basic"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={isAppliance ? applianceData.name : ""}
                  fullWidth
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  error={
                    (isError || isSectionError) && inputName.length <= 0
                      ? true
                      : false
                  }
                  helperText={
                    (isError || isSectionError) && inputName.length <= 0
                      ? "Please fill in all the fields"
                      : ""
                  } // Display error message if any
                />
                <Autocomplete
                  key={refreshKey}
                  options={type}
                  getOptionLabel={(option) => option.label}
                  style={{width: "100%", marginTop: 16}}
                  id="disable-clearable"
                  disableClearable
                  disabled={isAppliance}
                  onChange={(event, newValue) => {
                    setSelectedType(newValue);
                  }}
                  isOptionEqualToValue={isOptionEqualToValue}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      variant="outlined"
                      fullWidth
                      error={
                        isTypeError &&
                        (selectedType.id === 0 ||
                          selectedType.id === undefined) &&
                        !isAppliance
                          ? true
                          : false
                      }
                      helperText={
                        isTypeError &&
                        (selectedType.id === 0 ||
                          selectedType.id === undefined) &&
                        !isAppliance
                          ? "Please select the type"
                          : ""
                      } // Display error message if any
                    />
                  )}
                />
                
                <Divider style={{marginTop: 16, marginBottom: 16}}/>
                <Box
                  sx={{mt: 3, display: "flex", columnGap: 3, width: "100%"}}
                >
                  <Autocomplete
                    key={refreshKey}
                    options={applianceType}
                    getOptionLabel={(option) => option.label}
                    style={{width: "100%"}}
                    disabled={selectedType.id !== 2 || isAppliance}
                    onChange={(event, newValue) => {
                      setSelectedApplianceType(newValue);
                    }}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Appliance Type"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder={
                          isAppliance ? applianceData.applianceType : ""
                        }
                        error={
                          isError &&
                          (selectedApplianceType.id === 0 ||
                            selectedApplianceType.id === undefined) &&
                          !isAppliance
                            ? true
                            : false
                        }
                        helperText={
                          isError &&
                          (selectedApplianceType === 0 ||
                            selectedApplianceType === undefined) &&
                          !isAppliance
                            ? "Please select the appliance type"
                            : ""
                        } // Display error message if any
                      />
                    )}
                  />
                  
                  <TextField
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        opacity: 0.75, // Adjust the opacity value as per your preference
                      },
                    }}
                    label={"Watt Capacity"}
                    id="outlined-basic"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder={isAppliance ? applianceData.wattRate : ""}
                    variant="outlined"
                    value={wattCapacity}
                    disabled={selectedType.id !== 2 && !isAppliance}
                    onChange={(e) => setWattCapacity(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">W</InputAdornment>
                      ),
                    }}
                    error={
                      (isError &&
                        (wattCapacity.length <= 0 || isNaN(wattCapacity))) ||
                      (isWattRateError && isNaN(wattCapacity))
                        ? true
                        : false
                    }
                    helperText={
                      (isError &&
                        (wattCapacity.length <= 0 || isNaN(wattCapacity))) ||
                      (isWattRateError && isNaN(wattCapacity))
                        ? wattCapacity.length <= 0
                          ? "Please fill all the feilds"
                          : "Invalid input"
                        : ""
                    } // Display error message if any
                  />
                </Box>
                
                <Box
                  sx={{mt: 3, display: "flex", columnGap: 3, width: "100%"}}
                >
                  <TextField
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        opacity: 0.75, // Adjust the opacity value as per your preference
                      },
                    }}
                    label="Hours"
                    id="outlined-basic"
                    fullWidth
                    value={hours}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder={isAppliance ? applianceData.hours : ""}
                    variant="outlined"
                    disabled={selectedType.id !== 2 && !isAppliance}
                    onChange={(e) => setHours(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">H</InputAdornment>
                      ),
                    }}
                    error={
                      (isError && (hours.length <= 0 || isNaN(hours))) ||
                      (isHourError && isNaN(hours))
                        ? true
                        : false
                    }
                    helperText={
                      (isError && (hours.length <= 0 || isNaN(hours))) ||
                      (isHourError && isNaN(hours))
                        ? hours.length <= 0
                          ? "Please fill all the feilds"
                          : "Invalid input"
                        : ""
                    } // Display error message if any
                  />
                  
                  {/*<TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    // value={quantity}
                    value={isAppliance ? applianceData.quantity : quantity}
                    disabled={selectedType.id !== 2 && !isAppliance}
                    onChange={(e) => setQuantity(e.target.value)}
                  />*/}
                  
                  <TextField
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        opacity: 0.75, // Adjust the opacity value as per your preference
                      },
                    }}
                    id="outlined-basic"
                    label="Quantity"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder={isAppliance ? applianceData.quantity : ""}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    variant="outlined"
                    disabled={selectedType.id !== 2 && !isAppliance}
                    error={
                      (isError && (quantity.length <= 0 || isNaN(quantity))) ||
                      (isQuantityError && isNaN(quantity))
                        ? true
                        : false
                    }
                    helperText={
                      (isError && (quantity.length <= 0 || isNaN(quantity))) ||
                      (isQuantityError && isNaN(quantity))
                        ? quantity.length <= 0
                          ? "Please fill all the feilds"
                          : "Invalid input"
                        : ""
                    } // Display error message if any
                  />
                </Box>
                
                <Box
                  sx={
                    !isAppliance
                      ? {
                        mt: 3,
                        display: "flex",
                        columnGap: 3,
                        width: "100%",
                        justifyContent: "space-evenly",
                      }
                      : {
                        mt: 3,
                        display: "flex",
                        columnGap: 3,
                        width: "100%",
                        justifyContent: "space-evenly",
                      }
                  }
                >
                  {!isAppliance && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addNode}
                      disabled={isProject && selectedType.id == 2}
                      sx={{
                        width: "25%",
                        backgroundColor: "#1F8A70",
                        "&:hover": {
                          backgroundColor: "#1c7861",
                        },
                      }}
                    >
                      Add
                    </Button>
                  )}
                  {isAppliance && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={updateNode}
                      sx={{
                        width: "25%",
                        backgroundColor: "#1F8A70",
                        "&:hover": {
                          backgroundColor: "#1c7861",
                        },
                      }}
                    >
                      Update
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteNode}
                    disabled={isProject}
                    sx={{width: "25%"}}
                  >
                    Delete
                  </Button>
                </Box>
                {isNodeNumberExceed && (
                  <Box sx={{mt: 5}}>
                    <Stack sx={{width: "100%"}} spacing={2}>
                      <Alert
                        severity="warning"
                        sx={{fontSize: 16, backgroundColor: "#fff3e0"}}
                      >
                        <AlertTitle sx={{fontSize: 20}}>Warning</AlertTitle>
                        You Reached to your Maximum Section Numbers or
                        Aplliances number <strong> Upgrade Your Plan!</strong>
                      </Alert>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Paper>
            <Paper>
              <ResultCalculation
                projectId={projectId}
                isProject={isProject}
                handleCalculation={handleCalculation}
              />
            </Paper>
            {isCalculated && (
              <Paper sx={{display: "flex", justifyContent: "space-around"}}>
                {<Graph projectId={projectId} isCalculated={isCalculated}/>}
              </Paper>
            )}
            <Paper sx={{mb: 10}}></Paper>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(ProjectDetails);
