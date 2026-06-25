import { User } from "../../models/user.model";
import bcryptjs from "bcryptjs";

export const AdminUserService = {
  getAllUsers: async () => {
    return User.find().select("-password").sort({ createdAt: -1 });
  },

  getUserById: async (userId: string) => {
    return User.findById(userId).select("-password");
  },

  updateUser: async (userId: string, payload: any) => {
    if (payload.password) {
      payload.password = await bcryptjs.hash(payload.password, 10);
    }
    return User.findByIdAndUpdate(userId, payload, { new: true }).select("-password");
  },

  deleteUser: async (userId: string) => {
    return User.findByIdAndDelete(userId);
  }
};
