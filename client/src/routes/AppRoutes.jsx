import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <PrivateRoute>
            <Leads />
          </PrivateRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;