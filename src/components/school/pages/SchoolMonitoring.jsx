import React, { useEffect, useState } from "react";
import ByteGraph from "../school monitoring cards/ByteGraph";

const API_URL = import.meta.env.VITE_API_URL;
const MAX_POINTS = 180;

export default function SchoolMonitoring() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const iface = "ether1";

    const fetchTraffic = async () => {
      try {
        const res = await fetch(`${API_URL}/traffic/${iface}`);
        const sample = await res.json();

        setData((prev) => {
          const next = [...prev, sample];
          return next.slice(-MAX_POINTS);
        });
      } catch (e) {
        console.error("Traffic fetch failed", e);
      }
    };

    fetchTraffic();
    const id = setInterval(fetchTraffic, 1000); // WinBox refresh rate
    return () => clearInterval(id);
  }, []);

  return <ByteGraph data={data} />;
}

