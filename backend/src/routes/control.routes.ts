import { Router } from "express";
import { getControls } from "../controllers/control.controller";

const router = Router();

router.get("/", getControls);

export default router;