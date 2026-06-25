import { signToken } from "../../config/jwt";
import { User } from "../../models/user.model";
import { ApiError } from "../../utils/apiError";

export const AuthService = {
  register: async (payload: { name: string; email: string; password: string }) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }

    const isFirstUser = (await User.countDocuments()) === 0;
    const user = await User.create({
      ...payload,
      role: isFirstUser ? "admin" : "user"
    });
    const token = signToken({ id: user._id, role: user.role });

    return { token, user };
  },

  login: async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = signToken({ id: user._id, role: user.role });
    return { token, user };
  }
};
