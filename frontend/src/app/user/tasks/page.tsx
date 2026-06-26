"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import type { Task } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get("/user/tasks");
      setTasks(response.data.data || []);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to fetch tasks"));
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (taskId: string) => {
    try {
      await apiClient.patch(`/user/tasks/${taskId}/complete`);
      fetchTasks();
    } catch {
      setError("Failed to complete task");
    }
  };

  const pending = tasks.filter((t) => !t.isDone).length;
  const done = tasks.filter((t) => t.isDone).length;

  return (
    <UserLayout>
      <div className="space-y-6">
        <PageHeader
          title="My Tasks"
          description={`${pending} open · ${done} completed`}
          badge={`${pending} pending`}
          action={<button className="btn-primary px-4 py-2 text-sm">+ Add Task</button>}
        />

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm">{error}</div>
        )}

        {loading ? (
          <LoadingState message="Loading tasks..." />
        ) : tasks.length === 0 ? (
          <EmptyState title="No tasks yet" description="Create a task to stay organized and never miss a deadline." />
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 card-hover ${
                  task.isDone ? "border-l-emerald-500 opacity-75" : "border-l-blue-600"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`font-semibold text-slate-800 ${task.isDone ? "line-through text-slate-400" : ""}`}>
                      {task.title}
                    </h3>
                    {task.description && <p className="text-sm text-slate-500 mt-1">{task.description}</p>}
                    {task.dueDate && (
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                          <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleComplete(task._id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      task.isDone
                        ? "bg-emerald-50 text-emerald-700 cursor-default"
                        : "btn-primary"
                    }`}
                    disabled={task.isDone}
                  >
                    {task.isDone ? "✓ Done" : "Complete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
