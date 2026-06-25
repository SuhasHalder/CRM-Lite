import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminTaskService } from "../services/task.service";

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminTaskService.getAllTasks();
  sendResponse({ res, message: "Tasks fetched", data });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminTaskService.updateTask(id, req.body);
  sendResponse({ res, message: "Task updated", data });
});

export const AdminTaskController = {
  getAllTasks,
  updateTask
};
