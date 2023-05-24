import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import withRoot from "../modules/withRoot";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import AdminDashboard from "./components/AdminDashboard";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { Typography, makeStyles } from "@mui/material";
import axios from "axios";
import ResultCalculation from "./ResultCalculation.js";
import SectionComponents from "./SectionComponents";
import Graph from "./Graph";

function ProjectDetails() {
  //get project name from Project page
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

  const isOptionEqualToValue = (option, value) => option.id === value.id;

  const type = [
    { label: "Section", id: 1 },
    { label: "Appliance", id: 2 },
  ];

  const applianceType = [
    { label: "Fan", id: 1 },
    { label: "Light", id: 2 },
    { label: "Kitchen Appliance", id: 3 },
  ];

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
    } else if (nodetype === "Section") {
      setIsAppliance(false);
      setIsProject(false);
      setIsSection(true);
    } else {
      setIsAppliance(true);
      setIsProject(false);
      setIsSection(false);
      console.log(data.name);
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

  const addNode = async () => {
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

      try {
        const response = await axios.post("/node/add", nodeSectionData, config);
        if (response.status === 200) {
          getData();

          setInputName("");
        }
      } catch (error) {
        console.log(error);
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

      try {
        const response = await axios.post(
          "/node/add",
          nodeApplianceData,
          config
        );
        if (response.status === 200) {
          getData();
          setHours("");
          setQuantity("");
          setWattCapacity("");
          setInputName("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateNode = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let label = inputName;
    let type = `Appliance`;
    let applianceCategory = applianceData.applianceType;

    let frontEndId = selectedNode;

    let applianceHours = hours;

    let wattRate = wattCapacity;

    let applianceQuantity = quantity;

    const nodeApplianceData = {
      frontEndId: frontEndId,
      nodeType: type,

      name: label,
      wattRate: wattRate,
      hours: applianceHours,
      quantity: applianceQuantity,
      applianceType: applianceCategory,
    };

    try {
      const response = await axios.put(
        "/node/update",
        nodeApplianceData,
        config
      );
      if (response.status === 200) {
        getData();

        setHours("");
        setQuantity("");
        setWattCapacity("");
        setInputName("");
      }
    } catch (error) {
      console.log(error);
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
        getData();
      }
    } catch {}
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
    return () => setIsAddClick(false);
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
      {role === "USER" && <AdminDashboard />}
      {role === "ADMIN" && <Dashboard />}
      <Container>
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
              width: "35%",
              boxShadow: 2,
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Paper elevation={3}>
              <Box p={3}>
                <TreeView
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={["root"]}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    height: "100%",
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "hidden",
                  }}
                >
                  {renderTree(data)}
                </TreeView>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              width: "65%",
              boxShadow: 2,
              height: "100%",
              overflowY: "auto",
            }}
          >
            {isSection && (
              <Box
                sx={{
                  pt: 3,
                  pb: 3,
                }}
              >
                <SectionComponents
                  selectedNode={selectedNode}
                  isSection={isSection}
                  handleAddClick={handleAddClick}
                />
              </Box>
            )}
            <Paper elevation={3}>
              <Box p={3}>
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
                />
                <Autocomplete
                  options={type}
                  getOptionLabel={(option) => option.label}
                  style={{ width: "100%", marginTop: 16 }}
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
                    />
                  )}
                />

                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                <Box
                  sx={{ mt: 3, display: "flex", columnGap: 3, width: "100%" }}
                >
                  <Autocomplete
                    options={applianceType}
                    getOptionLabel={(option) => option.label}
                    style={{ width: "100%" }}
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
                  />
                </Box>

                <Box
                  sx={{ mt: 3, display: "flex", columnGap: 3, width: "100%" }}
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
                      disabled={isAppliance === true}
                      sx={{ width: "25%" }}
                    >
                      Add
                    </Button>
                  )}

                  {isAppliance && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={updateNode}
                      sx={{ width: "25%" }}
                    >
                      Update
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteNode}
                    sx={{ width: "25%" }}
                  >
                    Delete
                  </Button>
                </Box>
                {isNodeNumberExceed && (
                  <Box sx={{ mt: 5 }}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert
                        severity="warning"
                        sx={{ fontSize: 16, backgroundColor: "#fff3e0" }}
                      >
                        <AlertTitle sx={{ fontSize: 20 }}>Warning</AlertTitle>
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
            <Paper>
              {<Graph projectId={projectId} isCalculated={isCalculated} />}
            </Paper>
            <Paper sx={{ mb: 10 }}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography>Download Your Full Report</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteNode}
                  sx={{ width: "25%" }}
                >
                  Download
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(ProjectDetails);
