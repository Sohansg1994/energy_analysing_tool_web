import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import IntroductionLayout from "./IntroductionLayout";

export default function Introduction() {
  const imageUrl = "/background_pic.jpg";

  return (
    <IntroductionLayout
      sxBackground={{
        backgroundColor: "#94AF9F",
        backgroundPosition: "center",
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ fontFamily: "Montserrat" }}
      >
        Are you worried about your energy bill ?
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ fontFamily: "Montserrat" }}
      >
        Do you need to optimise your electricity consumption ?
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h3"
        sx={{ fontFamily: "Montserrat", m: 3 }}
        marked="center"
      >
        Calculate your GREEN BILL
      </Typography>
      <Button
        id="build-project-component"
        variant="contained"
        size="large"
        component="a"
        href="/signup"
        sx={{
          minWidth: 200,
          backgroundColor: "#1F8A70",
          borderRadius: 1.5,
          fontFamily: "Montserrat",
          "&:hover": {
            backgroundColor: "#1c7861",
          },
        }}
      >
        Start the journey
      </Button>
    </IntroductionLayout>
  );
}
