import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProviders from "./context/AppProviders";

import AppLayout from "./layouts/AppLayout";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/Dashboard";
import Schools from "./pages/Schools";
import Ports from "./pages/Ports";
import Settings from "./pages/Settings";
import SchoolPage from "./pages/SchoolPage";
import UserProfilePage from "./pages/UserProfilePage";

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* ===== AUTH ROUTES (NO SIDEBAR) ===== */}
          <Route path="/login" element={<Login />} />

          {/* ===== APP ROUTES (WITH SIDEBAR) ===== */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/ports" element={<Ports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/school/:id" element={<SchoolPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
          
        </Routes>
      </Router>
    </AppProviders>
  );
}
