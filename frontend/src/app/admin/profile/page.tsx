"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/ui/PageHeader";
import { getStoredUser } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function ProfilePage() {
  const user: User | null = getStoredUser();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Admin Profile"
          description="Manage your account settings and personal information."
        />

        {user ? (
          <>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-3xl">
              <div className="gradient-brand px-8 py-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border border-white/30 shadow-lg">
                      {initials}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{user.name}</h2>
                      <p className="text-blue-100 text-sm mt-0.5">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-3 py-0.5 bg-white/20 text-white text-xs rounded-full capitalize border border-white/20 font-medium">
                          {user.role}
                        </span>
                        <span className="px-3 py-0.5 bg-emerald-400/30 text-emerald-100 text-xs rounded-full border border-emerald-300/30 font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50 transition shadow-lg">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email Address", value: user.email },
                  { label: "Role", value: user.role, capitalize: true },
                  { label: "Account Status", value: "Active" },
                ].map((field) => (
                  <div key={field.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{field.label}</label>
                    <p className={`text-sm font-semibold text-slate-800 mt-1.5 ${field.capitalize ? "capitalize" : ""}`}>
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-3xl">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover">
                <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">🔒</span>
                  Security Settings
                </h2>
                <div className="space-y-3">
                  <button className="w-full btn-secondary px-4 py-2.5 text-sm text-left">Change Password</button>
                  <button className="w-full btn-secondary px-4 py-2.5 text-sm text-left">Two-Factor Authentication</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover">
                <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-sm">⚙️</span>
                  Preferences
                </h2>
                <div className="space-y-3">
                  <button className="w-full btn-secondary px-4 py-2.5 text-sm text-left">Notification Settings</button>
                  <button className="w-full btn-secondary px-4 py-2.5 text-sm text-left">Email Preferences</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
            Please sign in to view your profile.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
