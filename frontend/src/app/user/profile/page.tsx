"use client";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import { getStoredUser } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function UserProfilePage() {
  const user: User | null = getStoredUser();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <UserLayout>
      <div className="space-y-6">
        <PageHeader title="My Profile" description="Your account details and membership information." />

        {user ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-2xl">
            <div className="gradient-brand px-8 py-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              <div className="relative flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border border-white/30 shadow-lg">
                  {initials}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-blue-100 text-sm mt-0.5">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-0.5 bg-white/20 text-white text-xs rounded-full capitalize border border-white/20 font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Full name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Role", value: user.role, capitalize: true },
                {
                  label: "Member since",
                  value: user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : "—",
                },
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
        ) : (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
            Please sign in to view your profile.
          </div>
        )}
      </div>
    </UserLayout>
  );
}
