import { frameworkControls } from "../data/frameworkControls";
import { evidenceStore } from "../data/evidenceStore";

type FrameworkScore = {
  framework: string;
  score: number;
  implemented: number;
  partial: number;
  notImplemented: number;
  totalControls: number;
};

export const complianceEngine = {
  getAllFrameworkScores(): FrameworkScore[] {
    const frameworks = [
      "ISO 27001",
      "ISO 42001",
      "DPDPA 2023",
      "NIST CSF"
    ];

    return frameworks.map((framework) => {
      const totalControls = frameworkControls.filter(
        (control) => control.framework === framework
      ).length;

      const evidence = evidenceStore.filter(
        (item) => item.framework === framework
      );

      const implemented = evidence.filter(
        (item) => item.status === "Implemented"
      ).length;

      const partial = evidence.filter(
        (item) => item.status === "Partially Implemented"
      ).length;

      const notImplemented = evidence.filter(
        (item) => item.status === "Not Implemented"
      ).length;

      const totalScore = evidence.reduce(
        (sum, item) => sum + item.score,
        0
      );

      const score =
        totalControls > 0
          ? Math.round(totalScore / totalControls)
          : 0;

      return {
        framework,
        score,
        implemented,
        partial,
        notImplemented,
        totalControls
      };
    });
  }
};