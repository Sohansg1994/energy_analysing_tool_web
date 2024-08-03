import { Chip, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { COLORS, NODE_TYPES } from "../../../util/CommonUtil";
import { useNodeStore } from "../../../util/store";
import useAxiosPrivate from "../../../util/useAxiosPrivate";
import useErrorHandler from "../../../util/useErrorHandler";
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
  const axiosPrivate = useAxiosPrivate();
  const handleError = useErrorHandler();

  const node = useNodeStore((state) => state.selectedNode);
  const trigger = useNodeStore((state) => state.trigger); // to re-render the component tree
  const setTrigger = useNodeStore((state) => state.setTrigger);

  const isSection = node?.nodeType === NODE_TYPES.SECTION;
  const isRoot = node?.nodeType === NODE_TYPES.ROOT;

  const handleDelete = async (nodeId) => {
    await axiosPrivate.delete(`/node?frontEndId=${nodeId}`).then((response) => {
      if (response.status === 200) {
        setTrigger();
      }
    }).catch((error) => {
      handleError(error, "Deleting a node");
    });
  }

  return (
    <Container component={Paper} disableGutters sx={detailsContainerStyle}>
      <Grid container spacing={0}>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5">{node?.name}</Typography>
            <Chip label={node?.nodeType} color="primary" size="small" variant="outlined" />
          </Stack>
          <Divider />
        </Grid>

        {/* Update the current node. Root cannot be updated */}
        {!isRoot && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <AddNode
              currentNodeDetails={node}
              parentId={node?.frontEndId}
            />
          </Grid>
        )}

        {(isSection || isRoot) && Boolean(node.children?.length) && (
          <Grid item xs={12} component={Paper} sx={{ p: 2, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
            <TableContainer>
              <Typography sx={{ mb: 2 }}>
                Component child table
              </Typography>
              <Table size="small">
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
                            onClick={() => handleDelete(childNode.frontEndId)}
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

        {/* Add child node */}
        {(isSection || isRoot) && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <AddNode
              parentId={node.frontEndId}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default NodeDetails;