import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { UserTaskController } from "../controllers/task.controller";

const router = Router();

router.use(verifyAuth);
router.post("/", UserTaskController.createTask);
router.get("/", UserTaskController.getMyTasks);
router.get("/:id", UserTaskController.getTaskById);
router.put("/:id", UserTaskController.updateTask);
router.patch("/:id/complete", UserTaskController.completeTask);
router.delete("/:id", UserTaskController.deleteTask);

export default router;
