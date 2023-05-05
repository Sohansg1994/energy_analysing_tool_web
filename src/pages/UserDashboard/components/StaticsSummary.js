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
import { MdDashboard } from "react-icons/md";

function StaticsSummary() {
  return (
    <>
      <Box
        sx={{
          mt: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Card
          sx={{
            width: 345,
            height: 345,

            //background:
            //  "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%)",
            borderRadius: 5,
            boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
          }}
        >
          <CardActionArea
            sx={{
              height: 345,
            }}
          >
            <CardContent>
              <Typography
                sx={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
              >
                <IoPeople />
              </Typography>
              <Typography
                sx={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
              >
                Users
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                  fontFamily: "Montserrat",

                  mt: 5,
                }}
              >
                <CountUp start={0} end={10} duration={10 / 5} delay={0.5} />+
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            width: 345,
            height: 345,
            //background: "rgba(0,0,0,0.2);",
            borderRadius: 5,
            boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
          }}
        >
          <CardActionArea
            sx={{
              height: 345,
            }}
          >
            <CardContent>
              <Typography
                sx={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
              >
                <MdDashboard />
              </Typography>
              <Typography
                sx={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
              >
                Projects
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                  fontFamily: "Montserrat",

                  mt: 5,
                }}
              >
                <CountUp start={0} end={40} duration={5} delay={0.5} />+
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}

export default StaticsSummary;
