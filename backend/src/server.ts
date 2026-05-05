import express from "express";
import cors from "cors";
import path from "path";

import riskRoutes from "./routes/risk.routes";
import controlRoutes from "./routes/control.routes";
import complianceRoutes from "./routes/compliance.routes";
import uploadRoutes from "./routes/upload.routes";
import reportRoutes from "./routes/report.routes";
import authRoutes from "./routes/auth.routes";
import assignmentRoutes from "./routes/assignment.routes";
import reviewRoutes from "./routes/review.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Enterprise GRC Dashboard API Running",
  });
});

app.use("/api/risks", riskRoutes);
app.use("/api/controls", controlRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});