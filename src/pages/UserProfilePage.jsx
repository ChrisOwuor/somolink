import { User, Mail, Shield, Smartphone, Pen } from "lucide-react";

export default function UserProfilePage() {
  const user = {
    name: "Chrispine Owuor",
    email: "chris@somolink.com",
    role: "Admin",
    lastLogin: "Today at 9:42 AM",
    devices: ["Chrome – Windows 10", "Safari – iPhone 14", "Android App"],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white border border-gray-100 rounded p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">{user.name}</div>
            <div className="text-sm text-gray-400">{user.email}</div>
            <div className="text-xs text-gray-500 mt-1">{user.role}</div>
          </div>
        </div>
        <button className="text-indigo-600 text-sm flex items-center gap-1">
          <Pen size={14} /> Edit
        </button>
      </div>

      {/* Account Details Card */}
      <div className="bg-white border border-gray-100 rounded p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Account Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail size={14} />
            Email: <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield size={14} />
            Role: <span className="text-gray-700">{user.role}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User size={14} />
            Last Login: <span className="text-gray-700">{user.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* Devices Card */}
      <div className="bg-white border border-gray-100 rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Devices</h3>
          <button className="text-indigo-600 text-sm">Configure</button>
        </div>

        {user.devices.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No devices. Connect devices to see them here.
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto py-2">
            {user.devices.map((device, index) => (
              <div
                key={index}
                className="min-w-[160px] border border-gray-100 rounded p-3 flex items-center justify-between"
              >
                <div className="text-sm text-gray-700">{device}</div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
