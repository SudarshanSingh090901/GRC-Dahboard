// frontend/src/pages/Risks.tsx

// import { useEffect, useState } from "react";
// import axios from "axios";

// type RiskRow = {
//   id: string;
//   riskName: string;
//   framework: string;
//   severity: string;
//   status: string;
// };

// export default function Risks() {
//   const [risks, setRisks] = useState<RiskRow[]>([]);

//   useEffect(() => {
//     loadRisks();
//   }, []);

//   const loadRisks = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/reports/dashboard"
//       );

//       const rows = response.data.rows || [];

//       const mappedRisks: RiskRow[] = rows.map((row: any, index: number) => {
//         let severity = "Medium";
//         let status = "Open";

//         if (row.status === "Implemented") {
//           severity = "Low";
//           status = "Mitigated";
//         } else if (row.status === "Partially Implemented") {
//           severity = "Medium";
//           status = "In Progress";
//         } else if (row.status === "Not Implemented") {
//           severity = "Critical";
//           status = "Open";
//         }

//         return {
//           id: `R-${String(index + 1).padStart(3, "0")}`,
//           riskName: getRiskName(row.controlId, row.controlName),
//           framework: row.framework,
//           severity,
//           status,
//         };
//       });

//       setRisks(mappedRisks);
//     } catch (error) {
//       console.error("Failed to load risks", error);
//     }
//   };

//   const getRiskName = (controlId: string, controlName: string) => {
//     const lowerName = controlName.toLowerCase();

//     if (lowerName.includes("policy")) {
//       return "Missing or outdated security policies";
//     }

//     if (lowerName.includes("role")) {
//       return "Undefined information security responsibilities";
//     }

//     if (lowerName.includes("segregation")) {
//       return "Improper segregation of duties";
//     }

//     if (lowerName.includes("access")) {
//       return "Unauthorized access to critical systems";
//     }

//     if (lowerName.includes("incident")) {
//       return "Delayed incident response and reporting";
//     }

//     if (lowerName.includes("privacy")) {
//       return "Non-compliance with privacy requirements";
//     }

//     return `Weakness in control ${controlId}`;
//   };

//   const getSeverityStyle = (severity: string) => {
//     switch (severity) {
//       case "Critical":
//         return "text-red-400";

//       case "High":
//         return "text-orange-400";

//       case "Medium":
//         return "text-yellow-400";

//       default:
//         return "text-emerald-400";
//     }
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "Mitigated":
//         return "bg-emerald-500/20 text-emerald-400";

//       case "Closed":
//         return "bg-blue-500/20 text-blue-400";

//       case "In Progress":
//         return "bg-yellow-500/20 text-yellow-400";

//       default:
//         return "bg-red-500/20 text-red-400";
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-bold text-white">Risk Register</h1>

//         <p className="mt-2 text-slate-400">
//           Dynamic risks generated from current control review status.
//         </p>
//       </div>

//       <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="border-b border-slate-800 bg-slate-950 text-left text-xs uppercase tracking-wider text-slate-400">
//               <tr>
//                 <th className="px-6 py-5">Risk ID</th>
//                 <th className="px-6 py-5">Risk Name</th>
//                 <th className="px-6 py-5">Category</th>
//                 <th className="px-6 py-5">Severity</th>
//                 <th className="px-6 py-5">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {risks.map((risk) => (
//                 <tr
//                   key={risk.id}
//                   className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/30"
//                 >
//                   <td className="px-6 py-5 font-semibold text-white">
//                     {risk.id}
//                   </td>

//                   <td className="px-6 py-5">
//                     <div className="font-medium text-white">
//                       {risk.riskName}
//                     </div>

//                     <div className="mt-1 text-sm text-slate-500">
//                       Derived from assigned control review
//                     </div>
//                   </td>

//                   <td className="px-6 py-5">{risk.framework}</td>

//                   <td
//                     className={`px-6 py-5 font-semibold ${getSeverityStyle(
//                       risk.severity
//                     )}`}
//                   >
//                     {risk.severity}
//                   </td>

//                   <td className="px-6 py-5">
//                     <span
//                       className={`rounded-lg px-3 py-1 text-xs font-semibold ${getStatusStyle(
//                         risk.status
//                       )}`}
//                     >
//                       {risk.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api/config"; // ✅ added

type RiskRow = {
  id: string;
  riskName: string;
  framework: string;
  severity: string;
  status: string;
};

export default function Risks() {
  const [risks, setRisks] = useState<RiskRow[]>([]);

  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/reports/dashboard` // ✅ fixed
      );

      const rows = response.data.rows || [];

      const mappedRisks: RiskRow[] = rows.map((row: any, index: number) => {
        let severity = "Medium";
        let status = "Open";

        if (row.status === "Implemented") {
          severity = "Low";
          status = "Mitigated";
        } else if (row.status === "Partially Implemented") {
          severity = "Medium";
          status = "In Progress";
        } else if (row.status === "Not Implemented") {
          severity = "Critical";
          status = "Open";
        }

        return {
          id: `R-${String(index + 1).padStart(3, "0")}`,
          riskName: getRiskName(row.controlId, row.controlName),
          framework: row.framework,
          severity,
          status,
        };
      });

      setRisks(mappedRisks);
    } catch (error) {
      console.error("Failed to load risks", error);
    }
  };

  const getRiskName = (controlId: string, controlName: string) => {
    const lowerName = controlName.toLowerCase();

    if (lowerName.includes("policy")) {
      return "Missing or outdated security policies";
    }

    if (lowerName.includes("role")) {
      return "Undefined information security responsibilities";
    }

    if (lowerName.includes("segregation")) {
      return "Improper segregation of duties";
    }

    if (lowerName.includes("access")) {
      return "Unauthorized access to critical systems";
    }

    if (lowerName.includes("incident")) {
      return "Delayed incident response and reporting";
    }

    if (lowerName.includes("privacy")) {
      return "Non-compliance with privacy requirements";
    }

    return `Weakness in control ${controlId}`;
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-red-400";
      case "High":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      default:
        return "text-emerald-400";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Mitigated":
        return "bg-emerald-500/20 text-emerald-400";
      case "Closed":
        return "bg-blue-500/20 text-blue-400";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Risk Register</h1>

        <p className="mt-2 text-slate-400">
          Dynamic risks generated from current control review status.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-800 bg-slate-950 text-left text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-5">Risk ID</th>
                <th className="px-6 py-5">Risk Name</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Severity</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {risks.map((risk) => (
                <tr
                  key={risk.id}
                  className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/30"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    {risk.id}
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-medium text-white">
                      {risk.riskName}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      Derived from assigned control review
                    </div>
                  </td>

                  <td className="px-6 py-5">{risk.framework}</td>

                  <td
                    className={`px-6 py-5 font-semibold ${getSeverityStyle(
                      risk.severity
                    )}`}
                  >
                    {risk.severity}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        risk.status
                      )}`}
                    >
                      {risk.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}