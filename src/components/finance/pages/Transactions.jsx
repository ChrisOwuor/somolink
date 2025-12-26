import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

const PAGE_SIZE = 5;

/* ================= DUMMY DATA ================= */
const DUMMY_TRANSACTIONS = [
  {
    id: 1,
    createdAt: "2025-01-20T10:30:00",
    phoneNumber: "254712345678",
    schoolName: "Huggin High School",
    packageName: "Daily 1GB",
    amount: 50,
    status: "SUCCESS",
    reference: "MPESA123ABC",
  },
  {
    id: 2,
    createdAt: "2025-01-20T11:10:00",
    phoneNumber: "254798112233",
    schoolName: "St Mary Academy",
    packageName: "Weekly 5GB",
    amount: 300,
    status: "FAILED",
    reference: "MPESA456DEF",
  },
  {
    id: 3,
    createdAt: "2025-01-21T08:45:00",
    phoneNumber: "254701998877",
    schoolName: "Huggin High School",
    packageName: "Monthly Unlimited",
    amount: 2500,
    status: "SUCCESS",
    reference: "MPESA789XYZ",
  },
];

export default function TransactionsPage() {
  const { expanded, setExpanded } = useOutletContext();

  const [transactions] = useState(DUMMY_TRANSACTIONS);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");

  /* ================= FILTER ================= */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.phoneNumber.includes(search) ||
        tx.schoolName.toLowerCase().includes(search.toLowerCase()) ||
        tx.reference.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? tx.status === statusFilter : true;
      const matchesSchool = schoolFilter
        ? tx.schoolName === schoolFilter
        : true;

      return matchesSearch && matchesStatus && matchesSchool;
    });
  }, [transactions, search, statusFilter, schoolFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE);
  const pagedTransactions = filteredTransactions.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="space-y-4">
      {/* ================= TABLE HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50"
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          {expanded ? "Exit focus" : "Expand"}
        </button>
      </div>

      {/* ================= FILTER BAR ================= */}
      {
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search phone, school, reference..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="pl-9 pr-3 py-2 w-full border rounded-md text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      }

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">School</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {pagedTransactions.map((tx, i) => (
              <tr
                key={tx.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">{tx.phoneNumber}</td>
                <td className="px-4 py-3">{tx.schoolName}</td>
                <td className="px-4 py-3">{tx.packageName}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {tx.amount}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      tx.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-gray-600">
            Showing {filteredTransactions.length ? page * PAGE_SIZE + 1 : 0} to{" "}
            {Math.min(
              page * PAGE_SIZE + PAGE_SIZE,
              filteredTransactions.length
            )}{" "}
            of {filteredTransactions.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-gray-700">
              Page {page + 1} of {totalPages || 1}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
