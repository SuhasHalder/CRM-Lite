import { Pipeline, Lead } from "../../models/index";

export const UserPipelineService = {
  getPipelines: async () => {
    return Pipeline.find();
  },

  getLeadsByStage: async (userId: string, stage: string) => {
    return Lead.find({ owner: userId, stage }).sort({ createdAt: -1 });
  },

  updateLeadStage: async (leadId: string, userId: string, stage: string) => {
    return Lead.findOneAndUpdate(
      { _id: leadId, owner: userId },
      { stage },
      { new: true }
    );
  }
};
