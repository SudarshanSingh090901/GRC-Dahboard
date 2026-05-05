export default function Header() {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  
    return (
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Enterprise Risk & Compliance Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Monitor ISO 27001, ISO 42001, DPDPA Act 2023 and NIST CSF readiness
          </p>
        </div>
  
        <div className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-right">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Today
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{today}</p>
        </div>
      </header>
    );
  }