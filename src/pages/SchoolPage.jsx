import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SchoolOverview from "../components/school/pages/SchoolOverview";
import SchoolMonitoring from "../components/school/pages/SchoolMonitoring";
import SchoolConfig from "../components/school/pages/SchoolConfig";
import { ArrowLeft, MapPin, Hash, Activity } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function SchoolPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/schools/${id}`);
        if (!res.ok) throw new Error("Failed to fetch school");
        const data = await res.json();

        setSchool({
          ...data,
          devices: data.devices ?? [],
          users: data.users ?? [],
          accessPoints: data.accessPoints ?? [],
          hotspots: data.hotspots ?? [],
          profiles: data.profiles ?? [],
          metrics: data.metrics ?? {},
          alerts: data.alerts ?? [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id]);

  if (loading) return <div className="p-6">Loading school...</div>;
  if (!school) return <div className="p-6">School not found</div>;

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-6 flex flex-col">
        {/* ================= FIXED HEADER ================= */}
        <div className="shrink-0 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex items-start gap-4">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  school.active
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <Activity size={18} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {school.name}
                </h1>

                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Hash size={14} />
                    {school.code}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {school.location}
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-2 mt-2 text-xs font-medium px-2.5 py-1 rounded-full ${
                    school.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      school.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                  {school.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => navigate("/schools")}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-white border hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back to schools
            </button>
          </div>

          {/* ================= FIXED TABS ================= */}
          <div className="mt-6 ">
            <nav className="flex gap-6">
              {["overview", "monitoring", "config"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="flex-1 overflow-y-auto py-6">
          {activeTab === "overview" && <SchoolOverview school={school} />}
          {activeTab === "monitoring" && <SchoolMonitoring school={school} />}
          {activeTab === "config" && (
            <SchoolConfig school={school} onUpdate={setSchool} />
          )}
        </div>
      </div>
    </div>
  );
}

