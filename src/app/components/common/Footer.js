import { Container, Typography } from "@mui/material"
import { COLORS } from "../../util/CommonUtil"

function Footer() {
  return (
    <Container sx={{
      backgroundColor: COLORS.SUCCESS_GREEN,
      textAlign: "center",
      bottom: 0,
      position: "fixed"
    }} maxWidth={false}>
      <Typography sx={{p: 1, color: COLORS.WHITE}}>
        © 2023 Copyright: greenbill.lk
      </Typography>
    </Container>
  )
}

export default Footer