import { Container, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NODE_TYPES } from "../../../util/CommonUtil";
import { useNodeStore } from "../../../util/store";
import AddNode from "./AddNode";

const detailsContainerStyle = {
  p: 2,
  m: 0, mb: 2,
  display: "flex",
  alignItems: "left",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  borderRadius: "4px"
}

function NodeDetails() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const node = useNodeStore((state) => state.selectedNode);
  const isSection = node?.nodeType == NODE_TYPES.SECTION;
  const isAppliance = node?.nodeType == NODE_TYPES.APPLIANCE;

  const handleChildRemove = (frontendId) => {
    console.log("deleting " + frontendId);
  }

  const handleDelete = async (nodeId) => {
    await axios.delete(`/node?frontEndId=${nodeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((response) => {
      if (response.status == 200) {
        // reset everything in the view
      }
    }).catch((error) => {
      console.log(error);
      navigate("/error");
    });
  };

  return (
    <Container component={Paper} disableGutters sx={detailsContainerStyle}>
      <Grid container spacing={0}>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>
            Component - {node?.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <AddNode nodeDetails={node} />
        </Grid>

        {isSection && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TableContainer component={Paper}>
              <Typography sx={{p: 1, m: 0, mb: 2, mt: 1}}>
                Component child table
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      Component
                    </TableCell>
                    <TableCell align="left">
                      Type
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    node.children.map((childNode) => (
                      <TableRow key={childNode.frontEndId}>
                        <TableCell align="left">
                          {childNode.name}
                        </TableCell>
                        <TableCell align="left">
                          {childNode.nodeType}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            color="warning"
                            size="small"
                            onClick={() => handleChildRemove(childNode.frontEndId)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        {isSection && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <AddNode parentId={node.frontEndId} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default NodeDetails;