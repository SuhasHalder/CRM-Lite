import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { AdminAnalyticsController } from "../controllers/analytics.controller";

const router = Router();

router.use(verifyAuth);
router.get("/overview", AdminAnalyticsController.getOverview);
router.get("/conversion", AdminAnalyticsController.getConversion);
router.get("/pipeline-health", AdminAnalyticsController.getPipelineHealth);

export default router;
