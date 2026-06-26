"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { Lead } from "@/lib/types";
import UserLayout from "@/components/user/UserLayout";
import PageHeader from "@/components/ui/PageHeader";
import LoadingState from "@/components/ui/LoadingState";

const STAGES = ["new", "contacted", "qualified", "proposal", "won"] as const;

const stageConfig: Record<string, { border: string; bg: string; dot: string }> = {
  new: { border: "border-t-blue-500", bg: "bg-blue-50/50", dot: "bg-blue-500" },
  contacted: { border: "border-t-violet-500", bg: "bg-violet-50/50", dot: "bg-violet-500" },
  qualified: { border: "border-t-amber-500", bg: "bg-amber-50/50", dot: "bg-amber-500" },
  proposal: { border: "border-t-teal-500", bg: "bg-teal-50/50", dot: "bg-teal-500" },
  won: { border: "border-t-emerald-500", bg: "bg-emerald-50/50", dot: "bg-emerald-500" },
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
        const response = await apiClient.get("/user/pipelines/stage/leads", { params: { stage } });
        data[stage] = response.data.data || [];
      }
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = STAGES.reduce(
    (sum, stage) => sum + (leads[stage] || []).reduce((s, l) => s + l.value, 0),
    0,
  );

  return (
    <UserLayout>
      <div className="space-y-6">
        <PageHeader
          title="Pipeline"
          description="Visualize deal progress from first contact to close."
          action={
            <div className="bg-white rounded-2xl border border-slate-100 px-5 py-3 shadow-sm text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Total value</p>
              <p className="text-xl font-bold gradient-text">${totalValue.toLocaleString()}</p>
            </div>
          }
        />

        {loading ? (
          <LoadingState message="Loading pipeline..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const cfg = stageConfig[stage];
              return (
                <div
                  key={stage}
                  className={`${cfg.bg} rounded-2xl border border-slate-100 border-t-4 ${cfg.border} p-4 min-w-56 shadow-sm`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <h2 className="font-semibold text-slate-800 capitalize text-sm">{stage}</h2>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-0.5 rounded-full text-slate-500 border border-slate-100 font-medium">
                      {(leads[stage] || []).length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {(leads[stage] || []).length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6 bg-white/60 rounded-xl">No deals</p>
                    ) : (
                      (leads[stage] || []).map((lead) => (
                        <div
                          key={lead._id}
                          className="bg-white p-3.5 rounded-xl border border-slate-100 card-hover cursor-pointer"
                        >
                          <h3 className="font-semibold text-sm text-slate-800">{lead.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{lead.company}</p>
                          <p className="text-sm font-bold text-blue-600 mt-2">${lead.value.toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
