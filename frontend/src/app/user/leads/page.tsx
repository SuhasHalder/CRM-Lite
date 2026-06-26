"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import type { Lead } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  contacted: "bg-violet-50 text-violet-700 border-violet-100",
  qualified: "bg-amber-50 text-amber-700 border-amber-100",
  proposal: "bg-teal-50 text-teal-700 border-teal-100",
  won: "bg-emerald-50 text-emerald-700 border-emerald-100",
  lost: "bg-red-50 text-red-700 border-red-100",
};

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

  return (
    <UserLayout>
      <div className="space-y-6">
        <PageHeader
          title="My Leads"
          description="Manage and track every prospect in your pipeline."
          action={<button className="btn-primary px-4 py-2 text-sm">+ Add Lead</button>}
        />

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm">{error}</div>
        )}

        {loading ? (
          <LoadingState message="Loading leads..." />
        ) : leads.length === 0 ? (
          <EmptyState title="No leads yet" description="Add your first lead to start building your pipeline." />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    {["Title", "Company", "Value", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="table-row-hover transition">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">{lead.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{lead.company}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">${lead.value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`badge border capitalize ${statusColors[lead.status] || "bg-slate-50 text-slate-700 border-slate-100"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-700 font-medium mr-3 transition">Edit</button>
                        <button className="text-red-500 hover:text-red-600 font-medium transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
