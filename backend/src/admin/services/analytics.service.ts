import { Lead, Task, User } from "../../models/index";

export const AdminAnalyticsService = {
  getOverviewStats: async () => {
    const totalLeads = await Lead.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ isDone: true });
    const totalUsers = await User.countDocuments();
    const wonDeals = await Lead.countDocuments({ status: "won" });

    return {
      totalLeads,
      totalTasks,
      completedTasks,
      taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalUsers,
      wonDeals
    };
  },

  getConversionMetrics: async () => {
    const newLeads = await Lead.countDocuments({ status: "new" });
    const contactedLeads = await Lead.countDocuments({ status: "contacted" });
    const qualifiedLeads = await Lead.countDocuments({ status: "qualified" });
    const wonLeads = await Lead.countDocuments({ status: "won" });
    const totalLeads = await Lead.countDocuments();

    return {
      newLeads,
      contactedLeads,
      qualifiedLeads,
      wonLeads,
      conversionRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0
    };
  },

  getPipelineHealth: async () => {
    const stageDistribution = await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
          totalValue: { $sum: "$value" }
        }
      }
    ]);

    return stageDistribution;
  }
};
