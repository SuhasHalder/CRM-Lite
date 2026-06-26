"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { User } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/ui/PageHeader";
import LoadingState from "@/components/ui/LoadingState";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/admin/users");
      setUsers(response.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Team Members"
          description={`${users.length} member${users.length !== 1 ? "s" : ""} · Manage roles and access`}
          badge="Team management"
          action={<button className="btn-primary px-4 py-2 text-sm">+ Invite Member</button>}
        />

        {loading ? (
          <LoadingState message="Loading team..." />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    {["Name", "Email", "Role", "Joined", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user._id} className="table-row-hover transition">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`badge border capitalize ${
                          user.role === "admin"
                            ? "bg-violet-50 text-violet-700 border-violet-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-700 font-medium mr-3 transition">Edit</button>
                        <button className="text-red-500 hover:text-red-600 font-medium transition">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
