import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { UserLeadController } from "../controllers/lead.controller";

const router = Router();

router.use(verifyAuth);
router.post("/", UserLeadController.createLead);
router.get("/", UserLeadController.getMyLeads);
router.get("/:id", UserLeadController.getLeadById);
router.put("/:id", UserLeadController.updateLead);
router.delete("/:id", UserLeadController.deleteLead);

export default router;
