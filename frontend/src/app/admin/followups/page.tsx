"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const followUpsData = [
  {
    id: 1,
    client: "Raj Sharma",
    company: "TechNova",
    type: "Call",
    status: "Pending",
    date: "Today, 5:00 PM",
  },

  {
    id: 2,
    client: "Priya Singh",
    company: "PixelSoft",
    type: "Email",
    status: "Completed",
    date: "Yesterday, 3:30 PM",
  },

  {
    id: 3,
    client: "Arjun Patel",
    company: "CloudEdge",
    type: "Meeting",
    status: "Upcoming",
    date: "Tomorrow, 11:00 AM",
  },

  {
    id: 4,
    client: "Sneha Roy",
    company: "NextGen Pvt Ltd",
    type: "Demo",
    status: "Pending",
    date: "Friday, 2:00 PM",
  },
];

export default function FollowUpsPage() {
  const [search, setSearch] = useState("");

  const filteredFollowUps = followUpsData.filter(
    (item) =>
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Follow-ups Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer communication and track follow-up activities.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition">
            + Schedule Follow-up
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">Total Follow-ups</h3>
            <p className="text-4xl font-bold text-blue-600 mt-3">84</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">Pending</h3>
            <p className="text-4xl font-bold text-yellow-500 mt-3">22</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">Upcoming</h3>
            <p className="text-4xl font-bold text-indigo-600 mt-3">14</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">Completed</h3>
            <p className="text-4xl font-bold text-green-600 mt-3">48</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search follow-ups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>Upcoming</option>
                <option>Completed</option>
              </select>

              <button className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Follow-ups Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr className="text-gray-600 text-sm">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredFollowUps.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {item.client}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {item.company}
                    </td>

                    <td className="px-6 py-5">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {item.date}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition">
                          Edit
                        </button>

                        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFollowUps.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No follow-ups found.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Communication Insights
              </h2>

              <p className="text-gray-500 mt-2">
                Your sales team completed 48 follow-ups this month with
                improved client response rates.
              </p>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
              View Insights
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}