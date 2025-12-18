import React from "react";
import DevicesCard from "./DevicesCard";
import TrafficCard from "./TrafficCard";
import AccessPointsCard from "./AccessPointsCard";
import HotspotCard from "./HotspotCard";
import ProfilesCard from "./ProfilesCard";
import PortConfigurationsCard from "./PortConfigurationsCard";

export default function SchoolOverview({ school, onEdit }) {
  return (
    <div className="space-y-8">
      {/* ============================= */}
      {/* MONITORING & STATUS */}
      {/* ============================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Monitoring & Status
        </h2>

        <div className="grid grid-colsa-1 md:grid-cols-3 gap-6">
          <DevicesCard devices={school.devices || []} onConfigure={onEdit} />

          <TrafficCard metrics={school.metrics || {}} />

          <AccessPointsCard
            accessPoints={school.accessPoints || []}
            onConfigure={onEdit}
          />
        </div>
      </section>

      {/* ============================= */}
      {/* NETWORK SERVICES */}
      {/* ============================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Network Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HotspotCard hotspots={school.hotspots || []} onConfigure={onEdit} />

          <ProfilesCard profiles={school.profiles || []} onConfigure={onEdit} />

          <PortConfigurationsCard
            bridgeConfig={school.bridgeConfiguration}
            onConfigure={onEdit}
          />
        </div>
      </section>

      {/* ============================= */}
      {/* SYSTEM & AUDIT */}
      {/* ============================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          System & Audit
        </h2>

        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="text-sm text-gray-500">No recent events (mock).</p>
        </div>
      </section>
    </div>
  );
}
