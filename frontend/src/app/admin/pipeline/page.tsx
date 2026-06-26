"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/ui/PageHeader";

const pipelineData = {
  New: [
    {
      id: 1,
      name: "Raj Sharma",
      company: "TechNova",
      value: "₹50,000",
    },
    {
      id: 2,
      name: "Sneha Roy",
      company: "NextGen Pvt Ltd",
      value: "₹80,000",
    },
  ],

  Contacted: [
    {
      id: 3,
      name: "Priya Singh",
      company: "PixelSoft",
      value: "₹1,20,000",
    },
  ],

  Qualified: [
    {
      id: 4,
      name: "Arjun Patel",
      company: "CloudEdge",
      value: "₹2,00,000",
    },
    {
      id: 5,
      name: "Rohit Das",
      company: "InnovaTech",
      value: "₹75,000",
    },
  ],

  Won: [
    {
      id: 6,
      name: "Amit Kumar",
      company: "Skyline Corp",
      value: "₹3,50,000",
    },
  ],

  Lost: [
    {
      id: 7,
      name: "Karan Mehta",
      company: "FutureSoft",
      value: "₹40,000",
    },
  ],
};

export default function PipelinePage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title="Sales Pipeline"
          description="Track lead progress through every stage of the sales cycle."
          badge="Kanban view"
          action={<button className="btn-primary px-5 py-2.5 text-sm">+ Add Opportunity</button>}
        />

        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-5">
            <h3 className="text-sm text-gray-500">New Leads</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-5">
            <h3 className="text-sm text-gray-500">Contacted</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">8</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-5">
            <h3 className="text-sm text-gray-500">Qualified</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">15</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-5">
            <h3 className="text-sm text-gray-500">Won Deals</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">6</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-5">
            <h3 className="text-sm text-gray-500">Lost Deals</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">3</p>
          </div>
        </div>

        {/* Pipeline Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-[1400px]">
            {Object.entries(pipelineData).map(([stage, leads]) => (
              <div
                key={stage}
                className="bg-gray-100 rounded-2xl p-4 w-[300px] flex-shrink-0"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-800">
                    {stage}
                  </h2>

                  <span className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full shadow">
                    {leads.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {lead.name}
                          </h3>

                          <p className="text-gray-500 text-sm mt-1">
                            {lead.company}
                          </p>
                        </div>

                        <div
                          className={`w-3 h-3 rounded-full mt-2
                          ${
                            stage === "Won"
                              ? "bg-green-500"
                              : stage === "Qualified"
                              ? "bg-blue-500"
                              : stage === "Contacted"
                              ? "bg-yellow-500"
                              : stage === "Lost"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Deal Value
                        </p>

                        <p className="font-bold text-gray-800">
                          {lead.value}
                        </p>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg text-sm transition">
                          View
                        </button>

                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm transition">
                          Move
                        </button>
                      </div>
                    </div>
                  ))}

                  {leads.length === 0 && (
                    <div className="bg-white rounded-2xl p-5 text-center text-gray-400 shadow-sm">
                      No leads available
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Monthly Sales Overview
              </h2>

              <p className="text-gray-500 mt-2">
                Your team closed 6 deals this month with a total revenue
                of ₹8,15,000.
              </p>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}