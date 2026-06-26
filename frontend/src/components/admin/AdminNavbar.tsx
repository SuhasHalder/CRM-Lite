"use client";
import { useState } from "react";
import { getStoredUser, logout } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function AdminNavbar() {
  const [user] = useState<User | null>(() => getStoredUser());

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <header className="w-full glass border-b border-slate-200/60 px-6 py-3.5 flex justify-between items-center sticky top-0 z-40">
      <div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight">Admin Console</h1>
        <p className="text-xs text-slate-400">Manage team performance, leads, and pipeline health</p>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-3 hidden sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role} account</p>
            </div>
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {initials}
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition font-medium"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
