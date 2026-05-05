// frontend/src/pages/TesterDashboard.tsx

import { useEffect, useState } from "react";
import axios from "axios";

interface Assignment {
  id: number;
  framework: string;
  controlId: string;
  controlName: string;
  ownerName: string;
  testerName: string;
  status: string;
  testerStatus: string;
  ownerStatus: string;
  testerRemarks: string;
  evidenceFile: string | null;
}

interface EvidenceItem {
  type: string;
  fileName: string;
}

const evidenceOptions = [
  "Logs",
  "SOP",
  "Policy",
  "Screenshot",
  "Report",
  "Configuration",
  "Audit Trail",
  "Other",
];

export default function TesterDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvidenceType, setSelectedEvidenceType] = useState<
    Record<number, string>
  >({});

  const [uploadedEvidence, setUploadedEvidence] = useState<
    Record<number, EvidenceItem[]>
  >({});

  const [testerStatuses, setTesterStatuses] = useState<
    Record<number, string>
  >({});

  const [testerRemarksMap, setTesterRemarksMap] = useState<
    Record<number, string>
  >({});

  const loggedInUser = localStorage.getItem("user");

  const parsedUser = loggedInUser ? JSON.parse(loggedInUser) : null;

  const testerName = parsedUser?.name || "";

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/assignments/tester/${testerName}`
      );

      const data: Assignment[] = response.data.data || [];

      setAssignments(data);

      const evidenceMap: Record<number, EvidenceItem[]> = {};

      data.forEach((assignment) => {
        try {
          evidenceMap[assignment.id] = assignment.evidenceFile
            ? JSON.parse(assignment.evidenceFile)
            : [];
        } catch {
          evidenceMap[assignment.id] = [];
        }
      });

      setUploadedEvidence(evidenceMap);
    } catch (error) {
      console.error("FETCH TESTER ASSIGNMENTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testerName) {
      fetchAssignments();
    }
  }, [testerName]);

  const handleFileSelect = (
    assignmentId: number,
    file: File | null
  ) => {
    if (!file) return;

    const evidenceType =
      selectedEvidenceType[assignmentId] || "Other";

    const newEvidence: EvidenceItem = {
      type: evidenceType,
      fileName: file.name,
    };

    setUploadedEvidence((prev) => ({
      ...prev,
      [assignmentId]: [...(prev[assignmentId] || []), newEvidence],
    }));
  };

  const handleSubmitToOwner = async (assignmentId: number) => {
    try {
      const testerStatus =
        testerStatuses[assignmentId] || "Implemented";

      const testerRemarks =
        testerRemarksMap[assignmentId] || "";

      const evidenceForControl =
        uploadedEvidence[assignmentId] || [];

      await axios.put(
        `http://localhost:5000/api/assignments/${assignmentId}/tester-submit`,
        {
          testerStatus,
          testerRemarks,
          evidenceFile: evidenceForControl,
        }
      );

      alert("Evidence submitted successfully");

      fetchAssignments();
    } catch (error: any) {
      console.error(
        "SUBMIT EVIDENCE ERROR:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to submit evidence"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-white text-xl">
        Loading assignments...
      </div>
    );
  }

  const pendingAssignments = assignments.filter(
    (assignment) =>
      assignment.status !== "Completed" &&
      assignment.status !== "Submitted To Owner"
  );

  return (
    <div className="min-h-screen bg-[#020b1f] text-white px-10 py-8">
      <h1 className="text-5xl font-bold mb-3">Tester Dashboard</h1>

      <p className="text-gray-400 text-xl mb-10">
        Logged in as: {testerName}
      </p>

      <div className="bg-[#0b1630] border border-[#1d2b4d] rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Assigned Controls</h2>

          <div className="bg-[#071127] border border-[#233459] rounded-2xl px-6 py-3 text-xl">
            Pending: {pendingAssignments.length}
          </div>
        </div>

        {pendingAssignments.length === 0 ? (
          <div className="border border-dashed border-[#233459] rounded-3xl py-20 text-center text-gray-500 text-xl">
            No controls awaiting action.
          </div>
        ) : (
          <div className="space-y-8">
            {pendingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border border-[#233459] rounded-3xl p-8 bg-[#08152d]"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-gray-400 text-lg mb-2">
                      {assignment.framework}
                    </div>

                    <div className="text-5xl font-bold mb-2">
                      {assignment.controlId}
                    </div>

                    <div className="text-3xl text-gray-200">
                      {assignment.controlName}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-gray-400 text-lg mb-2">
                      Control Owner
                    </div>

                    <div className="text-3xl font-semibold">
                      {assignment.ownerName}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xl mb-3">
                      Evidence Type
                    </label>

                    <select
                      value={
                        selectedEvidenceType[assignment.id] || "Logs"
                      }
                      onChange={(e) =>
                        setSelectedEvidenceType((prev) => ({
                          ...prev,
                          [assignment.id]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-xl outline-none"
                    >
                      {evidenceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xl mb-3">
                      Upload Evidence
                    </label>

                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileSelect(
                          assignment.id,
                          e.target.files?.[0] || null
                        )
                      }
                      className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-lg"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-xl mb-4">Uploaded Evidence</div>

                  <div className="space-y-3">
                    {(uploadedEvidence[assignment.id] || []).length ===
                    0 ? (
                      <div className="border border-dashed border-[#233459] rounded-2xl px-5 py-6 text-gray-500">
                        No evidence uploaded yet
                      </div>
                    ) : (
                      uploadedEvidence[assignment.id].map(
                        (evidence, index) => (
                          <div
                            key={index}
                            className="border border-[#233459] rounded-2xl px-5 py-4 bg-[#09162f]"
                          >
                            <div className="text-cyan-400 text-sm mb-1">
                              {evidence.type}
                            </div>

                            <div className="text-xl">
                              {evidence.fileName}
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xl mb-3">
                      Tester Status
                    </label>

                    <select
                      value={
                        testerStatuses[assignment.id] ||
                        assignment.testerStatus ||
                        "Implemented"
                      }
                      onChange={(e) =>
                        setTesterStatuses((prev) => ({
                          ...prev,
                          [assignment.id]: e.target.value,
                        }))
                      }
                      className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-xl outline-none"
                    >
                      <option value="Implemented">Implemented</option>
                      <option value="Partially Implemented">
                        Partially Implemented
                      </option>
                      <option value="Not Implemented">
                        Not Implemented
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xl mb-3">
                      Tester Remarks
                    </label>

                    <textarea
                      value={testerRemarksMap[assignment.id] || ""}
                      onChange={(e) =>
                        setTesterRemarksMap((prev) => ({
                          ...prev,
                          [assignment.id]: e.target.value,
                        }))
                      }
                      placeholder="Enter implementation remarks..."
                      rows={4}
                      className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-lg outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      handleSubmitToOwner(assignment.id)
                    }
                    className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl text-xl font-semibold"
                  >
                    Submit To Control Owner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}