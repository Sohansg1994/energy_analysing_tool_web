import React, { useEffect, useState } from "react";

import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: theme.palette.common.black,
    fontSize: 15,
    fontFamily: "Montserrat",

    padding: 3,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    padding: 5,
    fontFamily: "Montserrat",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function SectionComponents(props) {
  let navigate = useNavigate();
  const { selectedNode } = props;
  const [isSection, setIsSection] = useState(false);
  const [sectionComponents, setSectionComponents] = useState([]);

  const handleClick = () => {
    props.handleAddClick();
  };

  const getSectionComponents = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `/playground/section?frontEndId=${selectedNode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setSectionComponents(response.data.children);
  };

  const handleDelete = async (nodeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(`/node?frontEndId=${nodeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        handleClick();
        console.log(response.data);
        getSectionComponents();
      }
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    setIsSection(props.isSection);

    if (props.isSection) {
      getSectionComponents();
    }

    return () => {
      setIsSection(false);
    };
  }, [props.isSection, props.selectedNode, props.isAddClick]);
  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, width: "93%", margin: "auto" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Component</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectionComponents.map((component) => (
                <TableRow key={component.frontEndId}>
                  <StyledTableCell component="th" scope="row">
                    {component.nodeType === "Section" ? (
                      <span>
                        {component.name.substring(0, component.name.length - 9)}
                      </span>
                    ) : (
                      <span>{component.name}</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {component.nodeType}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(component.frontEndId)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}
export default SectionComponents;
