import { Lead } from "../../models/lead.model";

export const AdminLeadService = {
  getAllLeads: async () => {
    return Lead.find().populate("owner", "name email").sort({ createdAt: -1 });
  },

  getLeadById: async (leadId: string) => {
    return Lead.findById(leadId).populate("owner", "name email");
  },

  updateLead: async (leadId: string, payload: any) => {
    return Lead.findByIdAndUpdate(leadId, payload, { new: true }).populate("owner", "name email");
  },

  deleteLead: async (leadId: string) => {
    return Lead.findByIdAndDelete(leadId);
  }
};
