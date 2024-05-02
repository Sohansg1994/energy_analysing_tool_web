import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDrawer from "../components/common/AdminDrawer";
import Header from "../components/common/Header";
import UserDrawer from "../components/common/UserDrawer";
import ProjectEditor from "../components/dashboard/editor/ProjectEditor";
import { ROLES } from "../util/CommonUtil";

function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.projectId;
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!projectId) {
      navigate('/error');
    }
  }, [projectId, navigate]);

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
