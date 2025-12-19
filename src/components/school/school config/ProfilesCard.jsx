import React, { useState } from "react";
import { UserCog, X } from "lucide-react";
import Drawer from "../../common/Drawer";

export default function ProfilesCard({ profiles = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserCog className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Profiles</h3>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Configure
          </button>
        </div>

        {/* Profiles List */}
        {profiles.length === 0 ? (
          <div className="text-gray-500 text-sm">No profiles defined.</div>
        ) : (
          <ul className="space-y-2">
            {profiles.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-gray-400">
                    {p.speed} • {p.duration}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure Profiles"
      >
        {/* Placeholder for profile configuration form */}
        <p className="text-sm text-gray-700">
          Add/edit profile configuration form goes here.
        </p>
      </Drawer>
    </>
  );
}
