import { evidenceStore } from "../data/evidenceStore";
import { frameworkControls } from "../data/frameworkControls";
import { complianceEngine } from "../rules/complianceEngine";

export const reportService = {
  generateFrameworkReport(framework: string) {
    const controls = frameworkControls.filter(
      (control) =>
        control.framework.toLowerCase() === framework.toLowerCase()
    );

    const uploadedEvidence = evidenceStore.filter(
      (evidence) =>
        evidence.framework.toLowerCase() === framework.toLowerCase()
    );

    const implemented = uploadedEvidence.filter(
      (evidence) => evidence.status === "Implemented"
    ).length;

    const partiallyImplemented = uploadedEvidence.filter(
      (evidence) => evidence.status === "Partially Implemented"
    ).length;

    const notImplemented = controls.length - implemented - partiallyImplemented;

    const missingControls = controls.filter(
      (control) =>
        !uploadedEvidence.some(
          (evidence) => evidence.controlId === control.controlId
        )
    );

    return {
      framework,
      totalControls: controls.length,
      implemented,
      partiallyImplemented,
      notImplemented,
      complianceScore: complianceEngine.calculateFrameworkScore(framework),
      uploadedEvidenceCount: uploadedEvidence.length,
      missingControls: missingControls.map((control) => ({
        controlId: control.controlId,
        controlName: control.controlName
      })),
      evidence: uploadedEvidence
    };
  }
};