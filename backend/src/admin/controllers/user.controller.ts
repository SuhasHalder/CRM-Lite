import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminUserService } from "../services/user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminUserService.getAllUsers();
  sendResponse({ res, message: "Users fetched", data });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminUserService.getUserById(id);
  sendResponse({ res, message: "User fetched", data });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminUserService.updateUser(id, req.body);
  sendResponse({ res, message: "User updated", data });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminUserService.deleteUser(id);
  sendResponse({ res, message: "User deleted" });
});

export const AdminUserController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
