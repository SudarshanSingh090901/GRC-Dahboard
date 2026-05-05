import { Request, Response } from "express";
import { riskService } from "../services/risk.service";

export const getRisks = (_req: Request, res: Response) => {
  const risks = riskService.getAll();

  res.json({
    success: true,
    data: risks
  });
};