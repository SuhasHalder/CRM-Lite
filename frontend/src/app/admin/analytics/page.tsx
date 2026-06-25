"use client";

import AdminLayout from "@/components/admin/AdminLayout";

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Sales Analytics
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor sales performance, revenue growth, and team productivity.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition">
            Download Report
          </button>
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">
              Total Revenue
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-3">
              ₹12.5L
            </p>

            <p className="text-green-600 text-sm mt-2">
              ↑ 18% growth
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">
              Conversion Rate
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              68%
            </p>

            <p className="text-blue-600 text-sm mt-2">
              ↑ 6% improvement
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">
              Active Leads
            </h3>

            <p className="text-4xl font-bold text-indigo-600 mt-3">
              245
            </p>

            <p className="text-indigo-600 text-sm mt-2">
              35 new this week
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-sm text-gray-500">
              Team Productivity
            </h3>

            <p className="text-4xl font-bold text-orange-500 mt-3">
              92%
            </p>

            <p className="text-orange-500 text-sm mt-2">
              Excellent performance
            </p>
          </div>
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Revenue Overview
              </h2>

              <select className="border border-gray-300 rounded-lg px-3 py-2 outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>

            {/* Fake Chart */}
            <div className="h-80 flex items-end gap-4">
              {[
                40,
                65,
                55,
                80,
                70,
                95,
              ].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full bg-blue-500 rounded-t-xl transition-all"
                  />

                  <p className="text-sm text-gray-500 mt-3">
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                      ][index]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Team Performance
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Amit</p>
                  <p className="font-semibold">85%</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Sneha</p>
                  <p className="font-semibold">92%</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Rahul</p>
                  <p className="font-semibold">74%</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full w-[74%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">Rohit</p>
                  <p className="font-semibold">67%</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full w-[67%]" />
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-10 bg-blue-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-blue-700">
                Performance Insights
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-6">
                Your sales team achieved higher conversion rates this
                month with improved customer engagement and faster
                response times.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Sources */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Lead Sources
            </h2>

            <div className="space-y-5">
              {[
                {
                  source: "Website",
                  leads: 120,
                },
                {
                  source: "LinkedIn",
                  leads: 75,
                },
                {
                  source: "Referrals",
                  leads: 45,
                },
                {
                  source: "Email Campaign",
                  leads: 30,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium text-gray-700">
                      {item.source}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.leads} Leads
                    </p>
                  </div>

                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm transition">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recent Activities
            </h2>

            <div className="space-y-5">
              {[
                "Raj Sharma moved to Qualified stage",
                "Sneha closed a ₹2L deal",
                "New lead added from LinkedIn",
                "Rahul completed 5 follow-ups",
                "Proposal sent to PixelSoft",
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
      </div>
    </AdminLayout>
  );
}