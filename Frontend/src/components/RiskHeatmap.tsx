const heatmapData = [
    ["Critical", 8, 5, 2, 0],
    ["High", 4, 9, 7, 1],
    ["Medium", 1, 6, 8, 3],
    ["Low", 0, 2, 4, 6]
  ];
  
  const colors = [
    "bg-green-500/20 text-green-400",
    "bg-yellow-500/20 text-yellow-400",
    "bg-orange-500/20 text-orange-400",
    "bg-red-500/20 text-red-400"
  ];
  
  export default function RiskHeatmap() {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Risk Heatmap</h2>
          <p className="mt-1 text-sm text-slate-400">
            Probability vs impact distribution of identified risks.
          </p>
        </div>
  
        <div className="grid grid-cols-5 gap-3 text-center">
          <div></div>
          <div className="text-xs uppercase text-slate-400">Very Low</div>
          <div className="text-xs uppercase text-slate-400">Low</div>
          <div className="text-xs uppercase text-slate-400">Medium</div>
          <div className="text-xs uppercase text-slate-400">High</div>
  
          {heatmapData.map((row, rowIndex) => (
            <>
              <div
                key={`${row[0]}-label`}
                className="flex items-center justify-center text-xs font-semibold uppercase text-slate-400"
              >
                {row[0]}
              </div>
  
              {row.slice(1).map((value, colIndex) => {
                const color =
                  value >= 7
                    ? colors[3]
                    : value >= 5
                    ? colors[2]
                    : value >= 3
                    ? colors[1]
                    : colors[0];
  
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`flex h-16 items-center justify-center rounded-xl border border-slate-800 font-bold ${color}`}
                  >
                    {value}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    );
  }