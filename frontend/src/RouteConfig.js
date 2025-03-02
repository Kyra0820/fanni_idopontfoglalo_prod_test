import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Consent from "./Consent";
import GTC from "./GTC";
import AdminPage from "./AdminPage";
import AppointmentSelector from "./AppointmentSelector";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Timeslots from "./Timeslots"
function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/consent" element={<Consent />} />
      <Route path="/gtc" element={<GTC />} />
      <Route path="/timeslots" element={<Timeslots />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/appointment-selector" element={<AppointmentSelector />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
}

export default RouteConfig;
