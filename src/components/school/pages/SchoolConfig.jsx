import React, { useState } from "react";
import AccessPointsCard from "../AccessPointsCard";
import HotspotCard from "../HotspotCard";
import PortConfigurationsCard from "../PortConfigurationsCard";
import ProfilesCard from "../ProfilesCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SchoolConfig({ school }) {
  const [openSections, setOpenSections] = useState({
    networkCore: false,
    hotspot: false,
    profiles: false,
    accessPoints: false,
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
            <PortConfigurationsCard bridgeConfig={school.bridgeConfiguration} />
          </div>
        )}
      </div>

      {/* Server Profile */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("profiles")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Server Profile</span>
          {openSections.profiles ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.profiles && (
          <div className="p-4">
            <ProfilesCard profiles={school.profiles} />
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
      <div className="bg-white ">
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
      </div>
    </div>
  );
}
