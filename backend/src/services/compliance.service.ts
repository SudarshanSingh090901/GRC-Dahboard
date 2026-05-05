import { controlData } from "../data/seed";

export const complianceService = {
  getControls() {
    return controlData;
  },

  getFrameworkScores() {
    return Object.entries(controlData).map(([framework, value]) => ({
      framework,
      score: Math.round((value.implemented / value.total) * 100),
      implemented: value.implemented,
      total: value.total
    }));
  }
};