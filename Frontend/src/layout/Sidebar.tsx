import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldAlert,
  ClipboardCheck,
  BarChart3,
  FileText,
  Upload,
  Users,
  SearchCheck
} from "lucide-react";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const menuItems = [
  ...(user.role === "Admin"
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard
        },
        {
          name: "Risks",
          path: "/risks",
          icon: ShieldAlert
        },
        {
          name: "Controls",
          path: "/controls",
          icon: ClipboardCheck
        },
        {
          name: "Compliance",
          path: "/compliance",
          icon: BarChart3
        },
        {
          name: "Reports",
          path: "/reports",
          icon: FileText
        },
        {
          name: "Assignments",
          path: "/assignments",
          icon: Users
        }
      ]
    : []),

  ...(user.role === "Control Owner"
    ? [
        {
          name: "Owner Dashboard",
          path: "/owner-dashboard",
          icon: Upload
        }
      ]
    : []),

  ...(user.role === "Tester"
    ? [
        {
          name: "Tester Dashboard",
          path: "/tester-dashboard",
          icon: SearchCheck
        }
      ]
    : [])
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold text-white">
          Enterprise GRC
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Governance, Risk & Compliance
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}