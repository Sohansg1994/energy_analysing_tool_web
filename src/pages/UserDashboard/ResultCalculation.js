import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import { MdDownload } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffff",
    color: theme.palette.common.white,
    fontSize: 16,
    border: "none",
    padding: 3,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: "none",
    padding: 3,
  },
}));

/*const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  "&:first-child td, &:first-child th": {},
  "&:last-child td, &:last-child th": {},
  "& > *": {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  border: "none",
}));*/

function createData(description, amount) {
  return { description, amount };
}

const ResultCalculation = (props) => {
  const [isResultUpdated, setIsResultUpdated] = useState(false);
  const { projectId } = props;
  const [isProject, setIsProject] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [units, setUnits] = useState("");

  const handleClick = () => {
    props.handleCalculation();
  };

  const [rows, setRows] = useState([
    createData("Total Units", ""),
    createData("Usage Charge", ""),
    createData("Fixed Charge", ""),
    createData("Total Charge", ""),
    createData("Levy", ""),
    createData("Bill Amount", ""),
  ]);

  useEffect(() => {
    setIsProject(props.isProject);
  });

  const handleCalculation = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        `/playground/bill?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        handleClick();
        console.log(response);
        setCalculationSteps(response.data.data[0].calculationSteps);
        setUnits(response.data.data[0].totalUnits);
        const updatedRows = [
          createData("Usage Charge", response.data.data[0].usageCharge),
          createData("Fixed Charge", response.data.data[0].fixedCharge),
          createData("Total Charge", response.data.data[0].totalCharge),
          createData("Levy", response.data.data[0].levy),

          createData("Bill Amount", response.data.data[0].billAmount),
        ];

        setRows(updatedRows);
        setIsResultUpdated(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const pdfDownload = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(`/report/pdf?projectId=${projectId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "results.pdf");

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        mt: 4,

        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {isProject && (
        <Box
          p={3}
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCalculation}
            sx={{
              width: "60%",
              justifyItems: "center",
              backgroundColor: "#1F8A70",
              "&:hover": {
                backgroundColor: "#1c7861",
              },
            }}
          >
            Calculate
          </Button>

          {isResultUpdated && (
            <TableContainer sx={{ mt: 3 }}>
              <Table
                sx={{
                  minWidth: 500,
                  width: "60%",
                  mx: "auto",
                  borderColor: "#fff",
                  border: "none", // Add this line to remove the border
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableCell>Total Units</StyledTableCell>
                  <StyledTableCell align="right">{units}</StyledTableCell>
                  {calculationSteps.map((steps) => (
                    <TableRow
                      sx={{
                        border: "none",
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ width: "40%" }}
                      ></StyledTableCell>
                      <StyledTableCell align="right">
                        <span style={{ fontWeight: "revert" }}>{steps}</span>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        border: "none",
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ width: "40%" }}
                      >
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.description === "Bill Amount" ? (
                          <span style={{ fontWeight: "bold" }}>
                            {row.amount}
                          </span>
                        ) : (
                          row.amount
                        )}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {isResultUpdated && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 10,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  mr: 0.5,
                  backgroundColor: "#1e1e1f",
                  color: "white",
                  p: 0.9,
                }}
              >
                Download Your Full Report
              </Typography>
              <Button
                variant="contained"
                color="info"
                startIcon={<FiDownload />}
                onClick={pdfDownload}
              >
                Download
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ResultCalculation;
