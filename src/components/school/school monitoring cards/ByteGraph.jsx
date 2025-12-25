import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ByteGraph = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map((point, index) => ({
      x: index,
      rxKbps: (point.rxBps || 0) / 1000,
      txKbps: (point.txBps || 0) / 1000,
    }));
  }, [data]);

  const MAX_SCALE = 500;
  const TICKS = [0, 100, 200, 300, 400, 500];

  if (!data || data.length === 0) {
    return (
      <div className="h-40 w-full bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs italic">
        Awaiting Interface Traffic...
      </div>
    );
  }

  return (
    <div
      className="bg-[#fcfcfc] border  rounded overflow-hidden font-sans"
      style={{ width: "100%", maxWidth: "480px" }} // Balanced width
    >
      {/* Sleek Header */}
      <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex justify-between items-center">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
          Interface: ether1
        </span>
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-mono uppercase">
            Live
          </span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="h-40 w-full bg-white relative px-1 pt-2 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#f1f5f9"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              hide
            />

            <YAxis
              orientation="right"
              domain={[0, MAX_SCALE]}
              ticks={TICKS}
              tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 500 }}
              tickFormatter={(val) => (val === 0 ? "0" : `${val}k`)}
              width={40}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 41, 59, 0.9)",
                border: "none",
                borderRadius: "4px",
                padding: "6px",
              }}
              itemStyle={{ fontSize: "10px", color: "#fff", padding: "2px 0" }}
              labelStyle={{ display: "none" }}
              formatter={(val, name) => [
                `${val.toFixed(1)} kbps`,
                name === "txKbps" ? "Upload" : "Download",
              ]}
            />

            {/* Upload (Tx) - Blue Wave */}
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="txKbps"
              stroke="#2563eb"
              strokeWidth={2}
              fill="transparent"
            />

            {/* Download (Rx) - Green Wave */}
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="rxKbps"
              stroke="#16a34a"
              strokeWidth={2}
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Styled Values Footer */}
      <div className="grid grid-cols-2 border-t border-slate-200 bg-white">
        <div className="p-3 border-r border-slate-100 flex flex-col items-center justify-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">
            Tx (Upload)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono font-bold text-blue-600">
              {(processedData[processedData.length - 1]?.txKbps || 0).toFixed(
                1
              )}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">kbps</span>
          </div>
        </div>

        <div className="p-3 flex flex-col items-center justify-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">
            Rx (Download)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono font-bold text-green-600">
              {(processedData[processedData.length - 1]?.rxKbps || 0).toFixed(
                1
              )}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">kbps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByteGraph;
