import { Router } from "express";
import multer from "multer";
import {
  uploadEvidence
} from "../controllers/upload.controller";
import { evidenceStore } from "../data/evidenceStore";

const router = Router();

const upload = multer({
  dest: "uploads/"
});

router.post("/", upload.single("file"), uploadEvidence);

router.get("/", (_req, res) => {
  res.json({
    success: true,
    data: evidenceStore
  });
});

export default router;