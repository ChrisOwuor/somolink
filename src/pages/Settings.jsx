import React, { useState, useEffect } from "react";
import PackagesCard from "../components/settings/PackagesCard";
import Drawer from "../components/common/Drawer";
import { ChevronDown, ChevronUp } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [packages, setPackages] = useState([]);
  const [packagesFetched, setPackagesFetched] = useState(false);

  // Fetch packages only when accordion is opened for the first time
  useEffect(() => {
    if (activeAccordion === 1 && !packagesFetched) {
      const fetchPackages = async () => {
        try {
          const res = await fetch(`${API_URL}/hotspot/user/profiles`);
          if (!res.ok) throw new Error("Failed to fetch packages");
          const data = await res.json();
          setPackages(
            data.map((p) => ({
              ...p,
              speedUpload: p.rateLimitUpload / 1024, // Mbps
              speedDownload: p.rateLimitDownload / 1024, // Mbps
              amount: p.amount,
              sessionTimeout: p.sessionTimeout,
              profileName: p.profileName,
            }))
          );
          setPackagesFetched(true);
        } catch (err) {
          console.error(err);
        }
      };

      fetchPackages();
    }
  }, [activeAccordion, packagesFetched]);

  // Drawer form state
  const [newPackage, setNewPackage] = useState({
    profileName: "",
    speedUpload: "",
    speedDownload: "",
    sessionTimeout: "1h",
    idleTimeout: "10m",
    amount: "",
    description: "",
  });

  const handleSavePackage = async (e) => {
    e.preventDefault();

    const payload = {
      profileName: newPackage.profileName,
      rateLimitUpload: Math.round(Number(newPackage.speedUpload) * 1024), // convert Mbps to kbps
      rateLimitDownload: Math.round(Number(newPackage.speedDownload) * 1024),
      sessionTimeout: newPackage.sessionTimeout,
      idleTimeout: newPackage.idleTimeout,
      amount: parseFloat(newPackage.amount),
      description: newPackage.description,
    };

    try {
      const res = await fetch(`${API_URL}/hotspot/create/user/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save package");
      const savedPackage = await res.json();

      setPackages((prev) => [
        ...prev,
        {
          ...savedPackage,
          speedUpload: savedPackage.rateLimitUpload / 1024,
          speedDownload: savedPackage.rateLimitDownload / 1024,
        },
      ]);

      setDrawerOpen(false);
      setNewPackage({
        profileName: "",
        speedUpload: "",
        speedDownload: "",
        sessionTimeout: "1h",
        idleTimeout: "10m",
        amount: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save package");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">ISP Settings</h1>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Packages Accordion */}
          <div className="bg-white rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-t"
              onClick={() =>
                setActiveAccordion(activeAccordion === 1 ? null : 1)
              }
            >
              <span>Packages</span>
              <span>
                {activeAccordion === 1 ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>

            {activeAccordion === 1 && (
              <div className="p-4 space-y-4">
                <PackagesCard
                  packages={packages}
                  onConfigure={() => setDrawerOpen(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer for creating a new package */}
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setNewPackage({
            profileName: "",
            speedUpload: "",
            speedDownload: "",
            sessionTimeout: "1h",
            idleTimeout: "10m",
            amount: "",
            description: "",
          });
        }}
        title="Create Package"
      >
        <form className="space-y-4" onSubmit={handleSavePackage}>
          <div>
            <label className="block text-sm text-gray-700">Profile Name</label>
            <input
              type="text"
              value={newPackage.profileName}
              onChange={(e) =>
                setNewPackage({ ...newPackage, profileName: e.target.value })
              }
              required
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">
                Upload Limit (Mbps)
              </label>
              <input
                type="number"
                value={newPackage.speedUpload}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, speedUpload: e.target.value })
                }
                min={0}
                step={0.01}
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Download Limit (Mbps)
              </label>
              <input
                type="number"
                value={newPackage.speedDownload}
                onChange={(e) =>
                  setNewPackage({
                    ...newPackage,
                    speedDownload: e.target.value,
                  })
                }
                min={0}
                step={0.01}
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">
                Session Timeout
              </label>
              <input
                type="text"
                value={newPackage.sessionTimeout}
                onChange={(e) =>
                  setNewPackage({
                    ...newPackage,
                    sessionTimeout: e.target.value,
                  })
                }
                placeholder="e.g., 1h"
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Idle Timeout
              </label>
              <input
                type="text"
                value={newPackage.idleTimeout}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, idleTimeout: e.target.value })
                }
                placeholder="e.g., 10m"
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Amount (KES)</label>
            <input
              type="number"
              value={newPackage.amount}
              onChange={(e) =>
                setNewPackage({ ...newPackage, amount: e.target.value })
              }
              min={0}
              step="0.01"
              required
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Description</label>
            <input
              type="text"
              value={newPackage.description}
              onChange={(e) =>
                setNewPackage({ ...newPackage, description: e.target.value })
              }
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 rounded border text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              Save Package
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
