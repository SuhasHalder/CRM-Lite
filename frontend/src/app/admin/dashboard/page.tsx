"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/api";
import type { AnalyticsOverview } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import LoadingState from "@/components/ui/LoadingState";

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
        { label: "Team Size", value: stats.totalUsers, hint: "Active users", color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Won Deals", value: stats.wonDeals, hint: "Successfully closed", color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Open Tasks", value: stats.totalTasks - stats.completedTasks, hint: "Pending completion", color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Completed Tasks", value: stats.completedTasks, hint: "Marked as done", color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Task Completion", value: `${stats.taskCompletionRate}%`, hint: "Team productivity rate", color: "text-indigo-600", bg: "bg-indigo-50", trend: { value: `${stats.taskCompletionRate}%`, positive: stats.taskCompletionRate >= 50 } },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title="Team Overview"
          description="Monitor pipeline health, team activity, and conversion metrics at a glance."
          badge="Admin dashboard"
        />

        {loading ? (
          <LoadingState message="Loading team analytics..." />
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 card-hover shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M9 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Admin quick links</h2>
                  <p className="text-xs text-slate-400">Common management tasks for your sales team</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/admin/leads" className="btn-primary px-4 py-2 text-sm">Manage leads</Link>
                <Link href="/admin/users" className="btn-secondary px-4 py-2 text-sm">View team</Link>
                <Link href="/admin/analytics" className="btn-secondary px-4 py-2 text-sm">Full analytics</Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
            No analytics data available yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
