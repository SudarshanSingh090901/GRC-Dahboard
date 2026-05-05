type Evidence = {
    id: number;
    framework: string;
    controlId: string;
    controlName: string;
    ownerName: string;
    status: string;
    evidenceType: string;
    uploadedAt: string;
    score: number;
  };
  
  type Props = {
    evidence: Evidence[];
  };
  
  export default function EvidenceTable({ evidence }: Props) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Framework
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Control
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Owner
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Evidence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Uploaded
                </th>
              </tr>
            </thead>
  
            <tbody>
              {evidence.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-950/60"
                >
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {item.framework}
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">
                      {item.controlId}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {item.controlName}
                    </div>
                  </td>
  
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {item.ownerName}
                  </td>
  
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {item.evidenceType}
                  </td>
  
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        item.status === "Implemented"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Partially Implemented"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
  
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {item.score}%
                  </td>
  
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(item.uploadedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
  
              {evidence.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No evidence uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }