import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminAnalyticsService } from "../services/analytics.service";

const getOverview = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminAnalyticsService.getOverviewStats();
  sendResponse({ res, message: "Overview stats fetched", data });
});

const getConversion = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminAnalyticsService.getConversionMetrics();
  sendResponse({ res, message: "Conversion metrics fetched", data });
});

const getPipelineHealth = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminAnalyticsService.getPipelineHealth();
  sendResponse({ res, message: "Pipeline health fetched", data });
});

export const AdminAnalyticsController = {
  getOverview,
  getConversion,
  getPipelineHealth
};
