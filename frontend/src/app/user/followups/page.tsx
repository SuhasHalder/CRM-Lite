"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { Task } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function UserFollowupsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowups();
  }, []);

  const fetchFollowups = async () => {
    try {
      const response = await apiClient.get("/user/tasks");
      const followups = ((response.data.data as Task[]) || []).filter((task) => task.dueDate);
      followups.sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
      setTasks(followups);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();
  const overdueCount = tasks.filter((t) => !t.isDone && t.dueDate && isOverdue(t.dueDate)).length;

  return (
    <UserLayout>
      <div className="space-y-6">
        <PageHeader
          title="Follow-ups"
          description="Stay on top of scheduled calls, emails, and meetings with your leads."
          badge={overdueCount > 0 ? `${overdueCount} overdue` : undefined}
        />

        {loading ? (
          <LoadingState message="Loading follow-ups..." />
        ) : tasks.length === 0 ? (
          <EmptyState title="No follow-ups scheduled" description="Add due dates to your tasks to see them here." />
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const overdue = !task.isDone && task.dueDate && isOverdue(task.dueDate);
              return (
                <div
                  key={task._id}
                  className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 card-hover ${
                    overdue ? "border-l-red-500" : task.isDone ? "border-l-emerald-500" : "border-l-violet-600"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{task.title}</h3>
                      {task.description && <p className="text-sm text-slate-500 mt-1">{task.description}</p>}
                      {task.dueDate && (
                        <p className={`text-sm font-medium mt-2 flex items-center gap-1.5 ${overdue ? "text-red-600" : "text-slate-600"}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                          {overdue ? "Overdue: " : "Due: "}
                          {new Date(task.dueDate).toLocaleDateString()} at{" "}
                          {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      )}
                    </div>
                    <span
                      className={`badge ${
                        task.isDone
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : overdue
                            ? "bg-red-50 text-red-700 border border-red-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}
                    >
                      {task.isDone ? "Done" : overdue ? "Overdue" : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
