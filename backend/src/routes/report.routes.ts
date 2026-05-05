// backend/src/routes/report.routes.ts

import { Router } from "express";
import {
  getDashboardReport,
  getComplianceReport,
} from "../controllers/report.controller";

const router = Router();

/* Dashboard page */
router.get("/dashboard", getDashboardReport);

/* Reports page */
router.get("/", getComplianceReport);

export default router;