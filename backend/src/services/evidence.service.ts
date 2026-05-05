import { evidenceStore, EvidenceRecord } from "../data/evidenceStore";
import { complianceEngine } from "../rules/complianceEngine";

export const evidenceService = {
  getAll() {
    return evidenceStore;
  },

  add(record: Omit<EvidenceRecord, "id" | "score">) {
    const score = complianceEngine.calculateControlScore(
      record.status,
      record.fileName
    );

    const newRecord: EvidenceRecord = {
      id: evidenceStore.length + 1,
      ...record,
      score
    };

    evidenceStore.push(newRecord);

    return newRecord;
  }
};