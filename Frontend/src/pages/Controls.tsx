// frontend/src/pages/Compliance.tsx

// import { useEffect, useState } from "react";
// import axios from "axios";

// type FrameworkSummary = {
//   name: string;
//   total: number;
//   implemented: number;
//   partial: number;
//   notImplemented: number;
//   percent: number;
// };

// export default function Compliance() {
//   const [frameworks, setFrameworks] = useState<FrameworkSummary[]>([]);

//   useEffect(() => {
//     loadCompliance();
//   }, []);

//   const loadCompliance = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/reports/dashboard"
//       );

//       const rows = response.data.rows || [];

//       const grouped: Record<string, FrameworkSummary> = {};

//       rows.forEach((row: any) => {
//         if (!grouped[row.framework]) {
//           grouped[row.framework] = {
//             name: row.framework,
//             total: 0,
//             implemented: 0,
//             partial: 0,
//             notImplemented: 0,
//             percent: 0,
//           };
//         }

//         grouped[row.framework].total += 1;

//         if (row.status === "Implemented") {
//           grouped[row.framework].implemented += 1;
//         } else if (row.status === "Partially Implemented") {
//           grouped[row.framework].partial += 1;
//         } else {
//           grouped[row.framework].notImplemented += 1;
//         }
//       });

//       Object.values(grouped).forEach((framework) => {
//         framework.percent = framework.total
//           ? Math.round(
//               ((framework.implemented + framework.partial * 0.5) /
//                 framework.total) *
//                 100
//             )
//           : 0;
//       });

//       setFrameworks(Object.values(grouped));
//     } catch (error) {
//       console.error("Failed to load compliance data", error);
//     }
//   };

//   const getRiskLabel = (percent: number) => {
//     if (percent >= 80) return "Low";
//     if (percent >= 50) return "Medium";
//     return "Critical";
//   };

//   const getRiskStyle = (percent: number) => {
//     if (percent >= 80) {
//       return "bg-emerald-500/20 text-emerald-400";
//     }

//     if (percent >= 50) {
//       return "bg-yellow-500/20 text-yellow-400";
//     }

//     return "bg-red-500/20 text-red-400";
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-bold text-white">Compliance Overview</h1>

//         <p className="mt-2 text-slate-400">
//           Compliance is calculated dynamically from reviewed controls.
//         </p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         {frameworks.map((framework) => (
//           <div
//             key={framework.name}
//             className="rounded-3xl border border-slate-800 bg-slate-900 p-7"
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-xl font-semibold text-white">
//                   {framework.name}
//                 </p>

//                 <p className="mt-4 text-5xl font-bold text-white">
//                   {framework.percent}%
//                 </p>
//               </div>

//               <span
//                 className={`rounded-xl px-4 py-2 text-sm font-semibold ${getRiskStyle(
//                   framework.percent
//                 )}`}
//               >
//                 {getRiskLabel(framework.percent)}
//               </span>
//             </div>

//             <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
//               <div
//                 className="h-full rounded-full bg-blue-500"
//                 style={{ width: `${framework.percent}%` }}
//               />
//             </div>

//             <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
//               <div className="rounded-2xl bg-slate-950 p-4">
//                 <p className="text-xs uppercase text-slate-500">
//                   Total Controls
//                 </p>

//                 <p className="mt-3 text-3xl font-bold text-white">
//                   {framework.total}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-950 p-4">
//                 <p className="text-xs uppercase text-slate-500">
//                   Implemented
//                 </p>

//                 <p className="mt-3 text-3xl font-bold text-emerald-400">
//                   {framework.implemented}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-950 p-4">
//                 <p className="text-xs uppercase text-slate-500">Partial</p>

//                 <p className="mt-3 text-3xl font-bold text-yellow-400">
//                   {framework.partial}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-950 p-4">
//                 <p className="text-xs uppercase text-slate-500">
//                   Not Implemented
//                 </p>

//                 <p className="mt-3 text-3xl font-bold text-red-400">
//                   {framework.notImplemented}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api/config"; // ✅ added

type FrameworkSummary = {
  name: string;
  total: number;
  implemented: number;
  partial: number;
  notImplemented: number;
  percent: number;
};

export default function Compliance() {
  const [frameworks, setFrameworks] = useState<FrameworkSummary[]>([]);

  useEffect(() => {
    loadCompliance();
  }, []);

  const loadCompliance = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/reports/dashboard` // ✅ fixed
      );

      const rows = response.data.rows || [];

      const grouped: Record<string, FrameworkSummary> = {};

      rows.forEach((row: any) => {
        if (!grouped[row.framework]) {
          grouped[row.framework] = {
            name: row.framework,
            total: 0,
            implemented: 0,
            partial: 0,
            notImplemented: 0,
            percent: 0,
          };
        }

        grouped[row.framework].total += 1;

        if (row.status === "Implemented") {
          grouped[row.framework].implemented += 1;
        } else if (row.status === "Partially Implemented") {
          grouped[row.framework].partial += 1;
        } else {
          grouped[row.framework].notImplemented += 1;
        }
      });

      Object.values(grouped).forEach((framework) => {
        framework.percent = framework.total
          ? Math.round(
              ((framework.implemented + framework.partial * 0.5) /
                framework.total) *
                100
            )
          : 0;
      });

      setFrameworks(Object.values(grouped));
    } catch (error) {
      console.error("Failed to load compliance data", error);
    }
  };

  const getRiskLabel = (percent: number) => {
    if (percent >= 80) return "Low";
    if (percent >= 50) return "Medium";
    return "Critical";
  };

  const getRiskStyle = (percent: number) => {
    if (percent >= 80) {
      return "bg-emerald-500/20 text-emerald-400";
    }

    if (percent >= 50) {
      return "bg-yellow-500/20 text-yellow-400";
    }

    return "bg-red-500/20 text-red-400";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Compliance Overview</h1>
        <p className="mt-2 text-slate-400">
          Compliance is calculated dynamically from reviewed controls.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {frameworks.map((framework) => (
          <div
            key={framework.name}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-7"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl font-semibold text-white">
                  {framework.name}
                </p>
                <p className="mt-4 text-5xl font-bold text-white">
                  {framework.percent}%
                </p>
              </div>

              <span
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${getRiskStyle(
                  framework.percent
                )}`}
              >
                {getRiskLabel(framework.percent)}
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${framework.percent}%` }}
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Total Controls
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {framework.total}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Implemented
                </p>
                <p className="mt-3 text-3xl font-bold text-emerald-400">
                  {framework.implemented}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">Partial</p>
                <p className="mt-3 text-3xl font-bold text-yellow-400">
                  {framework.partial}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Not Implemented
                </p>
                <p className="mt-3 text-3xl font-bold text-red-400">
                  {framework.notImplemented}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}