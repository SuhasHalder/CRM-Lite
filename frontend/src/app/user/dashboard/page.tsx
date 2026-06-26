"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/api";
import { getStoredUser } from "@/lib/auth";
import type { Lead, Task, User } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import LoadingState from "@/components/ui/LoadingState";

export default function UserDashboardPage() {
  const [user] = useState<User | null>(() => getStoredUser());
  const [stats, setStats] = useState({
    myLeads: 0,
    tasks: 0,
    wonDeals: 0,
    followUps: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [leadsRes, tasksRes] = await Promise.all([
        apiClient.get("/user/leads"),
        apiClient.get("/user/tasks"),
      ]);

      const leads: Lead[] = leadsRes.data.data || [];
      const tasks: Task[] = tasksRes.data.data || [];

      setStats({
        myLeads: leads.length,
        tasks: tasks.filter((t) => !t.isDone).length,
        wonDeals: leads.filter((l) => l.status === "won").length,
        followUps: tasks.filter((t) => t.dueDate && !t.isDone).length,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Active Leads", value: stats.myLeads, hint: "Leads assigned to you", color: "text-blue-600", bg: "bg-blue-50", href: "/user/leads" },
    { label: "Open Tasks", value: stats.tasks, hint: "Tasks waiting for action", color: "text-amber-600", bg: "bg-amber-50", href: "/user/tasks" },
    { label: "Won Deals", value: stats.wonDeals, hint: "Closed successfully", color: "text-emerald-600", bg: "bg-emerald-50", href: "/user/pipeline" },
    { label: "Follow-ups Due", value: stats.followUps, hint: "Scheduled reminders", color: "text-violet-600", bg: "bg-violet-50", href: "/user/followups" },
  ];

  return (
    <UserLayout>
      <div className="space-y-8">
        <PageHeader
          title={user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Dashboard"}
          description="Here's a snapshot of your sales activity today."
          badge="Live overview"
        />

        {loading ? (
          <LoadingState message="Loading your stats..." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 card-hover shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>
                    <p className="text-xs text-slate-400">Jump into your most common workflows</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/user/leads" className="btn-primary px-4 py-2 text-sm">Add a lead</Link>
                  <Link href="/user/tasks" className="btn-secondary px-4 py-2 text-sm">Create task</Link>
                  <Link href="/user/pipeline" className="btn-secondary px-4 py-2 text-sm">View pipeline</Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">💡</span>
                    <h2 className="text-sm font-semibold">Sales tip of the day</h2>
                  </div>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Leads with a scheduled follow-up within 48 hours are 3× more likely to convert.
                    Check your{" "}
                    <Link href="/user/followups" className="text-white font-semibold underline underline-offset-2">
                      follow-ups
                    </Link>{" "}
                    to stay on top of every opportunity.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
}
