import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { UserPipelineController } from "../controllers/pipeline.controller";

const router = Router();

router.use(verifyAuth);
router.get("/", UserPipelineController.getPipelines);
router.get("/stage/leads", UserPipelineController.getLeadsByStage);
router.patch("/:leadId/stage", UserPipelineController.updateLeadStage);

export default router;
