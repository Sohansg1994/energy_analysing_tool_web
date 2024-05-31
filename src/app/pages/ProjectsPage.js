import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import Projects from "../components/dashboard/Projects";
import { PATHS, ROLES, SUBSPRIPTION_PLANS } from "../util/CommonUtil";
import { useAuthStore } from "../util/store";

function ProjectsPage() {
  const authData = useAuthStore((state) => state.authData);
  const role = authData.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (authData.subscriptionPlanName === SUBSPRIPTION_PLANS.UNSUBSCRIBE) {
      navigate(PATHS.SUBSPRIPTION);
    }
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      {role === ROLES.ADMIN && <AdminDrawer />}
      {role === ROLES.USER && <UserDrawer />}
      <Projects />
    </Box>
  );
}

export default ProjectsPage;
