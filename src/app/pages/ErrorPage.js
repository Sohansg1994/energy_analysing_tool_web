import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import Typography from "../../pages/modules/components/Typography";
import { ROLES } from "../util/CommonUtil";
import { useAuthStore } from "../util/store";

function ErrorPage() {
  const location = useLocation();
  const action = location.state?.action;
  const code = location.state?.code;
  const message = location.state?.message;
  const stack = location.state?.stack;

  const authData = useAuthStore((state) => state.authData);
  const role = authData.role;

  return (
    <Container sx={{ m: 1, p: 1, justifyContent: "center" }}>
      <Grid container sx={{ justifyContent: "center" }} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Sorry!! We encountered some unexpected problems while processing your request.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            Error occured while : {action}
          </Typography>
        </Grid>

        {(role === ROLES.ADMIN || role == ROLES.USER) && (
          <>
            <Grid item xs={12}>
              <Typography>
                Error code : {code}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Message : {message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Stack : {stack}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  )
}

export default ErrorPage;