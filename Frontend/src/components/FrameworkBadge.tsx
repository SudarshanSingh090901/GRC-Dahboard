type FrameworkBadgeProps = {
    name: string;
    score: string;
  };
  
  export default function FrameworkBadge({
    name,
    score
  }: FrameworkBadgeProps) {
    const numericScore = Number(score.replace("%", ""));
  
    const scoreColor =
      numericScore >= 90
        ? "bg-green-500/20 text-green-400 border-green-500/30"
        : numericScore >= 75
        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        : "bg-red-500/20 text-red-400 border-red-500/30";
  
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Framework
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">{name}</h3>
          </div>
  
          <div
            className={`rounded-xl border px-4 py-2 text-sm font-bold ${scoreColor}`}
          >
            {score}
          </div>
        </div>
      </div>
    );
  }