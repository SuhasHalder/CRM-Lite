import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserPipelineService } from "../services/pipeline.service";

const getPipelines = catchAsync(async (req: Request, res: Response) => {
  const data = await UserPipelineService.getPipelines();
  sendResponse({ res, message: "Pipelines fetched", data });
});

const getLeadsByStage = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { stage } = req.query;
  const data = await UserPipelineService.getLeadsByStage(userId, String(stage));
  sendResponse({ res, message: "Leads fetched", data });
});

const updateLeadStage = catchAsync(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const { leadId } = req.params;
  const { stage } = req.body;
  const data = await UserPipelineService.updateLeadStage(leadId, userId, stage);
  sendResponse({ res, message: "Lead stage updated", data });
});

export const UserPipelineController = {
  getPipelines,
  getLeadsByStage,
  updateLeadStage
};
