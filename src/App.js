import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorPage from "./app/pages/ErrorPage";
import ProjectsPage from "./app/pages/ProjectsPage";
import SettingsPage from "./app/pages/SettingsPage";
import SignIn from "./app/pages/SignIn";
import SignUp from "./app/pages/SignUp";
import TariffDataPage from "./app/pages/TariffDataPage";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import EditorPage from "./app/pages/EditorPage";

function App() {
  return (
    <div className="app" style={{ height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tariffdata" element={<TariffDataPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
