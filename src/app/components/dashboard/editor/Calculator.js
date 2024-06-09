import { Box, Button, Container, Grid, Paper, Table, TableBody, TableRow, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS, NODE_TYPES, PATHS } from "../../../util/CommonUtil";
import { useNodeStore } from "../../../util/store";
import useAxiosPrivate from "../../../util/useAxiosPrivate";
import BreakdownChart from "./BreakdownChart";

const containerStyle = {
  p: 2,
  m: 0, mb: 2,
  display: "flex",
  alignItems: "left",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  borderRadius: "4px"
}

function Calculator() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { projectId } = useParams();
  const trigger = useNodeStore((state) => state.trigger);
  const selectedNode = useNodeStore((state) => state.selectedNode);
  const isRoot = selectedNode?.nodeType === NODE_TYPES.ROOT;

  const [isResultAvailable, setResultAvailable] = useState(false);
  const [bill, setBill] = useState(false);

  const calculateBill = async () => {
    await axiosPrivate.get(`/playground/bill?projectId=${projectId}`).then((response) => {
      if (response.status === 200) {
        const result = response?.data?.data[0];
        const isValidResult = isRoot && result?.totalUnits > 0;
        setResultAvailable(isValidResult);
        setBill(result);
      }
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Doing tariff calculations",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    })
  }

  const handleDownload = async() => {
    const config = {
      responseType: "blob"
    }
    await axiosPrivate.get(`/report/pdf?projectId=${projectId}`, config)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "results.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }).catch((error) => {
      if (error.status === 403 || error.status === 401) {
        navigate(PATHS.SIGN_IN);
      } else {
        navigate(PATHS.ERROR, {
          state: {
            action: "Downloading bill report",
            code: error.code,
            message: error.message,
            stack: error.stack
          }
        });
      }
    });
  }

  useEffect(() => {
    calculateBill();
  }, [trigger, selectedNode]);

  return (
    <>
      {isResultAvailable && (
        <Container component={Paper} sx={containerStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box component={Paper} sx={{ p: 2, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
                <Typography sx={{ m: 1, mb: 2}}>
                  Tariff calculation breakdown
                </Typography>

                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Total units</TableCell>
                      <TableCell align="right">{bill?.totalUnits}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Usage breakdown</TableCell>
                      <TableCell align="right">
                        <Table size="small" sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
                          <TableBody>
                            {Boolean(bill.calculationSteps?.length) && bill.calculationSteps.map(step => (
                              <TableRow key={step}>
                                <TableCell align="right">{step}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Usage charge</TableCell>
                      <TableCell align="right">{bill.usageCharge}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Fixed charge</TableCell>
                      <TableCell align="right">{bill.fixedCharge}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Total charge</TableCell>
                      <TableCell align="right">{bill.totalCharge}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Levy</TableCell>
                      <TableCell align="right">{bill.levy}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left"><b>Total bill amount</b></TableCell>
                      <TableCell align="right"><b>{bill.billAmount}</b></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Box sx={{ mt: 2, mb: 2, textAlign: "right"}}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    type="button"
                    onClick={handleDownload}
                  >
                    Download PDF
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <BreakdownChart />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Calculator;