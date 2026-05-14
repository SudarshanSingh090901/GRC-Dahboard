// frontend/src/routes/AppRoutes.tsx

// import { Navigate, Route, Routes } from "react-router-dom";
// import DashboardLayout from "../layout/DashboardLayout";
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import Compliance from "../pages/Compliance";
// import Reports from "../pages/Reports";
// import Risks from "../pages/Risks";
// import Controls from "../pages/Controls";
// import AdminAssignments from "../pages/AdminAssignments";
// import OwnerDashboard from "../pages/OwnerDashboard";
// import TesterDashboard from "../pages/TesterDashboard";

// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const user = localStorage.getItem("user");

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />

//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />
//       </Route>

//       <Route
//         path="/assignments"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<AdminAssignments />} />
//       </Route>

//       <Route
//         path="/owner-dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<OwnerDashboard />} />
//       </Route>

//       <Route
//         path="/tester-dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<TesterDashboard />} />
//       </Route>

//       <Route
//         path="/risks"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Risks />} />
//       </Route>

//       <Route
//         path="/controls"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Controls />} />
//       </Route>

//       <Route
//         path="/compliance"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Compliance />} />
//       </Route>

//       <Route
//         path="/reports"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Reports />} />
//       </Route>

//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }



import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Compliance from "../pages/Compliance";
import Reports from "../pages/Reports";
import Risks from "../pages/Risks";
import Controls from "../pages/Controls";
import AdminAssignments from "../pages/AdminAssignments";
import OwnerDashboard from "../pages/OwnerDashboard";
import TesterDashboard from "../pages/TesterDashboard";
import VoiceLogin from "../components/VoiceLogin";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/voice-login"
        element={<VoiceLogin />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminAssignments />} />
      </Route>

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerDashboard />} />
      </Route>

      <Route
        path="/tester-dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TesterDashboard />} />
      </Route>

      <Route
        path="/risks"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Risks />} />
      </Route>

      <Route
        path="/controls"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Controls />} />
      </Route>

      <Route
        path="/compliance"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Compliance />} />
      </Route>

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}