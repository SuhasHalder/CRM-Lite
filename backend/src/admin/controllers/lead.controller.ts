import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminLeadService } from "../services/lead.service";

const getAllLeads = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminLeadService.getAllLeads();
  sendResponse({ res, message: "Leads fetched", data });
});

const getLeadById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminLeadService.getLeadById(id);
  sendResponse({ res, message: "Lead fetched", data });
});

const updateLead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await AdminLeadService.updateLead(id, req.body);
  sendResponse({ res, message: "Lead updated", data });
});

const deleteLead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminLeadService.deleteLead(id);
  sendResponse({ res, message: "Lead deleted" });
});

export const AdminLeadController = {
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};
