import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { MdEmail, MdLocationOn, MdCall } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { ImLeaf } from "react-icons/im";
import { hover } from "@testing-library/user-event/dist/hover";
import { SupportOutlined } from "@mui/icons-material";

const iconStyle = {
  fontSize: "2rem",
  "&:hover": {
    fontSize: "4rem",
  },
};

const subHeadingStyle = {
  fontSize: 16,
  fontFamily: "sans-serif",
  "&:hover": {
    borderBottom: "1px solid",
  },
};

export default function Footer() {
  return (
    <footer>
      <Container
        maxWidth={false}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#1e1e1f",
        }}
      >
        <Box
          sx={{
            pt: 4,
            pb: 2,
            width: "100%",
            backgroundColor: "#1e1e1f",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              position: "inherit",
              width: "40%",
              borderRight: "0.2em solid rgba(105, 105, 106, 0.5) ",
              padding: "0.5em",
              display: "flex",
              pr: 4,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box sx={{ mt: 4 }}>
              <ImLeaf size="7rem" color="#4caf50" />
              <Typography
                sx={{
                  fontSize: 35,
                  fontFamily: "Montserrat",
                }}
              >
                GREENBILL
              </Typography>
            </Box>
            <Box>
              <Typography>Power Consumption Service Provider</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "60%",
              backgroundColor: "#1e1e1f",
              display: "flex",

              justifyContent: "space-evenly",
              color: "#fff",
            }}
          >
            <Box>
              <Typography sx={subHeadingStyle}>FOLLOW US</Typography>
              {/*<Divider sx={{ backgroundColor: "white" }} />*/}
              <Box
                sx={{
                  py: 3,
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 2,
                }}
              >
                <FaFacebookSquare style={iconStyle} />
                <FaLinkedin style={iconStyle} />
              </Box>
            </Box>

            <Box>
              <Typography sx={subHeadingStyle}>CONTACT</Typography>
              {/*<Divider sx={{ backgroundColor: "white" }} />*/}
              <Box sx={{ py: 3 }}>
                <Typography sx={{ pb: 1.5 }}>
                  <MdLocationOn size="1.5rem" />
                </Typography>
                <Typography
                  sx={{
                    pb: 1.5,
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 2,
                  }}
                >
                  {<MdEmail size="1.5rem" />}
                  {"support@greenbill.lk"}
                </Typography>
                <Typography sx={{ pb: 1.5 }}>
                  <MdCall size="1.5rem" />
                </Typography>
                <Typography>
                  <IoLogoWhatsapp size="1.5rem" />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "black", width: "100%" }}>
        <Typography
          sx={{
            color: "#69696a",
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        >
          {"© 2023 Copyright: greenbill.lk "}
        </Typography>
      </Box>
    </footer>
  );
}
