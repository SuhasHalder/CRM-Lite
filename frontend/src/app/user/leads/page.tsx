"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import type { Lead } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";

export default function UserLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await apiClient.get("/user/leads");
      setLeads(response.data.data || []);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to fetch leads"));
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-violet-100 text-violet-800",
    qualified: "bg-amber-100 text-amber-800",
    proposal: "bg-teal-100 text-teal-800",
    won: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Leads</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track every prospect in your pipeline.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            + Add Lead
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading leads...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-gray-500 text-sm">No leads yet.</p>
                      <p className="text-gray-400 text-xs mt-1">Add your first lead to start building your pipeline.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{lead.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.company}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">${lead.value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs capitalize ${statusColors[lead.status] || "bg-gray-100 text-gray-800"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">Edit · Delete</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
