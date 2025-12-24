import React, { useEffect, useState } from "react";
import TrafficCard from "../school monitoring cards/TrafficCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function SchoolMonitoring() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const iface = "ether1"; // replace with your bridge
    const fetchTraffic = async () => {
      try {
        const res = await fetch(`${API_URL}/traffic/${iface}`);
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch traffic:", err);
      }
    };

    fetchTraffic(); // initial fetch
    const interval = setInterval(fetchTraffic, 3000); // poll every 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Network Traffic
        </h2>
        <TrafficCard metrics={metrics} />
      </section>
    </div>
  );
}
