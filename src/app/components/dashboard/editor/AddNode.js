import { Alert, Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS, INTEGER_REGEX, NODE_REGEX, NODE_TYPES, PATHS } from "../../../util/CommonUtil";
import { useAuthStore, useNodeStore } from "../../../util/store";
import useAxiosPrivate from "../../../util/useAxiosPrivate";

const nodeTypes = [
  NODE_TYPES.APPLIANCE,
  NODE_TYPES.SECTION
];

const applianceTypes = [  // not using id values ??/
  { label: "Fan", id: 1 },
  { label: "Light", id: 2 },
  { label: "Refrigerator", id: 3 },
  { label: "Kitchen_Appliance", id: 4 },
  { label: "AC", id: 5 },
  { label: "TV", id: 6 },
  { label: "Laptop", id: 7 },
  { label: "PC", id: 8 },
  { label: "Other", id: 9 },
];

function AddNode({ parentId, currentNodeDetails }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const selectedNode = useNodeStore((state) => state.selectedNode);
  const setTrigger = useNodeStore((state) => state.setTrigger);
  const authData = useAuthStore((state) => state.authData);
  const userId = authData?.userId;

  const isUpdate = Boolean(currentNodeDetails);
  const isParentRoot = parentId === "root";
  const title = isUpdate ? "Component details" : "Add new component";
  const filteredNodeTypes = (!isUpdate && isParentRoot) ? [NODE_TYPES.SECTION] : nodeTypes;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [name, setName] = useState("");
  const [nodeType, setNodeType] = useState(NODE_TYPES.SECTION);
  const [applianceType, setApplianceType] = useState(applianceTypes[0].label) // this cannot be the id, should be a string value
  const [wattRate, setWattRate] = useState(0);
  const [hours, setHours] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [nameError, setNameError] = useState(false);
  const [nodeTypeError, setNodeTypeError] = useState(false);
  const [applianceTypeError, setApplianceTypeError] = useState(false);
  const [wattRateError, setWattRateError] = useState(false);
  const [hoursError, setHoursError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const [counter, setCounter] = useState(0);

  const isAppliance = nodeType === NODE_TYPES.APPLIANCE;

  useEffect(() => {
    if (isUpdate) {
      setName(currentNodeDetails.name);
      setNodeType(currentNodeDetails.nodeType);
      if (currentNodeDetails.nodeType === NODE_TYPES.APPLIANCE) {
        setApplianceType(currentNodeDetails.applianceType);
        setWattRate(currentNodeDetails.wattRate);
        setHours(currentNodeDetails.hours);
        setQuantity(currentNodeDetails.quantity);
      }
    }
  }, [selectedNode]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      if (NODE_REGEX.test(e.target.value)) {
        setNameError(false);
        setShowAlert(false);
        setAlertMessage("")
      } else {
        setNameError(true);
        setShowAlert(true);
        setAlertMessage("Component name must be alphanumeric with spaces and 1-20 characters long")
      }
    } else {
      setNameError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid component name");
    }
  }

  const handleNodeTypeChange = (e) => {
    setNodeType(e.target.value);
    if (e.target.validity.valid && nodeTypes.indexOf(e.target.value) !== -1) {
      setNodeTypeError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setNodeTypeError(true);
      setShowAlert(true);
      setAlertMessage("Please select a valid node type");
    }
  }

  const handleApplianceTypeChange = (e) => {
    setApplianceType(e.target.value);
    if (e.target.validity.valid && applianceTypes.map(type => type.label).indexOf(e.target.value) !== -1) {
      setApplianceTypeError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setApplianceTypeError(true);
      setShowAlert(true);
      setAlertMessage("Please select a valid appliance type");
    }
  }

  const handleWattRateChange = (e) => {
    setWattRate(e.target.value);
    if (e.target.validity.valid && e.target.value > 0) {
      setWattRateError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setWattRateError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid and positive watt rate");
    }
  }

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && e.target.value <= 24) {
      setHoursError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setHoursError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid number of hours");
    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && INTEGER_REGEX.test(e.target.value)) {
      setQuantityError(false);
      setShowAlert(false);
      setAlertMessage("");
    } else {
      setQuantityError(true);
      setShowAlert(true);
      setAlertMessage("Please provide a valid quantity");
    }
  }

  const allFieldsProvided = () => {
    if (isAppliance) {
      return !(nameError || nodeTypeError);
    } else {
      return !(nameError || nodeTypeError || applianceTypeError || wattRateError || hoursError || quantityError);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity() && allFieldsProvided()) {
      saveOrUpdateNode();
    } else {
      setShowAlert(true);
      setAlertMessage(Boolean(alertMessage) ? alertMessage : "Please provide valid inputs for required fields");
    }
  };

  const generateNodeId = () => {
    setCounter((prevCounter) => prevCounter + 1);
    return `${userId}_${projectId}_${Date.now()}_${counter}`;
  };

  const saveOrUpdateNode = () => {
    let newNodeDetails = {
      frontEndId: isUpdate ? currentNodeDetails.frontEndId : generateNodeId(),
      nodeType: nodeType,
      name: name,
      parentFrontEndId: parentId,
    }
    if (isAppliance) {
      newNodeDetails = {
        ...newNodeDetails,
        wattRate: wattRate,
        hours: hours,
        quantity: quantity,
        applianceType: applianceType  // is a name, not id
      }
    }

    if (isUpdate) {
      updateCurrentNode(newNodeDetails);
    } else {
      saveNewNode(newNodeDetails);
    }
  }

  const updateCurrentNode = async (nodeDetails) => {
    await axiosPrivate.put("/node/update", nodeDetails).then((response) => {
      if (response.status === 200) {
        setTrigger();
      }
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Updating a node details",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
  }

  const saveNewNode = async (nodeDetails) => {
    await axiosPrivate.post("/node/add", nodeDetails).then((response) => {
      if (response.status === 200) {
        setName("");
        setNodeType(NODE_TYPES.SECTION);
        setApplianceType(applianceTypes[0].label);
        setWattRate(0);
        setHours(0);
        setQuantity(0);
        setTrigger();
      }
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Adding a new node to the project",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
  }

  return (
    <Box component={Paper} sx={{ p: 2, m: 0, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
      <Grid container component={"form"} onSubmit={handleSubmit} spacing={2}>
        <Grid item xs={12}>
          <Typography>{title}</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="name"
            required
            value={name}
            onChange={handleNameChange}
            error={nameError}
            label="Name"
            size="small"
            variant="outlined" />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="nodeType"
            required
            disabled={isUpdate}
            value={nodeType}
            onChange={handleNodeTypeChange}
            error={nodeTypeError}
            select
            SelectProps={{
              native: true,
            }}
            label="Node type"
            size="small"
            variant="outlined">
            {filteredNodeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Grid>

        {isAppliance && (
          <>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="applianceType"
                required
                value={applianceType}
                error={applianceTypeError}
                onChange={handleApplianceTypeChange}
                select
                SelectProps={{
                  native: true,
                }}
                label="Appliance type"
                size="small"
                variant="outlined">
                {applianceTypes.map((type) => (
                  <option key={type.id} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                id="wattRate"
                required
                value={wattRate}
                error={wattRateError}
                onChange={handleWattRateChange}  // can watt rate be 0.x values ???
                InputProps={{
                  endAdornment: <InputAdornment position="end">W</InputAdornment>,
                  inputProps: { min: 0.01, step: 0.01 }
                }}
                label="Watt rate"
                size="small"
                variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                id="hours"
                required
                value={hours}
                error={hoursError}
                onChange={handleHoursChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>,
                  inputProps: { min: 0.5, max: 24, step: 0.5 }
                }}
                label="Hours per day"
                size="small"
                variant="outlined" />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                id="quantity"
                required
                value={quantity}
                error={quantityError}
                onChange={handleQuantityChange}
                InputProps={{
                  inputProps: { min: 1, step: 1 }
                }}
                label="Quantity"
                size="small"
                variant="outlined" />
            </Grid>
          </>
        )}

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="outlined"
            size="small"
            color="primary">
            {isUpdate ? "Save" : "Add"}
          </Button>
        </Grid>

        {showAlert && (
          <Grid item xs={12}>
            <Alert severity="warning" variant="outlined" size="small">{alertMessage}</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AddNode;