import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { IoPeople } from "react-icons/io5";
import { MdWork } from "react-icons/md";

function StaticsSummary() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#94AF9F",
          flexWrap: "wrap",
          rowGap: 2,
          p: 3,
          mt: 15,
          borderRadius: 3,
          boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
        }}
      >
        <Card
          sx={{
            width: 300,
            height: 200,

            //background:
            //  "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%)",
            borderRadius: 5,
            boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
          }}
        >
          <CardContent>
            <Typography
              sx={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
            >
              <IoPeople />
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "Montserrat",

                mb: 1.5,
              }}
            >
              <CountUp start={0} end={10} duration={10 / 5} delay={0.5} />+
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              USERS
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 300,
            height: 200,
            //background: "rgba(0,0,0,0.2);",
            borderRadius: 5,
            boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
          }}
        >
          <CardContent>
            <Typography
              sx={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
            >
              <MdWork />
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "Montserrat",

                mb: 1.5,
              }}
            >
              <CountUp start={0} end={40} duration={5} delay={0.5} />+
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              PROJECTS
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default StaticsSummary;
