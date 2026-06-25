import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./user/routes/auth.route";
import userLeadRoutes from "./user/routes/lead.route";
import taskRoutes from "./user/routes/task.route";
import pipelineRoutes from "./user/routes/pipeline.route";
import adminUserRoutes from "./admin/routes/user.route";
import adminLeadRoutes from "./admin/routes/lead.route";
import adminAnalyticsRoutes from "./admin/routes/analytics.route";
import adminTaskRoutes from "./admin/routes/task.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Sales CRM backend is running" });
});

app.use("/api/v1/user/auth", authRoutes);
app.use("/api/v1/user/leads", userLeadRoutes);
app.use("/api/v1/user/tasks", taskRoutes);
app.use("/api/v1/user/pipelines", pipelineRoutes);

app.use("/api/v1/admin/users", adminUserRoutes);
app.use("/api/v1/admin/leads", adminLeadRoutes);
app.use("/api/v1/admin/analytics", adminAnalyticsRoutes);
app.use("/api/v1/admin/tasks", adminTaskRoutes);

app.use(errorMiddleware);

export default app;
