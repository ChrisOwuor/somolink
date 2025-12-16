import React from "react";

/**
 * DevicesCard - horizontally scrollable devices mini-cards
 */
export default function DevicesCard({ devices = [], onConfigure }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Devices</h3>
        <button onClick={onConfigure} className="text-indigo-600 text-sm">
          Configure
        </button>
      </div>

      {devices.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No devices. Connect devices to see them here.
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto py-2">
          {devices.map((d) => (
            <div
              key={d.id}
              className="min-w-[160px] border border-gray-100 rounded p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{d.name}</div>
                  <div className="text-xs text-gray-400">{d.type}</div>
                </div>
                <div
                  className={`h-2 w-2 rounded-full ${
                    d.online ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
