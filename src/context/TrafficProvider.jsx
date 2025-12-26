import React, { createContext, useContext, useState, useEffect } from "react";

const TrafficContext = createContext();

export const TrafficProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <TrafficContext.Provider value={{ data, setData }}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => useContext(TrafficContext);
