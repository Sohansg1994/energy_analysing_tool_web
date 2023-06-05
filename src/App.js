import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Subcription from "./pages/Subscription";
import Projects from "./pages/UserDashboard/Projects";
import TariffData from "./pages/UserDashboard/TariffData";
import ProjectDetails from "./pages/UserDashboard/ProjectDetails";
import Statics from "./pages/UserDashboard/Statics";
import HomeVisitForm from "./pages/HomeVisitForm";
import Error from "./pages/Error";

function App() {
  return (
    <div className="app" style={{ height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subcription" element={<Subcription />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tarifficdata" element={<TariffData />} />
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/homevisit" element={<HomeVisitForm />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
