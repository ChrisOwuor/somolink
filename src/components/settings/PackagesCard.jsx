import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function PackagesCard({ onConfigure }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/hotspot/user/profiles`);
      if (!res.ok) throw new Error("Failed to fetch packages");
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Convert Kbps to Mbps
  const kbpsToMbps = (kbps) => (kbps / 1024).toFixed(2);

  return (
    <div className="space-y-2 border border-gray-200 p-4 rounded">
      {loading ? (
        <div className="text-gray-500 text-sm">Loading packages...</div>
      ) : packages.length === 0 ? (
        <div className="text-gray-500 text-sm">No packages defined.</div>
      ) : (
        <ul className="space-y-2">
          {packages.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between p-3 rounded bg-gray-50"
            >
              <div className="space-y-1">
                <div className="text-sm font-medium">{p.profileName}</div>
                <div className="text-xs text-gray-500">
                  Upload: {kbpsToMbps(p.rateLimitUpload)} Mbps • Download:{" "}
                  {kbpsToMbps(p.rateLimitDownload)} Mbps • Session:{" "}
                  {p.sessionTimeout} • KES {p.amount.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onConfigure(p)}
                className="text-indigo-600 text-sm"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => onConfigure(null)}
        className="mt-2 text-sm text-indigo-600 hover:underline"
      >
        + Add New Package
      </button>
    </div>
  );
}
