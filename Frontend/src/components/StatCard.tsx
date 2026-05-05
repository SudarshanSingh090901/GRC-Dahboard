type StatCardProps = {
    title: string;
    value: string;
    change: string;
    color: "primary" | "success" | "warning" | "danger";
  };
  
  const colorClasses = {
    primary: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    danger: "border-red-500/30 bg-red-500/10 text-red-400"
  };
  
  export default function StatCard({
    title,
    value,
    change,
    color
  }: StatCardProps) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              {title}
            </p>
  
            <h3 className="mt-3 text-4xl font-bold text-white">{value}</h3>
          </div>
  
          <div
            className={`rounded-xl border px-3 py-1 text-sm font-semibold ${
              colorClasses[color]
            }`}
          >
            {change}
          </div>
        </div>
      </div>
    );
  }