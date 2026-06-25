import { Task } from "../../models/task.model";

export const UserTaskService = {
  createTask: async (userId: string, payload: any) => {
    return Task.create({ ...payload, assignedTo: userId });
  },

  getMyTasks: async (userId: string) => {
    return Task.find({ assignedTo: userId }).populate("lead").sort({ dueDate: 1 });
  },

  getTaskById: async (taskId: string, userId: string) => {
    return Task.findOne({ _id: taskId, assignedTo: userId }).populate("lead");
  },

  updateTask: async (taskId: string, userId: string, payload: any) => {
    return Task.findOneAndUpdate(
      { _id: taskId, assignedTo: userId },
      payload,
      { new: true }
    ).populate("lead");
  },

  completeTask: async (taskId: string, userId: string) => {
    return Task.findOneAndUpdate(
      { _id: taskId, assignedTo: userId },
      { isDone: true },
      { new: true }
    );
  },

  deleteTask: async (taskId: string, userId: string) => {
    return Task.findOneAndDelete({ _id: taskId, assignedTo: userId });
  }
};
