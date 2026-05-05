import { Router } from "express";
import { getCompliance } from "../controllers/compliance.controller";

const router = Router();

router.get("/", getCompliance);

export default router;