"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/lib/api";
import { getStoredUser } from "@/lib/auth";
import type { Lead, Task, User } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";

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
    {
      label: "Active Leads",
      value: stats.myLeads,
      hint: "Leads assigned to you",
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/user/leads",
    },
    {
      label: "Open Tasks",
      value: stats.tasks,
      hint: "Tasks waiting for action",
      color: "text-amber-600",
      bg: "bg-amber-50",
      href: "/user/tasks",
    },
    {
      label: "Won Deals",
      value: stats.wonDeals,
      hint: "Closed successfully",
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/user/pipeline",
    },
    {
      label: "Follow-ups Due",
      value: stats.followUps,
      hint: "Scheduled reminders",
      color: "text-purple-600",
      bg: "bg-purple-50",
      href: "/user/followups",
    },
  ];

  return (
    <UserLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here&apos;s a snapshot of your sales activity today.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading your stats...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group"
                >
                  <div className={`w-10 h-10 rounded-lg ${card.bg} ${card.color} flex items-center justify-center text-lg font-bold mb-3`}>
                    {card.value}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{card.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{card.hint}</p>
                  <p className="text-xs text-blue-600 mt-3 opacity-0 group-hover:opacity-100 transition">
                    View details →
                  </p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Quick actions</h2>
                <p className="text-xs text-gray-500 mb-4">
                  Jump straight into your most common workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/user/leads" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    Add a lead
                  </Link>
                  <Link href="/user/tasks" className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition">
                    Create task
                  </Link>
                  <Link href="/user/pipeline" className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition">
                    View pipeline
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Sales tip</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Leads with a scheduled follow-up within 48 hours are 3× more likely to convert.
                  Check your{" "}
                  <Link href="/user/followups" className="text-blue-600 hover:underline">
                    follow-ups
                  </Link>{" "}
                  to stay on top of every opportunity.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
}
