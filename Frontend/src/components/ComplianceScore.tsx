import { useEffect, useState } from "react";
import { fetchCompliance } from "../services/api";

type Framework = {
  framework: string;
  score: number;
};

export default function ComplianceScore() {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);

  useEffect(() => {
    fetchCompliance()
      .then(setFrameworks)
      .catch((error) =>
        console.error("Failed to load compliance scores", error)
      );
  }, []);

  const overallScore =
    frameworks.length > 0
      ? Math.round(
          frameworks.reduce((sum, framework) => sum + framework.score, 0) /
            frameworks.length
        )
      : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">Compliance Score</h2>
      <p className="mt-1 text-sm text-slate-400">
        Average compliance maturity across all frameworks.
      </p>

      <div className="mt-8 flex items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-8 border-blue-500/30">
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{overallScore}%</p>
            <p className="mt-2 text-sm text-slate-400">Overall Score</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {frameworks.map((framework) => (
          <div
            key={framework.framework}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-slate-300">
              {framework.framework}
            </span>

            <div className="flex items-center gap-3">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${framework.score}%` }}
                />
              </div>

              <span className="w-12 text-right text-sm font-semibold text-white">
                {framework.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}