import { Request, Response } from "express";
import { evidenceStore } from "../data/evidenceStore";
import { controlAssignments } from "../data/controlAssignments";

export const approveEvidence = (req: Request, res: Response) => {
  const { evidenceId } = req.params;

  const evidence = evidenceStore.find(
    (item) => item.id === Number(evidenceId)
  );

  if (!evidence) {
    return res.status(404).json({
      success: false,
      message: "Evidence not found"
    });
  }

  const assignment = controlAssignments.find(
    (item) =>
      item.framework === evidence.framework &&
      item.controlId === evidence.controlId &&
      item.ownerName === evidence.ownerName
  );

  if (assignment) {
    assignment.status = "Tested";
  }

  return res.json({
    success: true,
    message: "Evidence approved successfully"
  });
};

export const rejectEvidence = (req: Request, res: Response) => {
  const { evidenceId } = req.params;

  const evidence = evidenceStore.find(
    (item) => item.id === Number(evidenceId)
  );

  if (!evidence) {
    return res.status(404).json({
      success: false,
      message: "Evidence not found"
    });
  }

  const assignment = controlAssignments.find(
    (item) =>
      item.framework === evidence.framework &&
      item.controlId === evidence.controlId &&
      item.ownerName === evidence.ownerName
  );

  if (assignment) {
    assignment.status = "Assigned";
  }

  return res.json({
    success: true,
    message: "Evidence rejected and sent back to owner"
  });
};