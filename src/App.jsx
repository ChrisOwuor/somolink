import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Schools from "./pages/Schools";
import Hotspots from "./pages/Hotspots";
import Ports from "./pages/Ports";
import SchoolPage from "./pages/SchoolPage";
import UserProfilePage from "./pages/UserProfilePage";

const schoolData = {
  id: 6,
  name: "Floyd Miles",
  title: "Principal Designer",
  email: "floyd.miles@example.com",
  role: "Member",
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="flex items-center justify-between ">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </header>

          {/* Main Routes */}
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/hotspots" element={<Hotspots />} />
              <Route path="/ports" element={<Ports />} />
              <Route
                path="/school/:id"
                element={<SchoolPage school={schoolData} />}
              />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
