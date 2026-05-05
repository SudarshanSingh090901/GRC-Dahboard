// frontend/src/layout/DashboardLayout.tsx

import { Link, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("ownerName");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900 p-6">
        <div>
          <h1 className="text-2xl font-bold">Enterprise GRC</h1>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Logged in as</p>
            <p className="mt-1 font-semibold text-white">
              {user.name || "Unknown User"}
            </p>
            <p className="mt-1 text-sm text-blue-400">
              {user.role || "No Role"}
            </p>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-2">
          {user.role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/assignments"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Assignments
              </Link>

              <Link
                to="/risks"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Risks
              </Link>

              <Link
                to="/controls"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Controls
              </Link>

              <Link
                to="/compliance"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Compliance
              </Link>

              <Link
                to="/reports"
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Reports
              </Link>
            </>
          )}

          {user.role === "Tester" && (
            <Link
              to="/tester-dashboard"
              className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Tester Dashboard
            </Link>
          )}

          {user.role === "Control Owner" && (
            <Link
              to="/owner-dashboard"
              className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Owner Dashboard
            </Link>
          )}
        </nav>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}