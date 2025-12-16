import React from "react";
import DevicesCard from "./DevicesCard";
import TrafficCard from "./TrafficCard";
import AccessPointsCard from "./AccessPointsCard";
import HotspotCard from "./HotspotCard";
import ProfilesCard from "./ProfilesCard";


/**
 * SchoolOverview - read-only dashboard view
 * Buttons that say "Configure" call onEdit() to open the wizard.
 */
export default function SchoolOverview({ school, onEdit }) {
    
  return (
    <div className="space-y-6">
      {/* Row 1: three cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DevicesCard devices={school.devices || []} onConfigure={onEdit} />
        <TrafficCard metrics={school.metrics || {}} />
        <AccessPointsCard
          accessPoints={school.accessPoints || []}
          onConfigure={onEdit}
        />
      </div>

      {/* Row 2: hotspot + profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HotspotCard hotspots={school.hotspots || []} onConfigure={onEdit} />
        <ProfilesCard profiles={school.profiles || []} onConfigure={onEdit} />
      </div>

      {/* Row 3: system logs placeholder */}
      <div className="bg-white border border-gray-200 p-4 rounded">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          System Logs & Recent Events
        </h3>
        <p className="text-sm text-gray-500">No recent events (mock).</p>
      </div>
    </div>
  );
}
