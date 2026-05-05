import { useEffect, useState } from "react";
import { fetchCompliance } from "../services/api";

type ReportItem = {
  framework: string;
  score?: number;
  percentage?: number;
  implemented: number;
  partial: number;
  notImplemented: number;
  totalControls: number;
};

export default function Reports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await fetchCompliance();

      setReports(data);
    } catch (error) {
      console.error("Failed to load report data", error);
    } finally {
      setLoading(false);
    }
  };

  const getScore = (item: ReportItem) => {
    return Number(item.percentage ?? item.score ?? 0);
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) {
      return {
        label: "Low",
        color: "bg-green-600/20 text-green-400",
      };
    }

    if (score >= 50) {
      return {
        label: "Medium",
        color: "bg-yellow-600/20 text-yellow-400",
      };
    }

    return {
      label: "Critical",
      color: "bg-red-600/20 text-red-400",
    };
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-300">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Compliance Reports
        </h1>

        <p className="mt-2 text-slate-400">
          Reports are generated automatically from live approved control
          data.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {reports.map((item) => {
          const finalScore = getScore(item);
          const badge = getRiskBadge(finalScore);

          return (
            <div
              key={item.framework}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    {item.framework}
                  </p>

                  <h2 className="mt-3 text-5xl font-bold text-white">
                    {finalScore}%
                  </h2>
                </div>

                <div className="space-y-3 text-right">
                  <div
                    className={`rounded-xl px-4 py-2 text-sm font-semibold ${badge.color}`}
                  >
                    {badge.label}
                  </div>

                  <div className="rounded-xl bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
                    {item.implemented}/{item.totalControls} Controls
                    Implemented
                  </div>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${finalScore}%`,
                  }}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Total Controls
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {item.totalControls}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Implemented
                  </p>

                  <p className="mt-3 text-3xl font-bold text-emerald-400">
                    {item.implemented}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Partial
                  </p>

                  <p className="mt-3 text-3xl font-bold text-yellow-400">
                    {item.partial}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Not Implemented
                  </p>

                  <p className="mt-3 text-3xl font-bold text-red-400">
                    {item.notImplemented}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}