import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { INTEGER_REGEX, NODE_TYPES } from "../../../util/CommonUtil";

const containerStyles = {
  p: 2,
  m: 0, mb: 2
}

const inputFieldStyles = {
  p: 1, pl: 0
}

const nodeTypes = [
  NODE_TYPES.APPLIANCE,
  NODE_TYPES.SECTION
]

const applianceTypes = [
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

function AddNode({ parentId, nodeDetails }) {
  console.log("node details");
  console.log(nodeDetails);
  const isUpdate = Boolean(nodeDetails) && !parentId
  const title = isUpdate ? "Component details" : "Add new component";

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nodeType, setNodeType] = useState(NODE_TYPES.SECTION);
  const [nodeTypeError, setNodeTypeError] = useState(false);
  const [applianceType, setApplianceType] = useState(applianceTypes[0].label) // this cannot be the id, should be a string value
  const [applianceTypeError, setApplianceTypeError] = useState(false);
  const [wattRate, setWattRate] = useState(0);
  const [wattRateError, setWattRateError] = useState(false);
  const [hours, setHours] = useState(0);
  const [hoursError, setHoursError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setName(nodeDetails.name);
      setNodeType(nodeDetails.nodeType);
      if (nodeDetails.nodeType === NODE_TYPES.APPLIANCE) {
        console.log(nodeDetails.applianceType);
        setApplianceType(nodeDetails.applianceType);
        setWattRate(nodeDetails.wattRate);
        setHours(nodeDetails.hours);
        setQuantity(nodeDetails.quantity);
      }
    }
  }, [nodeDetails]);

  const isAppliance = nodeType === NODE_TYPES.APPLIANCE;

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  }

  const handleNodeTypeChange = (e) => {
    setNodeType(e.target.value);
    if (e.target.validity.valid && nodeTypes.indexOf(e.target.value) !== -1) {
      setNodeTypeError(false);
    } else {
      setNodeTypeError(true);
    }
  }

  const handleApplianceTypeChange = (e) => {
    setApplianceType(e.target.value);
    if (e.target.validity.valid &&
      applianceTypes.map(type => type.label).indexOf(e.target.value) !== 1) {
      setApplianceTypeError(false);
    } else {
      setApplianceTypeError(true);
    }
  }

  const handleWattRateChange = (e) => {
    setWattRate(e.target.value);
    if (e.target.validity.valid && e.target.value > 0) {
      setWattRateError(false);
    } else {
      setWattRateError(true);
    }
  }

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && e.target.value <= 24) {
      setHoursError(false);
    } else {
      setHoursError(true);
    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.validity.valid && e.target.value > 0 && INTEGER_REGEX.test(e.target.value)) {
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      alert("Form is valid!");
    } else {
      alert("Form is invalid! Please check the fields...");
    }
  };

  return (
    <Box component={Paper} sx={containerStyles}>
      <Grid container component={"form"} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography sx={{m: 0, mb: 2, p: 0}}>
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={inputFieldStyles}>
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

        <Grid item xs={12} sx={inputFieldStyles}>
          <TextField
            fullWidth
            id="nodeType"
            required
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
            {nodeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Grid>

        {isAppliance && (
          <>
            <Grid item xs={6} sx={inputFieldStyles}>
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

            <Grid item xs={6} sx={inputFieldStyles}>
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

            <Grid item xs={6} sx={inputFieldStyles}>
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

            <Grid item xs={6} sx={inputFieldStyles}>
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

        <Grid item xs={12} sx={inputFieldStyles} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="outlined"
            size="small"
            color="primary">
            {isUpdate ? "Save" : "Add"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddNode;