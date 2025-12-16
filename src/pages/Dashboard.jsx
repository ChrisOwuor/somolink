import { School, Wifi, Activity, AlertTriangle, Server } from "lucide-react";

const mockSchools = [
  { id: 1, name: "Greenwood High", active: true, traffic: 120 },
  { id: 2, name: "Sunrise Academy", active: true, traffic: 95 },
  { id: 3, name: "Hilltop School", active: false, traffic: 60 },
  { id: 4, name: "Maple Leaf", active: true, traffic: 80 },
];

const mockDevices = [
  { id: 1, name: "Laptop – Windows", online: true },
  { id: 2, name: "Phone – Android", online: false },
  { id: 3, name: "Tablet – iPad", online: true },
  { id: 4, name: "Laptop – Mac", online: true },
];

const mockAlerts = [
  { id: 1, message: "School X connection down", type: "error" },
  { id: 2, message: "New device online: Tablet – iPad", type: "info" },
];

export default function Dashboard() {
  const totalSchools = mockSchools.length;
  const activeSchools = mockSchools.filter((s) => s.active).length;
  const totalHotspots = 12; // example
  const activeHotspots = 10;
  const mainRouterTraffic = { up: 250, down: 180 }; // Mbps
  const backboneTraffic = { up: 400, down: 350 }; // Mbps

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <School size={16} />
            Schools
          </div>
          <div className="text-gray-700 font-semibold text-lg">
            {totalSchools}
          </div>
          <div className="text-gray-400 text-sm">Active: {activeSchools}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Wifi size={16} />
            Hotspots
          </div>
          <div className="text-gray-700 font-semibold text-lg">
            {totalHotspots}
          </div>
          <div className="text-gray-400 text-sm">Active: {activeHotspots}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Server size={16} />
            Main Router Traffic
          </div>
          <div className="text-gray-700 font-semibold text-lg">
            Up: {mainRouterTraffic.up} Mbps
          </div>
          <div className="text-gray-400 text-sm">
            Down: {mainRouterTraffic.down} Mbps
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Activity size={16} />
            Backbone Traffic
          </div>
          <div className="text-gray-700 font-semibold text-lg">
            Up: {backboneTraffic.up} Mbps
          </div>
          <div className="text-gray-400 text-sm">
            Down: {backboneTraffic.down} Mbps
          </div>
        </div>
      </div>

      {/* Middle Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Top Schools by Traffic
          </h3>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
            Graph Placeholder
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Main Router Traffic Over Time
          </h3>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
            Line Chart Placeholder
          </div>
        </div>
      </div>

      {/* Devices Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <AlertTriangle size={16} />
            Devices / Alerts
          </h3>
          <button className="text-indigo-600 text-sm">Configure</button>
        </div>
        <div className="flex gap-3 overflow-x-auto py-2">
          {mockDevices.map((d) => (
            <div
              key={d.id}
              className="min-w-[160px] border border-gray-200 rounded-lg p-3 flex items-center justify-between text-sm text-gray-700"
            >
              <span>{d.name}</span>
              <div
                className={`h-2 w-2 rounded-full ${
                  d.online ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="mt-4">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-2 p-2 rounded text-sm ${
                alert.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <AlertTriangle size={16} />
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
