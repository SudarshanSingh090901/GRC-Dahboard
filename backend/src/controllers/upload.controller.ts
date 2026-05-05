import { Request, Response } from "express";
import { evidenceStore } from "../data/evidenceStore";
import { controlAssignments } from "../data/controlAssignments";

export const uploadEvidence = (req: Request, res: Response) => {
  const {
    framework,
    controlId,
    controlName,
    ownerName,
    status,
    remarks,
    evidenceType
  } = req.body;

  const score =
    status === "Implemented"
      ? 100
      : status === "Partially Implemented"
      ? 50
      : 0;

  const fileName = req.file ? req.file.originalname : "";

  const newEvidence = {
    id:
      evidenceStore.length > 0
        ? Math.max(...evidenceStore.map((item) => item.id)) + 1
        : 1,
    framework,
    controlId,
    controlName,
    ownerName,
    status,
    evidenceType,
    remarks,
    fileName,
    uploadedAt: new Date().toISOString(),
    score
  };

  evidenceStore.push(newEvidence);

  const assignment = controlAssignments.find(
    (item) =>
      item.ownerName === ownerName &&
      item.framework === framework &&
      item.controlId === controlId
  );

  if (assignment) {
    assignment.status = "Under Review";
  }

  res.status(201).json({
    success: true,
    message: "Evidence uploaded and sent for tester review",
    data: newEvidence
  });
};