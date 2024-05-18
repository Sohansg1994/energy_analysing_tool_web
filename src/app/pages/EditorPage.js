import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import ProjectEditor from "../components/dashboard/editor/ProjectEditor";
import { PATHS, ROLES } from "../util/CommonUtil";
import { useAuthStore } from "../util/store";

function EditorPage() {
  const authData = useAuthStore((state) => state.authData);
  const role = authData.role;

  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.projectId;


  useEffect(() => {
    if (!projectId) {
      navigate(PATHS.ERROR);
    }
  }, [projectId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header position="absolute" />
      {role === ROLES.ADMIN && <AdminDrawer />}
      {role === ROLES.USER && <UserDrawer />}
      <ProjectEditor projectId={projectId} />
    </Box>
  );
}

export default EditorPage;
