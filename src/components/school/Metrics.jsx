import { BarChart2, Activity } from "lucide-react";

export default function Metrics({ school }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Metrics</h2>
      <div className="flex gap-4">
        <div className="flex flex-col items-center bg-green-100 p-4 rounded">
          <BarChart2 size={40} className="text-green-600" />
          <span className="mt-2 font-medium text-green-700">
            Hotspot Active
          </span>
        </div>
        <div className="flex flex-col items-center bg-red-100 p-4 rounded">
          <Activity size={40} className="text-red-600" />
          <span className="mt-2 font-medium text-red-700">Hotspot Offline</span>
        </div>
      </div>
    </div>
  );
}
