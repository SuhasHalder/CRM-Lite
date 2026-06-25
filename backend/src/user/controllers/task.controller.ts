import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserTaskService } from "../services/task.service";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await UserTaskService.createTask(userId, req.body);
  sendResponse({ res, statusCode: 201, message: "Task created", data });
});

const getMyTasks = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const data = await UserTaskService.getMyTasks(userId);
  sendResponse({ res, message: "Tasks fetched", data });
});

const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { id } = req.params;
  const data = await UserTaskService.getTaskById(id, userId);
  sendResponse({ res, message: "Task fetched", data });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { id } = req.params;
  const data = await UserTaskService.updateTask(id, userId, req.body);
  sendResponse({ res, message: "Task updated", data });
});

const completeTask = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { id } = req.params;
  const data = await UserTaskService.completeTask(id, userId);
  sendResponse({ res, message: "Task completed", data });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { id } = req.params;
  await UserTaskService.deleteTask(id, userId);
  sendResponse({ res, message: "Task deleted" });
});

export const UserTaskController = {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  completeTask,
  deleteTask
};
