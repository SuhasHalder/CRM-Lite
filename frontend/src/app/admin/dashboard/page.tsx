"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { AnalyticsOverview } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiClient.get("/admin/analytics/overview");
      setStats(response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        { label: "Total Leads", value: stats.totalLeads, hint: "Across all team members", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Team Size", value: stats.totalUsers, hint: "Active users", color: "text-green-600", bg: "bg-green-50" },
        { label: "Won Deals", value: stats.wonDeals, hint: "Successfully closed", color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Open Tasks", value: stats.totalTasks - stats.completedTasks, hint: "Pending completion", color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Completed Tasks", value: stats.completedTasks, hint: "Marked as done", color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Task Completion", value: `${stats.taskCompletionRate}%`, hint: "Team productivity rate", color: "text-indigo-600", bg: "bg-indigo-50" },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor pipeline health, team activity, and conversion metrics at a glance.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading team analytics...</div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-lg ${card.bg} ${card.color} flex items-center justify-center text-sm font-bold mb-3`}>
                    {typeof card.value === "number" && card.value > 99 ? "99+" : card.value}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{card.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{card.hint}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Admin quick links</h2>
              <p className="text-xs text-gray-500 mb-4">
                Common management tasks for your sales team.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="/admin/leads" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                  Manage leads
                </a>
                <a href="/admin/users" className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition">
                  View team
                </a>
                <a href="/admin/analytics" className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition">
                  Full analytics
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">No analytics data available yet.</div>
        )}
      </div>
    </AdminLayout>
  );
}
