// frontend/src/pages/Dashboard.tsx

import { useEffect, useState } from "react";
import axios from "axios";

type DashboardSummary = {
  totalControls: number;
  accepted: number;
  rejected: number;
  pending: number;
  implementedScore: number;
};

type DashboardRow = {
  id: number;
  framework: string;
  controlId: string;
  controlName: string;
  owner: string;
  tester: string;
  evidence: string;
  status: string;
  score: number;
  uploadedAt: string;
};

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [rows, setRows] = useState<DashboardRow[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports/dashboard"
      );

      setSummary(response.data.summary);
      setRows(response.data.rows);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Implemented":
        return "bg-emerald-500/20 text-emerald-400";

      case "Partially Implemented":
        return "bg-yellow-500/20 text-yellow-400";

      case "Not Implemented":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Organization Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Live implementation and review status across all assigned controls.
        </p>
      </div>

      {summary && (
        <div className="grid gap-6 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Controls</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {summary.totalControls}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Accepted</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {summary.accepted}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {summary.rejected}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Pending Review</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {summary.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Implementation Score</p>
            <p className="mt-2 text-3xl font-bold text-blue-400">
              {summary.implementedScore}%
            </p>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-800 bg-slate-950 text-left text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Framework</th>
                <th className="px-6 py-4">Control</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Tester</th>
                <th className="px-6 py-4">Evidence</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Updated</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/30"
                >
                  <td className="px-6 py-5">{row.framework}</td>

                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">
                      {row.controlId}
                    </div>

                    <div className="mt-1 text-sm text-slate-400">
                      {row.controlName}
                    </div>
                  </td>

                  <td className="px-6 py-5">{row.owner}</td>

                  <td className="px-6 py-5">{row.tester}</td>

                  <td className="px-6 py-5">
                    {row.evidence !== "No Evidence Uploaded" ? (
                      <a
                        href={`http://localhost:5000/uploads/${row.evidence}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        View Evidence
                      </a>
                    ) : (
                      <span className="text-slate-500">
                        No Evidence Uploaded
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 font-bold text-white">
                    {row.score}%
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {new Date(row.uploadedAt).toLocaleString()}
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