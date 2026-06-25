"use client";

import AdminLayout from "@/components/admin/AdminLayout";

export default function ProfilePage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account settings and personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-600">
              A
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                Admin User
              </h2>

              <p className="text-gray-500 mt-2">
                admin@salescrm.com
              </p>

              <div className="flex flex-wrap gap-3 mt-5">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  Administrator
                </span>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>

            {/* Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-500">
                  Full Name
                </label>

                <input
                  type="text"
                  value="Admin User"
                  readOnly
                  className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Email Address
                </label>

                <input
                  type="email"
                  value="admin@salescrm.com"
                  readOnly
                  className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Phone Number
                </label>

                <input
                  type="text"
                  value="+91 9876543210"
                  readOnly
                  className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Security Settings
            </h2>

            <div className="space-y-5">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition">
                Change Password
              </button>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition">
                Enable Two-Factor Authentication
              </button>

              <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl transition">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">
            {[
              "Logged into the dashboard",
              "Added a new lead",
              "Updated pipeline status",
              "Generated analytics report",
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-4"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2" />

                <div>
                  <p className="text-gray-700 font-medium">
                    {activity}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Just now
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}