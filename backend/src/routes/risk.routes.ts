import { Router } from "express";
import { getRisks } from "../controllers/risk.controller";

const router = Router();

router.get("/", getRisks);

export default router;