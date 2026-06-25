import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { AdminLeadController } from "../controllers/lead.controller";

const router = Router();

router.use(verifyAuth);
router.get("/", AdminLeadController.getAllLeads);
router.get("/:id", AdminLeadController.getLeadById);
router.put("/:id", AdminLeadController.updateLead);
router.delete("/:id", AdminLeadController.deleteLead);

export default router;
