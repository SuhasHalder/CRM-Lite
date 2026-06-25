"use client";
import { useState } from "react";
import { getStoredUser, logout } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function UserNavbar() {
  const [user] = useState<User | null>(() => getStoredUser());

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Sales Dashboard</h1>
        <p className="text-xs text-gray-500">
          Track leads, tasks, and follow-ups in one place
        </p>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
