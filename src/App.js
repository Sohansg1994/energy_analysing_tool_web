import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Projects from "./pages/UserDashboard/Projects";
import TariffData from "./pages/UserDashboard/TariffData";
import ProjectDetails from "./pages/UserDashboard/ProjectDetails";
import Statics from "./pages/UserDashboard/Statics";
import HomeVisitForm from "./pages/HomeVisitForm";
import Error from "./pages/Error";
import Services from "./pages/Services";
import Subscription from "./pages/Subscription";
import PaymentDetails from "./pages/PaymentDetails";

function App() {
  return (
    <div className="app" style={{ height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tarifficdata" element={<TariffData />} />
          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/homevisit" element={<HomeVisitForm />} />
          <Route path="/error" element={<Error />} />
          <Route path="/paymentDetails" element={<PaymentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
