import React from "react";
import { Network, Wifi } from "lucide-react";
import { CheckCircle, XCircle} from "lucide-react";


const COLORS = [
  "bg-indigo-100 text-indigo-800",
  "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-purple-100 text-purple-800",
];

export default function PortConfigurationsCard({ bridgeConfig }) {
  if (!bridgeConfig) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded flex items-center justify-between">
        <p className="text-xs text-gray-500">
          No bridge configuration available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-3 rounded space-y-2 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-gray-500" />

          <h3 className="text-sm font-semibold text-gray-700">Interface</h3>
        </div>
        <button className="text-indigo-600 text-sm" onClick={""}>
          Configure
        </button>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="">
          <span className="text-xs text-gray-500">NAME: </span>
          {bridgeConfig.portName}
        </h3>

        {/* Configured Status */}
        <div className="ml-auto flex items-center gap-1">
          <span className="text-xs text-gray-500">Configured:</span>
          {bridgeConfig.configured ? (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-green-800 shadow-sm animate-pulse">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Yes</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-800">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-medium">No</span>
            </div>
          )}
        </div>
      </div>
      {/* CIDR */}
      <p className="text-xs text-gray-500">
        CIDR:{" "}
        <span className="text-gray-700 font-medium">{bridgeConfig.cidr}</span>
      </p>
      {/* Interfaces */}
      <div className="flex flex-wrap gap-2 mt-1">
        {bridgeConfig.interfaces.map((iface, index) => {
          const colorClass = COLORS[index % COLORS.length];
          const isWireless = iface.toLowerCase().includes("wlan");
          return (
            <div
              key={iface}
              className={`flex items-center gap-1 px-2 py-1 rounded border ${colorClass} text-xs truncate max-w-[120px]`}
            >
              {isWireless ? (
                <Wifi className="w-3 h-3 text-gray-600 flex-shrink-0" />
              ) : (
                <Network className="w-3 h-3 text-gray-600 flex-shrink-0" />
              )}
              <span className="truncate">{iface}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
