import {
  School,
  Wifi,
  Activity,
  AlertTriangle,
  Server,
  Users,
  Laptop,
} from "lucide-react";
import ByteGraph from "../components/school/school monitoring cards/ByteGraph";
import SchoolMonitoring from "../components/school/pages/SchoolMonitoring";
import DownlinkMonitoring from "../components/dashboard/DownlinkMonitoring";
import UplinkMonitoring from "../components/dashboard/UplinkMonitoring";

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

const mockRouter = {
  online: true,
  power: "ON",
  ram: "45%",
  cpu: "32%",
  uplink: 180,
  downlink: 210,
};

export default function Dashboard() {
  const totalSchools = mockSchools.length;
  const activeSchools = mockSchools.filter((s) => s.active).length;
  const totalHotspots = 12;
  const activeHotspots = 10;
  const activeUsers = 87;
  const connectedDevices = 56;

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={School}
          label="Schools"
          value={totalSchools}
          sub={`Active: ${activeSchools}`}
        />
        <StatCard
          icon={Wifi}
          label="Hotspots"
          value={totalHotspots}
          sub={`Active: ${activeHotspots}`}
        />
        <StatCard
          icon={Users}
          label="Active Users"
          value={activeUsers}
          sub="Currently online"
        />
        <StatCard
          icon={Laptop}
          label="Connected Devices"
          value={connectedDevices}
          sub="Across all schools"
        />
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Graphs take more space */}
        <div className="lg:col-span-2">
          <GraphCard1 title="Uplink Traffic" color="#10b981" />
        </div>
        <div className="lg:col-span-2">
          <GraphCard2 title="Downlink Traffic" color="#3b82f6" />
        </div>
      </div>

      {/* Router Status — full width */}
      <div className="grid grid-cols-1">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-700 flex items-center gap-2">
              <Server size={16} /> Main Router Status
            </h3>
            <button className="text-indigo-600 text-sm">Configure</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
            <StatusItem
              label="Online"
              value={mockRouter.online ? "Yes" : "No"}
              color={mockRouter.online ? "green" : "red"}
            />
            <StatusItem label="Power" value={mockRouter.power} />
            <StatusItem label="RAM Usage" value={mockRouter.ram} />
            <StatusItem label="CPU Usage" value={mockRouter.cpu} />
            <StatusItem label="Uplink" value={`${mockRouter.uplink} Mbps`} />
            <StatusItem
              label="Downlink"
              value={`${mockRouter.downlink} Mbps`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Reusable Components ---------- */
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
        <Icon size={16} /> {label}
      </div>
      <div className="text-gray-800 font-semibold text-lg">{value}</div>
      <div className="text-gray-400 text-xs">{sub}</div>
    </div>
  );
}

function GraphCard1({ title, data = true }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      {data ? (
        <div className="h-32 md:h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
          {/* Here you can integrate recharts if needed */}
          <UplinkMonitoring />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      )}
    </div>
  );
}
function GraphCard2({ title, data = true }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      {data ? (
        <div className="h-32 md:h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
          {/* Here you can integrate recharts if needed */}
          <DownlinkMonitoring />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      )}
    </div>
  );
}
function StatusItem({ label, value, color }) {
  const textColor =
    color === "green"
      ? "text-green-500"
      : color === "red"
      ? "text-red-500"
      : "text-gray-700";
  return (
    <div className={`bg-gray-50 p-2 rounded text-center ${textColor}`}>
      <div className="font-medium">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
