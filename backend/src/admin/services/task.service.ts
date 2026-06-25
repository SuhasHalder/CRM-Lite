import { Task } from "../../models/task.model";

export const AdminTaskService = {
  getAllTasks: async () => {
    return Task.find().populate("assignedTo", "name email").populate("lead").sort({ dueDate: 1 });
  },

  updateTask: async (taskId: string, payload: any) => {
    return Task.findByIdAndUpdate(taskId, payload, { new: true }).populate("assignedTo").populate("lead");
  }
};
