import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { AdminTaskController } from "../controllers/task.controller";

const router = Router();

router.use(verifyAuth);
router.get("/", AdminTaskController.getAllTasks);
router.put("/:id", AdminTaskController.updateTask);

export default router;
