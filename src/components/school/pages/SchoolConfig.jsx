import React, { useState } from "react";
import AccessPointsCard from "../school config/AccessPointsCard";
import HotspotCard from "../school config/HotspotCard";
import PortConfigurationsCard from "../school config/PortConfigurationsCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddDevicesCard from "../school config/AddDevicesCard";
import UsersCard from "../school config/UsersCard";
import WLANCard from "../school config/WLANCard";

export default function SchoolConfig({ school }) {
  const [openSections, setOpenSections] = useState({
    networkCore: false,
    hotspot: false,
    profiles: false,
    accessPoints: false,
    devices: false,
    users: false,
    wlan: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Network Core */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("networkCore")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Network Core</span>
          {openSections.networkCore ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.networkCore && (
          <div className="p-4">
            <PortConfigurationsCard
              bridgeConfig={school.bridgeConfiguration}
              school={school}
            />
          </div>
        )}
      </div>



      {/* Hotspot */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("hotspot")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Hotspot</span>
          {openSections.hotspot ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.hotspot && (
          <div className="p-4">
            <HotspotCard hotspots={school.hotspots} />
          </div>
        )}
      </div>

      {/* Access Points */}
      {/* <div className="bg-white ">
        <button
          onClick={() => toggleSection("accessPoints")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Access Points</span>
          {openSections.accessPoints ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.accessPoints && (
          <div className="p-4">
            <AccessPointsCard accessPoints={school.accessPoints} />
          </div>
        )}
      </div> */}
      {/* Add Devices */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("devices")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Add Devices</span>
          {openSections.devices ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.devices && (
          <div className="p-4">
            <AddDevicesCard devices={school.devices} schoolId={school.id} />
          </div>
        )}
      </div>

      {/* Access Points */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("users")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Users</span>
          {openSections.users ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.users && (
          <div className="p-4">
            <UsersCard users={school.users} schoolId={school.id} />
          </div>
        )}
      </div>
      {/* Access Points */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("wlan")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">WLAN</span>
          {openSections.wlan ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.wlan && (
          <div className="p-4">
            <WLANCard wlan={school.openWlan} schoolId={school.id} />
          </div>
        )}
      </div>
    </div>
  );
}
