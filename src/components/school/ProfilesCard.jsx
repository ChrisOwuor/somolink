import React from "react";

export default function ProfilesCard({ profiles = [], onConfigure }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Profiles</h3>
        <button className="text-indigo-600 text-sm" onClick={onConfigure}>
          Configure
        </button>
      </div>

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
  );
}
