import {BrowserRouter, Route, Routes} from "react-router-dom";

import * as React from "react";
import Home from "./pages/Home";
import SignUp from "./app/pages/SignUp";
import SignIn from "./app/pages/SignIn";
import Subscription from "./pages/Subscription";
import ProjectsPage from "./app/pages/ProjectsPage";
import TariffData from "./pages/UserDashboard/TariffData";
import ProjectDetails from "./pages/UserDashboard/ProjectDetails";
import Statics from "./pages/UserDashboard/Statics";
import ErrorPage from "./app/pages/ErrorPage";

function App() {
  return (
    <div className="app" style={{height: "100%"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/subscription" element={<Subscription/>}/>
          <Route path="/projects" element={<ProjectsPage/>}/>
          <Route path="/tariffdata" element={<TariffData/>}/>
          <Route path="/projectdetails" element={<ProjectDetails/>}/>
          <Route path="/statics" element={<Statics/>}/>
          <Route path="/*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
