import { Lead } from "../../models/lead.model";

export const UserLeadService = {
  createLead: async (userId: string, payload: any) => {
    return Lead.create({ ...payload, owner: userId });
  },

  getMyLeads: async (userId: string) => {
    return Lead.find({ owner: userId }).sort({ createdAt: -1 });
  },

  getLeadById: async (leadId: string, userId: string) => {
    return Lead.findOne({ _id: leadId, owner: userId });
  },

  updateLead: async (leadId: string, userId: string, payload: any) => {
    return Lead.findOneAndUpdate(
      { _id: leadId, owner: userId },
      payload,
      { new: true }
    );
  },

  deleteLead: async (leadId: string, userId: string) => {
    return Lead.findOneAndDelete({ _id: leadId, owner: userId });
  }
};
