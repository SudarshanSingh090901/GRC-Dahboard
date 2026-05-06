// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Assignment {
//   id: number;
//   framework: string;
//   controlId: string;
//   controlName: string;
//   ownerName: string;
//   testerName: string;
//   status: string;
//   testerStatus: string;
//   ownerStatus: string;
//   testerRemarks: string;
//   ownerRemarks: string;
//   evidenceFile: string | null;
// }

// interface EvidenceItem {
//   type: string;
//   fileName: string;
// }

// export default function OwnerDashboard() {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [ownerStatuses, setOwnerStatuses] = useState<Record<number, string>>({});
//   const [ownerRemarks, setOwnerRemarks] = useState<Record<number, string>>({});

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const ownerName = user?.name || "";

//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/assignments/owner/${ownerName}`
//       );

//       setAssignments(response.data.data || []);
//     } catch (error) {
//       console.error("OWNER FETCH ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     if (ownerName) {
//       fetchAssignments();
//     }
//   }, [ownerName]);

//   const handleReviewSubmit = async (assignmentId: number) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/assignments/${assignmentId}/owner-review`,
//         {
//           ownerStatus: ownerStatuses[assignmentId] || "Approved",
//           ownerRemarks: ownerRemarks[assignmentId] || "",
//         }
//       );

//       alert("Review submitted successfully");
//       fetchAssignments();
//     } catch (error) {
//       console.error("OWNER REVIEW ERROR:", error);
//       alert("Failed to submit owner review");
//     }
//   };

//   const parseEvidence = (evidenceFile: string | null): EvidenceItem[] => {
//     try {
//       if (!evidenceFile) return [];
//       return JSON.parse(evidenceFile);
//     } catch {
//       return [];
//     }
//   };

//   // Controls tester has submitted and owner must review
//   const pendingAssignments = assignments.filter(
//     (assignment) => assignment.status === "Submitted To Owner"
//   );

//   // Controls already reviewed by owner
//   const reviewedAssignments = assignments.filter(
//     (assignment) =>
//       assignment.status === "Completed" ||
//       assignment.status === "Returned To Tester"
//   );

//   return (
//     <div className="min-h-screen bg-[#020b1f] text-white px-10 py-8">
//       <h1 className="text-5xl font-bold mb-3">Control Owner Dashboard</h1>

//       <p className="text-gray-400 text-xl mb-10">
//         Logged in as: {ownerName}
//       </p>

//       {/* Pending Review Section */}
//       <div className="bg-[#0b1630] border border-[#1d2b4d] rounded-3xl p-8 mb-10">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-4xl font-bold">
//             Controls Awaiting Your Review
//           </h2>

//           <div className="bg-[#071127] border border-[#233459] rounded-2xl px-6 py-3 text-xl">
//             Pending: {pendingAssignments.length}
//           </div>
//         </div>

