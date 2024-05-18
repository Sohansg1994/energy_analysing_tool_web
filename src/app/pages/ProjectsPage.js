import Box from "@mui/material/Box";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import Projects from "../components/dashboard/Projects";
import { ROLES } from "../util/CommonUtil";
import { useAuthStore } from "../util/store";

function ProjectsPage() {
  const authData = useAuthStore((state) => state.authData);
  const role = authData.role;

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
