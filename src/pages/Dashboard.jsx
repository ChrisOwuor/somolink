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
  const totalHotspots = 12;
  const activeHotspots = 10;
  const mainRouterTraffic = { up: 250, down: 180 };
  const backboneTraffic = { up: 400, down: 350 };

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
         icon={Server}
         label="Main Router"
         value={`Up: ${mainRouterTraffic.up} Mbps`}
         sub={`Down: ${mainRouterTraffic.down} Mbps`}
       />
       <StatCard
         icon={Activity}
         label="Backbone"
         value={`Up: ${backboneTraffic.up} Mbps`}
         sub={`Down: ${backboneTraffic.down} Mbps`}
       />
     </div>

     {/* Middle section */}
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
       {/* Graphs take more space */}
       <div className="lg:col-span-2">
         <GraphCard title="Top Schools by Traffic" />
       </div>

       <div className="lg:col-span-2">
         <GraphCard title="Main Router Traffic Over Time" />
       </div>
     </div>

     {/* Devices & Alerts — full width by design */}
     <div className="grid grid-cols-1">
       <div className="bg-white border border-gray-200 rounded-lg p-4">
         <div className="flex items-center justify-between mb-3">
           <h3 className="text-sm md:text-base font-semibold text-gray-700 flex items-center gap-2">
             <AlertTriangle size={16} />
             Devices & Alerts
           </h3>
           <button className="text-indigo-600 text-sm">Configure</button>
         </div>

         {/* Devices */}
         <div className="flex gap-3 overflow-x-auto pb-2">
           {mockDevices.map((d) => (
             <div
               key={d.id}
               className="min-w-[160px] border border-gray-200 rounded-lg p-3 flex items-center justify-between text-sm"
             >
               <span className="truncate">{d.name}</span>
               <span
                 className={`h-2.5 w-2.5 rounded-full ${
                   d.online ? "bg-green-500" : "bg-red-500"
                 }`}
               />
             </div>
           ))}
         </div>

         {/* Alerts */}
         <div className="mt-4 space-y-2">
           {mockAlerts.map((alert) => (
             <div
               key={alert.id}
               className={`flex items-center gap-2 p-2 rounded text-xs md:text-sm ${
                 alert.type === "error"
                   ? "bg-red-50 text-red-700"
                   : "bg-blue-50 text-blue-700"
               }`}
             >
               <AlertTriangle size={14} />
               <span className="truncate">{alert.message}</span>
             </div>
           ))}
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
        <Icon size={16} />
        {label}
      </div>
      <div className="text-gray-800 font-semibold text-lg">{value}</div>
      <div className="text-gray-400 text-xs">{sub}</div>
    </div>
  );
}

function GraphCard({ title }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="h-32 md:h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
        Chart Placeholder
      </div>
    </div>
  );
}
