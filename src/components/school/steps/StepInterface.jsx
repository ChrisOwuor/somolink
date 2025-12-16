import React, { useState } from "react";

/**
 * Add interface form.
 * On save, calls onSave(interfaceObj).
 */
export default function StepInterface({ school, onSave }) {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [dhcp, setDhcp] = useState("");

  function handleSave(e) {
    e.preventDefault();
    const intf = {
      id: `if-${Date.now()}`,
      name,
      ip,
      dhcpPool: dhcp,
    };
    onSave(intf);
    setName("");
    setIp("");
    setDhcp("");
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Step 1 — Add Interface</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Interface Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. ether1"
            className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            IP Address (CIDR)
          </label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="e.g. 192.168.10.1/24"
            className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">DHCP Pool</label>
          <input
            value={dhcp}
            onChange={(e) => setDhcp(e.target.value)}
            placeholder="e.g. 192.168.10.100-192.168.10.200"
            className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-3 py-2 rounded bg-indigo-600 text-white"
          >
            Save Interface
          </button>
        </div>
      </form>
    </div>
  );
}
