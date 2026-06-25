import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { AdminUserController } from "../controllers/user.controller";

const router = Router();

router.use(verifyAuth);
router.get("/", AdminUserController.getAllUsers);
router.get("/:id", AdminUserController.getUserById);
router.put("/:id", AdminUserController.updateUser);
router.delete("/:id", AdminUserController.deleteUser);

export default router;
