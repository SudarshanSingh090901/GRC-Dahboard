import { Router } from "express";
import {
  approveEvidence,
  rejectEvidence
} from "../controllers/review.controller";

const router = Router();

router.post("/approve/:evidenceId", approveEvidence);
router.post("/reject/:evidenceId", rejectEvidence);

export default router;