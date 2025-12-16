import React from "react";

export default function AccessPointsCard({ accessPoints = [], onConfigure }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Access Points</h3>
        <button className="text-indigo-600 text-sm" onClick={onConfigure}>
          Configure
        </button>
      </div>

      {accessPoints.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No access points configured.
        </div>
      ) : (
        <ul className="space-y-2">
          {accessPoints.map((ap) => (
            <li key={ap.mac} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{ap.name || ap.mac}</div>
                <div className="text-xs text-gray-400">
                  {ap.hotspotId ? `Hotspot: ${ap.hotspotId}` : "Unassigned"}
                </div>
              </div>
              <div
                className={`h-2 w-2 rounded-full ${
                  ap.online ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
