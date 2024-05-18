import { BrowserRouter, Route, Routes } from "react-router-dom";

import EditorPage from "./app/pages/EditorPage";
import ErrorPage from "./app/pages/ErrorPage";
import ProjectsPage from "./app/pages/ProjectsPage";
import SettingsPage from "./app/pages/SettingsPage";
import SignIn from "./app/pages/SignIn";
import SignUp from "./app/pages/SignUp";
import TariffDataPage from "./app/pages/TariffDataPage";
import { PATHS } from "./app/util/CommonUtil";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import SubscriptionsPage from "./app/pages/SubscriptionsPage";

function App() {
  return (
    <div className="app" style={{ height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.SIGN_IN} element={<SignIn />} />
          <Route path={PATHS.SIGN_UP} element={<SignUp />} />

          <Route path="subb" element={<Subscription />} />
          <Route path={PATHS.SUBSPRIPTION} element={<SubscriptionsPage />} />
          <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
          <Route path={PATHS.TARIFF} element={<TariffDataPage />} />
          <Route path={PATHS.EDITOR} element={<EditorPage />} />
          <Route path={PATHS.SETTINGS} element={<SettingsPage />} />

          <Route path={PATHS.WILDCARD} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
