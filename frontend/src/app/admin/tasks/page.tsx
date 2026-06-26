"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/ui/PageHeader";

const tasksData = [
  {
    id: 1,
    title: "Call Raj Sharma",
    assignedTo: "Amit",
    priority: "High",
    status: "Pending",
    dueDate: "Today, 5:00 PM",
  },

  {
    id: 2,
    title: "Send Proposal to PixelSoft",
    assignedTo: "Sneha",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Tomorrow, 11:00 AM",
  },

  {
    id: 3,
    title: "Demo Meeting with CloudEdge",
    assignedTo: "Rahul",
    priority: "High",
    status: "Completed",
    dueDate: "Friday, 2:30 PM",
  },

  {
    id: 4,
    title: "Follow-up with Skyline Corp",
    assignedTo: "Rohit",
    priority: "Low",
    status: "Pending",
    dueDate: "Saturday, 1:00 PM",
  },
];

export default function TasksPage() {
  const [search, setSearch] = useState("");

  const filteredTasks = tasksData.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title="Tasks Management"
          description="Organize follow-ups, meetings, and daily sales activities."
          badge="Team tasks"
          action={<button className="btn-primary px-5 py-2.5 text-sm">+ Create Task</button>}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
            <h3 className="text-sm text-gray-500">Total Tasks</h3>
            <p className="text-4xl font-bold text-blue-600 mt-3">48</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
            <h3 className="text-sm text-gray-500">Pending</h3>
            <p className="text-4xl font-bold text-yellow-500 mt-3">18</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
            <h3 className="text-sm text-gray-500">In Progress</h3>
            <p className="text-4xl font-bold text-indigo-600 mt-3">12</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
            <h3 className="text-sm text-gray-500">Completed</h3>
            <p className="text-4xl font-bold text-green-600 mt-3">18</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr className="text-gray-600 text-sm">
                  <th className="px-6 py-4">Task</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {task.title}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {task.assignedTo}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {task.dueDate}
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

            {filteredTasks.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No tasks found.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Productivity Overview
              </h2>

              <p className="text-gray-500 mt-2">
                Your team completed 18 tasks this week with a 92%
                productivity score.
              </p>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}