//         {pendingAssignments.length === 0 ? (
//           <div className="border border-dashed border-[#233459] rounded-3xl py-20 text-center text-gray-500 text-xl">
//             No controls pending your review.
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {pendingAssignments.map((assignment) => {
//               const evidence = parseEvidence(assignment.evidenceFile);

//               return (
//                 <div
//                   key={assignment.id}
//                   className="border border-[#233459] rounded-3xl p-8 bg-[#08152d]"
//                 >
//                   <div className="flex justify-between items-start mb-8">
//                     <div>
//                       <div className="text-gray-400 text-lg mb-2">
//                         {assignment.framework}
//                       </div>

//                       <div className="text-5xl font-bold mb-2">
//                         {assignment.controlId}
//                       </div>

//                       <div className="text-3xl text-gray-200 mb-4">
//                         {assignment.controlName}
//                       </div>

//                       <div className="text-lg text-cyan-400">
//                         Tester: {assignment.testerName}
//                       </div>
//                     </div>

//                     <div className="bg-yellow-500/20 text-yellow-300 px-5 py-2 rounded-xl text-lg">
//                       Awaiting Review
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-5 mb-8">
//                     <div className="bg-[#09162f] border border-[#233459] rounded-2xl p-5">
//                       <div className="text-gray-400 mb-2">Tester Status</div>
//                       <div className="text-2xl font-semibold text-cyan-400">
//                         {assignment.testerStatus}
//                       </div>
//                     </div>

//                     <div className="bg-[#09162f] border border-[#233459] rounded-2xl p-5">
//                       <div className="text-gray-400 mb-2">Current Status</div>
//                       <div className="text-2xl font-semibold text-yellow-300">
//                         {assignment.status}
//                       </div>
//                     </div>

//                     <div className="bg-[#09162f] border border-[#233459] rounded-2xl p-5">
//                       <div className="text-gray-400 mb-2">Evidence Count</div>
//                       <div className="text-2xl font-semibold">
//                         {evidence.length}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mb-8">
//                     <div className="text-2xl font-semibold mb-4">
//                       Tester Remarks
//                     </div>

//                     <div className="bg-[#09162f] border border-[#233459] rounded-2xl p-5 text-lg text-gray-300">
//                       {assignment.testerRemarks || "No remarks provided"}
//                     </div>
//                   </div>

//                   <div className="mb-8">
//                     <div className="text-2xl font-semibold mb-4">
//                       Submitted Evidence
//                     </div>

//                     {evidence.length === 0 ? (
//                       <div className="bg-[#09162f] border border-dashed border-[#233459] rounded-2xl p-6 text-gray-500">
//                         No evidence submitted
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {evidence.map((item, index) => (
//                           <div
//                             key={index}
//                             className="bg-[#09162f] border border-[#233459] rounded-2xl p-5 flex items-center justify-between"
//                           >
//                             <div>
//                               <div className="text-cyan-400 text-sm mb-1">
//                                 {item.type}
//                               </div>

//                               <div className="text-xl">{item.fileName}</div>
//                             </div>

//                             <div className="text-gray-400 text-sm">
//                               Evidence #{index + 1}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-6 mb-8">
//                     <div>
//                       <label className="block text-xl mb-3">
//                         Owner Decision
//                       </label>

//                       <select
//                         value={ownerStatuses[assignment.id] || "Approved"}
//                         onChange={(e) =>
//                           setOwnerStatuses((prev) => ({
//                             ...prev,
//                             [assignment.id]: e.target.value,
//                           }))
//                         }
//                         className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-xl"
//                       >
//                         <option value="Approved">Approved</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-xl mb-3">
//                         Owner Remarks
//                       </label>

//                       <textarea
//                         value={ownerRemarks[assignment.id] || ""}
//                         onChange={(e) =>
//                           setOwnerRemarks((prev) => ({
//                             ...prev,
//                             [assignment.id]: e.target.value,
//                           }))
//                         }
//                         rows={4}
//                         placeholder="Provide review comments..."
//                         className="w-full bg-[#09162f] border border-[#233459] rounded-2xl px-5 py-4 text-lg resize-none"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex justify-end">
//                     <button
//                       onClick={() => handleReviewSubmit(assignment.id)}
//                       className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-xl font-semibold transition-all"
//                     >
//                       Submit Review
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* History Section */}
//       <div className="bg-[#0b1630] border border-[#1d2b4d] rounded-3xl p-8">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-4xl font-bold">Review History</h2>

//           <div className="bg-[#071127] border border-[#233459] rounded-2xl px-6 py-3 text-xl">
//             Reviewed: {reviewedAssignments.length}
//           </div>
//         </div>

//         {reviewedAssignments.length === 0 ? (
//           <div className="border border-dashed border-[#233459] rounded-3xl py-20 text-center text-gray-500 text-xl">
//             No completed reviews yet.
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {reviewedAssignments.map((assignment) => (
//               <div
//                 key={assignment.id}
//                 className="bg-[#08152d] border border-[#233459] rounded-2xl p-6 flex justify-between items-center"
//               >
//                 <div>
//                   <div className="text-gray-400 text-sm mb-1">
//                     {assignment.framework}
//                   </div>

//                   <div className="text-2xl font-bold">
//                     {assignment.controlId}
//                   </div>

//                   <div className="text-lg text-gray-300">
//                     {assignment.controlName}
//                   </div>
//                 </div>

//                 <div
//                   className={`px-5 py-2 rounded-xl text-lg font-semibold ${
//                     assignment.status === "Completed"
//                       ? "bg-green-500/20 text-green-300"
//                       : "bg-red-500/20 text-red-300"
//                   }`}
//                 >
//                   {assignment.status}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE } from "../api/config"; // ✅ added

// interface Assignment {
//   id: number;
//   framework: string;
//   controlId: string;
//   controlName: string;
//   ownerName: string;
//   testerName: string;
//   status: string;
//   testerStatus: string;
//   ownerStatus: string;
//   testerRemarks: string;
//   ownerRemarks: string;
//   evidenceFile: string | null;
// }

// interface EvidenceItem {
//   type: string;
//   fileName: string;
// }

// export default function OwnerDashboard() {
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [ownerStatuses, setOwnerStatuses] = useState<Record<number, string>>({});
//   const [ownerRemarks, setOwnerRemarks] = useState<Record<number, string>>({});

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const ownerName = user?.name || "";

//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE}/assignments/owner/${ownerName}` // ✅ fixed
//       );

//       setAssignments(response.data.data || []);
//     } catch (error) {
//       console.error("OWNER FETCH ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     if (ownerName) {
//       fetchAssignments();
//     }
//   }, [ownerName]);

//   const handleReviewSubmit = async (assignmentId: number) => {
//     try {
//       await axios.put(
//         `${API_BASE}/assignments/${assignmentId}/owner-review`, // ✅ fixed
//         {
//           ownerStatus: ownerStatuses[assignmentId] || "Approved",
//           ownerRemarks: ownerRemarks[assignmentId] || "",
//         }
//       );

//       alert("Review submitted successfully");
//       fetchAssignments();
//     } catch (error) {
//       console.error("OWNER REVIEW ERROR:", error);
//       alert("Failed to submit owner review");
//     }
//   };

//   const parseEvidence = (evidenceFile: string | null): EvidenceItem[] => {
//     try {
//       if (!evidenceFile) return [];
//       return JSON.parse(evidenceFile);
//     } catch {
//       return [];
//     }
//   };

//   const pendingAssignments = assignments.filter(
//     (assignment) => assignment.status === "Submitted To Owner"
//   );

//   const reviewedAssignments = assignments.filter(
//     (assignment) =>
//       assignment.status === "Completed" ||
//       assignment.status === "Returned To Tester"
//   );

//   return (
//     <div className="min-h-screen bg-[#020b1f] text-white px-10 py-8">
//       <h1 className="text-5xl font-bold mb-3">Control Owner Dashboard</h1>

//       <p className="text-gray-400 text-xl mb-10">
//         Logged in as: {ownerName}
//       </p>

//       {/* UI unchanged */}
//       {/* Everything below stays same — no logic change needed */}
//     </div>
//   );
// }








import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api/config";

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
  ownerRemarks: string;
  evidenceFile: string | null;
}

interface EvidenceItem {
  type: string;
  fileName: string;
}

export default function OwnerDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [ownerStatuses, setOwnerStatuses] = useState<Record<number, string>>({});
  const [ownerRemarks, setOwnerRemarks] = useState<Record<number, string>>({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const ownerName = user?.name || "";

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/assignments/owner/${encodeURIComponent(ownerName)}`
      );

      console.log("OWNER DATA:", response.data);

      setAssignments(response.data.data || []);
    } catch (error) {
      console.error("OWNER FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    if (ownerName) {
      fetchAssignments();
    }
  }, [ownerName]);

  const handleReviewSubmit = async (assignmentId: number) => {
    try {
      await axios.put(
        `${API_BASE}/assignments/${assignmentId}/owner-review`,
        {
          ownerStatus: ownerStatuses[assignmentId] || "Approved",
          ownerRemarks: ownerRemarks[assignmentId] || "",
        }
      );

      alert("Review submitted successfully");
      fetchAssignments();
    } catch (error) {
      console.error("OWNER REVIEW ERROR:", error);
      alert("Failed to submit owner review");
    }
  };

  const parseEvidence = (evidenceFile: string | null): EvidenceItem[] => {
    try {
      if (!evidenceFile) return [];
      return JSON.parse(evidenceFile);
    } catch {
      return [];
    }
  };

  const pendingAssignments = assignments.filter(
    (a) => a.status === "Submitted To Owner"
  );

  const reviewedAssignments = assignments.filter(
    (a) =>
      a.status === "Completed" ||
      a.status === "Returned To Tester"
  );

  return (
    <div className="min-h-screen bg-[#020b1f] text-white px-10 py-8">
      <h1 className="text-5xl font-bold mb-3">
        Control Owner Dashboard
      </h1>

      <p className="text-gray-400 text-xl mb-10">
        Logged in as: {ownerName}
      </p>

      {/* PENDING */}
      <h2 className="text-2xl mb-4">Pending Reviews</h2>

      {pendingAssignments.length === 0 ? (
        <p className="text-gray-400 mb-10">No pending assignments</p>
      ) : (
        <div className="space-y-6 mb-10">
          {pendingAssignments.map((a) => (
            <div key={a.id} className="bg-[#0b1b3f] p-5 rounded-xl">
              <h3 className="text-xl font-bold">
                {a.controlId} - {a.controlName}
              </h3>

              <p>Tester: {a.testerName}</p>
              <p>Status: {a.testerStatus}</p>
              <p>Remarks: {a.testerRemarks || "None"}</p>

              <div className="mt-2">
                <p className="font-semibold">Evidence:</p>
                {parseEvidence(a.evidenceFile).map((e, i) => (
                  <p key={i} className="text-sm text-gray-300">
                    {e.type} - {e.fileName}
                  </p>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-3">
                <select
                  className="bg-black p-2 rounded mr-3"
                  onChange={(e) =>
                    setOwnerStatuses((prev) => ({
                      ...prev,
                      [a.id]: e.target.value,
                    }))
                  }
                >
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>

                <input
                  type="text"
                  placeholder="Remarks"
                  className="bg-black p-2 rounded mr-3"
                  onChange={(e) =>
                    setOwnerRemarks((prev) => ({
                      ...prev,
                      [a.id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => handleReviewSubmit(a.id)}
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  Submit Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REVIEWED */}
      <h2 className="text-2xl mb-4">Reviewed</h2>

      {reviewedAssignments.length === 0 ? (
        <p className="text-gray-400">No reviewed assignments</p>
      ) : (
        <div className="space-y-6">
          {reviewedAssignments.map((a) => (
            <div key={a.id} className="bg-[#1a2a5f] p-5 rounded-xl">
              <h3>
                {a.controlId} - {a.controlName}
              </h3>
              <p>Status: {a.ownerStatus}</p>
              <p>Remarks: {a.ownerRemarks}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}