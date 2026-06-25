"use client";
import UserLayout from "@/components/user/UserLayout";
import { getStoredUser } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function UserProfilePage() {
  const user: User | null = getStoredUser();

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your account details and membership information.
          </p>
        </div>

        {user ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Full name</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Role</label>
                <p className="text-sm font-medium text-gray-800 mt-1 capitalize">{user.role}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Member since</label>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            Please sign in to view your profile.
          </div>
        )}
      </div>
    </UserLayout>
  );
}
