import { Router } from "express";
import {
  assignControls,
  getAssignments,
  getAssignmentsForTester,
  getAssignmentsForOwner,
  testerSubmitEvidence,
  ownerReviewAssignment,
  deleteAssignment,
} from "../controllers/assignment.controller";

const router = Router();

router.post("/", assignControls);

router.get("/", getAssignments);
router.get("/tester/:testerName", getAssignmentsForTester);
router.get("/owner/:ownerName", getAssignmentsForOwner);

router.put("/:id/tester-submit", testerSubmitEvidence);
router.put("/:id/owner-review", ownerReviewAssignment);

router.delete("/:id", deleteAssignment);

export default router;