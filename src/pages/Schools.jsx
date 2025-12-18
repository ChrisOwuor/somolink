import React, { useState, useMemo, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Activity, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const usersPerPage = 5;

  // ---- Fetch schools ----
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/schools/all`);
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // ---- Add school ----
  const handleAddSchool = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/schools/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create school");

      const createdSchool = await res.json();
      setSchools((prev) => [createdSchool, ...prev]);
      setShowModal(false);
      setFormData({ name: "", location: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Search & Pagination ----
  const filteredSchools = useMemo(() => {
    if (!searchTerm) return schools;

    const term = searchTerm.toLowerCase();
    return schools.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.location?.toLowerCase().includes(term) ||
        s.code?.toLowerCase().includes(term)
    );
  }, [searchTerm, schools]);

  const totalPages = Math.ceil(filteredSchools.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="bg-gray-50 flex justify-center items-start min-h-screen">
      <div className="max-w-7xl w-full bg-white overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between ">
          <h2 className="text-xl font-semibold text-gray-900">Schools</h2>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md px-3 py-2 text-indigo-600 text-sm hover:text-indigo-900 hover:bg-indigo-500"
          >
            Add School
          </button>
        </div>

        {/* Search */}
        <div className="p-6 ">
          <div className="relative max-w-xs">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-6 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Code
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-sm">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                currentSchools.map((school) => (
                  <tr key={school.id}>
                    <td className="py-4 pl-6 ">
                      <NavLink
                        to={`/school/${school.id}`}
                        className="text-indigo-600 text-sm hover:text-indigo-900"
                      >
                        {school.name}
                      </NavLink>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {school.code}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {school.location}
                    </td>

                    <td className="px-3 py-4 ">
                      {school.active ? (
                        <div className="p-1 w-max bg-green-100 rounded-full">
                          <TrendingUp size={18} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="p-1 bg-red-100 rounded-full">
                          <Activity size={18} className="text-red-600" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

              {!loading && currentSchools.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No schools found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between  px-4 py-3">
          <p className="text-sm">
            Showing {filteredSchools.length ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + usersPerPage, filteredSchools.length)} of{" "}
            {filteredSchools.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Add School Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">Add School</h3>
              <form onSubmit={handleAddSchool} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;
