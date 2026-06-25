"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { Lead } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";

const STAGES = ["new", "contacted", "qualified", "proposal", "won"] as const;

const stageColors: Record<string, string> = {
  new: "border-t-blue-500",
  contacted: "border-t-violet-500",
  qualified: "border-t-amber-500",
  proposal: "border-t-teal-500",
  won: "border-t-green-500",
};

export default function UserPipelinePage() {
  const [leads, setLeads] = useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPipeline();
  }, []);

  const fetchPipeline = async () => {
    try {
      const data: Record<string, Lead[]> = {};

      for (const stage of STAGES) {
        const response = await apiClient.get("/user/pipelines/stage/leads", {
          params: { stage },
        });
        data[stage] = response.data.data || [];
      }

      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = STAGES.reduce(
    (sum, stage) => sum + (leads[stage] || []).reduce((s, l) => s + l.value, 0),
    0
  );

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Pipeline</h1>
            <p className="text-sm text-gray-500 mt-1">
              Visualize deal progress from first contact to close.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Total pipeline value</p>
            <p className="text-xl font-semibold text-blue-600">${totalValue.toLocaleString()}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading pipeline...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => (
              <div
                key={stage}
                className={`bg-gray-50 rounded-xl border border-gray-100 border-t-4 ${stageColors[stage]} p-4 min-w-56`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-gray-800 capitalize text-sm">{stage}</h2>
                  <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-500 border border-gray-200">
                    {(leads[stage] || []).length}
                  </span>
                </div>
                <div className="space-y-2">
                  {(leads[stage] || []).length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No deals</p>
                  ) : (
                    (leads[stage] || []).map((lead) => (
                      <div
                        key={lead._id}
                        className="bg-white p-3 rounded-lg border border-gray-100 hover:shadow-sm transition cursor-pointer"
                      >
                        <h3 className="font-medium text-sm text-gray-800">{lead.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{lead.company}</p>
                        <p className="text-sm font-semibold text-blue-600 mt-2">
                          ${lead.value.toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
