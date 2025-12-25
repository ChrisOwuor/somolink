import React, { createContext, useContext, useState, useEffect } from "react";

const TrafficContext = createContext();

export const TrafficProvider = ({ children }) => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/traffic/ether1"); // Your API endpoint
        const sample = await response.json();

        setTrafficData((prev) => {
          const next = [...prev, sample];
          return next.slice(-100); // Keep last 100 points
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TrafficContext.Provider value={trafficData}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => useContext(TrafficContext);
