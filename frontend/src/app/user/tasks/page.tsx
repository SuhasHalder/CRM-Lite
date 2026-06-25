"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import type { Task } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";

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
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
            <p className="text-sm text-gray-500 mt-1">
              {pending} open · {done} completed
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            + Add Task
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading tasks...</div>
        ) : (
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 text-sm">No tasks yet.</p>
                <p className="text-gray-400 text-xs mt-1">Create a task to stay organized and never miss a deadline.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 ${
                    task.isDone ? "border-l-green-500 opacity-75" : "border-l-blue-600"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`font-medium text-gray-800 ${task.isDone ? "line-through text-gray-400" : ""}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                      {task.dueDate && (
                        <p className="text-xs text-gray-400 mt-2">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleComplete(task._id)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        task.isDone
                          ? "bg-green-100 text-green-800 cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={task.isDone}
                    >
                      {task.isDone ? "Done" : "Complete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
