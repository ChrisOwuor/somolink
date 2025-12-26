import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Wallet, Calendar, CreditCard } from "lucide-react";

/* ================= STAT CARD ================= */
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
        <Icon size={16} />
        {label}
      </div>
      <div className="text-gray-800 font-semibold text-lg">{value}</div>
      <div className="text-gray-400 text-xs">{sub}</div>
    </div>
  );
}

/* ================= FINANCE PAGE ================= */
export default function FinancePage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-[calc(100vh-3rem)] bg-gray-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-6 flex flex-col">
        {/* ================= HEADER + STATS ================= */}
        <div
          className={`shrink-0 transition-all duration-300 ease-in-out ${
            expanded
              ? "opacity-0 -translate-y-6 max-h-0 overflow-hidden"
              : "opacity-100 translate-y-0 max-h-[500px]"
          }`}
        >
          <div className="pt-6">
            <h1 className="text-2xl font-semibold text-gray-900">Finance</h1>
            <p className="text-sm text-gray-500">
              Payments, revenue & transaction history
            </p>

            {/* ================= STATS ================= */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                icon={Wallet}
                label="Total Revenue"
                value="KES 482,300"
                sub="All-time collections"
              />
              <StatCard
                icon={Calendar}
                label="Today’s Revenue"
                value="KES 18,450"
                sub="Collected today"
              />
              <StatCard
                icon={CreditCard}
                label="Transactions"
                value="1,284"
                sub="Successful payments"
              />
            </div>

            {/* ================= TABS ================= */}
            <nav className="mt-6 flex gap-6">
              {["transactions", "revenue"].map((tab) => (
                <NavLink
                  key={tab}
                  to={`/finance/${tab}`}
                  className={({ isActive }) =>
                    `pb-3 text-sm capitalize ${
                      isActive
                        ? "border-b-2 border-indigo-600 text-indigo-600"
                        : "text-gray-600"
                    }`
                  }
                >
                  {tab}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto py-6">
          <Outlet context={{ expanded, setExpanded }} />
        </div>
      </div>
    </div>
  );
}
