"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { Task } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";

export default function UserFollowupsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowups();
  }, []);

  const fetchFollowups = async () => {
    try {
      const response = await apiClient.get("/user/tasks");
      const followups = (response.data.data as Task[] || []).filter((task) => task.dueDate);
      followups.sort(
        (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
      );
      setTasks(followups);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Follow-ups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay on top of scheduled calls, emails, and meetings with your leads.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading follow-ups...</div>
        ) : (
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 text-sm">No follow-ups scheduled.</p>
                <p className="text-gray-400 text-xs mt-1">Add due dates to your tasks to see them here.</p>
              </div>
            ) : (
              tasks.map((task) => {
                const overdue = !task.isDone && task.dueDate && isOverdue(task.dueDate);
                return (
                  <div
                    key={task._id}
                    className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 ${
                      overdue ? "border-l-red-500" : task.isDone ? "border-l-green-500" : "border-l-purple-600"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        {task.dueDate && (
                          <p className={`text-sm font-medium mt-2 ${overdue ? "text-red-600" : "text-gray-700"}`}>
                            {overdue ? "Overdue: " : "Due: "}
                            {new Date(task.dueDate).toLocaleDateString()} at{" "}
                            {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.isDone
                            ? "bg-green-100 text-green-800"
                            : overdue
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {task.isDone ? "Done" : overdue ? "Overdue" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
