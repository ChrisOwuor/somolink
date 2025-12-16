import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SchoolOverview from "../components/school/SchoolOverview";
import SchoolConfig from "../components/school/SchoolConfig";


/**
 * SchoolPage - wrapper that loads school (mock) and provides
 * the top-level tabs: Overview (preview) and Configure (wizard).
 */
export default function SchoolPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock initial school data (would come from API)
  const [school, setSchool] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // mock fetch - replace with API call
    const mock = {
      id,
      name: "Greenwood High",
      code: "GW001",
      location: "Nairobi",
      active: true,
      interfaces: [],
      hotspots: [],
      profiles: [],
      accessPoints: [],
      users: [],
      metrics: {
        devicesConnected: 0,
        traffic24h: 0,
        lastSeen: null,
      },
    };
    // simulate load
    setTimeout(() => setSchool(mock), 150);
  }, [id]);

  if (!school) return <div className="p-6">Loading school...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {school.name}
            </h1>
            <p className="text-sm text-gray-500">
              {school.code} • {school.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/schools")}
              className="px-3 py-2 rounded-md text-sm bg-white border border-gray-200"
            >
              Back to list
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className="px-3 py-2 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Configure
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 ${
                activeTab === "overview"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`pb-3 ${
                activeTab === "config"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Configuration
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "overview" ? (
            <SchoolOverview
              school={school}
              onEdit={() => setActiveTab("config")}
              onUpdate={(patch) => setSchool((s) => ({ ...s, ...patch }))}
            />
          ) : (
            <SchoolConfig
              school={school}
              onUpdate={(patch) => setSchool((s) => ({ ...s, ...patch }))}
              onDone={() => setActiveTab("overview")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
