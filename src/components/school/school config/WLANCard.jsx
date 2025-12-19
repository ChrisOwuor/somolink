import React, { useState } from "react";
import { Wifi, X } from "lucide-react";
import Drawer from "../../common/Drawer";

export default function WLANCard({ wifis = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">WLAN</h3>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Configure
          </button>
        </div>

        {wifis.length === 0 ? (
          <div className="text-gray-500 text-sm">No WLANs created.</div>
        ) : (
          <ul className="space-y-2">
            {wifis.map((w) => (
              <li key={w.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{w.name}</div>
                  <div className="text-xs text-gray-400">{w.ssid}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure WLAN"
      >
        <p className="text-sm text-gray-700">
          Add/edit wireless networks here (SSID, security, password, etc.).
        </p>
      </Drawer>
    </>
  );
}
