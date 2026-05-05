import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from "recharts";
  
  type FrameworkTrend = {
    name: string;
    score: number;
  };
  
  type FrameworkTrendChartProps = {
    data: FrameworkTrend[];
  };
  
  export default function FrameworkTrendChart({
    data
  }: FrameworkTrendChartProps) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Framework Compliance Trend
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Current compliance score across all frameworks based on uploaded
            evidence.
          </p>
        </div>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }