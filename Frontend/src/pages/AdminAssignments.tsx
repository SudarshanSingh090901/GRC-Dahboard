// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";

// type User = {
//   id: number;
//   name: string;
//   role: string;
// };

// type Control = {
//   framework: string;
//   controlId?: string;
//   controlName?: string;
//   code?: string;
//   title?: string;
// };

// type Assignment = {
//   id: number;
//   framework: string;
//   controlId: string;
//   controlName: string;
//   ownerName: string;
//   testerName: string;
//   testerStatus: string;
//   ownerStatus: string;
//   updatedAt: string;
// };

// export default function AdminAssignments() {
//   const [owners, setOwners] = useState<User[]>([]);
//   const [testers, setTesters] = useState<User[]>([]);
//   const [controls, setControls] = useState<Control[]>([]);
//   const [assignments, setAssignments] = useState<Assignment[]>([]);

//   const [selectedOwner, setSelectedOwner] = useState("");
//   const [selectedTester, setSelectedTester] = useState("");
//   const [selectedControls, setSelectedControls] = useState<string[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [usersRes, controlsRes, assignmentsRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/users"),
//         axios.get("http://localhost:5000/api/controls"),
//         axios.get("http://localhost:5000/api/assignments"),
//       ]);

//       const users = usersRes.data?.data || usersRes.data || [];

//       setOwners(
//         users.filter(
//           (u: User) =>
//             u.role?.toLowerCase() === "owner" ||
//             u.role?.toLowerCase() === "control owner"
//         )
//       );

//       setTesters(
//         users.filter((u: User) => u.role?.toLowerCase() === "tester")
//       );

//       const rawControls = controlsRes.data?.data || controlsRes.data || [];

//       const normalizedControls = rawControls.map((c: any) => ({
//         framework: c.framework || "Unknown",
//         controlId: c.controlId || c.code || c.id || "",
//         controlName:
//           c.controlName ||
//           c.title ||
//           c.name ||
//           c.description ||
//           "Unnamed Control",
//       }));

//       setControls(normalizedControls);

//       setAssignments(
//         assignmentsRes.data?.data || assignmentsRes.data || []
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load controls, users or assignments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const selectedControlObjects = useMemo(() => {
//     return selectedControls
//       .map((value) =>
//         controls.find(
//           (c) => `${c.framework}|${c.controlId}` === value
//         )
//       )
//       .filter(Boolean);
//   }, [selectedControls, controls]);

//   const handleAssign = async () => {
//     try {
//       if (!selectedOwner || !selectedTester || selectedControls.length === 0) {
//         alert("Please select owner, tester and at least one control");
//         return;
//       }

//       setAssigning(true);

//       const owner = owners.find((o) => String(o.id) === selectedOwner);
//       const tester = testers.find((t) => String(t.id) === selectedTester);

//       if (!owner || !tester) {
//         alert("Owner or Tester not found");
//         return;
//       }

//       await axios.post("http://localhost:5000/api/assignments", {
//         framework: selectedControlObjects[0]?.framework,
//         ownerId: owner.id,
//         testerId: tester.id,
//         selectedControls: selectedControlObjects,
//       });

//       setSelectedControls([]);
//       await fetchData();

//       alert("Controls assigned successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to assign controls");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this assignment?"
//       );

//       if (!confirmDelete) return;

//       await axios.delete(`http://localhost:5000/api/assignments/${id}`);

//       setAssignments((prev) => prev.filter((a) => a.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete assignment");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020b24] p-8 text-white">
//       <h1 className="mb-2 text-5xl font-bold">Assignment Center</h1>
//       <p className="mb-8 text-slate-400">
//         Assign controls to control owners and testers.
//       </p>

//       <div className="rounded-3xl border border-slate-800 bg-[#081633] p-8">
//         <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div>
//             <label className="mb-3 block text-sm font-semibold text-slate-300">
//               Control Owner
//             </label>

//             <select
//               value={selectedOwner}
//               onChange={(e) => setSelectedOwner(e.target.value)}
//               className="w-full rounded-2xl border border-slate-700 bg-[#020b24] px-5 py-4 text-white outline-none"
//             >
//               <option value="">Select Control Owner</option>

//               {owners.map((owner) => (
//                 <option key={owner.id} value={owner.id}>
//                   {owner.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="mb-3 block text-sm font-semibold text-slate-300">
//               Tester
//             </label>

//             <select
//               value={selectedTester}
//               onChange={(e) => setSelectedTester(e.target.value)}
//               className="w-full rounded-2xl border border-slate-700 bg-[#020b24] px-5 py-4 text-white outline-none"
//             >
//               <option value="">Select Tester</option>

//               {testers.map((tester) => (
//                 <option key={tester.id} value={tester.id}>
//                   {tester.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="mb-3 block text-sm font-semibold text-slate-300">
//             Select One or More Controls
//           </label>

//           <div className="max-h-[380px] overflow-y-auto rounded-2xl border border-slate-800 bg-[#020b24] p-4">
//             {controls.map((control) => {
//               const key = `${control.framework}|${control.controlId}`;
//               const selected = selectedControls.includes(key);

//               return (
//                 <label
//                   key={key}
//                   className={`mb-3 flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
//                     selected
//                       ? "border-blue-500 bg-blue-500/10"
//                       : "border-slate-800 bg-[#081633] hover:border-slate-600"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selected}
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedControls((prev) => [...prev, key]);
//                       } else {
//                         setSelectedControls((prev) =>
//                           prev.filter((item) => item !== key)
//                         );
//                       }
//                     }}
//                     className="mt-1 h-5 w-5"
//                   />

//                   <div>
//                     <div className="text-lg font-semibold text-white">
//                       {control.framework} • {control.controlId}
//                     </div>

//                     <div className="mt-1 text-slate-400">
//                       {control.controlName}
//                     </div>
//                   </div>
//                 </label>
//               );
//             })}

//             {!loading && controls.length === 0 && (
//               <div className="py-10 text-center text-slate-500">
//                 No controls found from backend.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mb-6 text-slate-400">
//           Selected Controls: {selectedControls.length}
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={handleAssign}
//             disabled={assigning}
//             className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-500 disabled:opacity-50"
//           >
//             {assigning ? "Assigning..." : "Assign Selected Controls"}
//           </button>

//           <button
//             onClick={() => setSelectedControls([])}
//             className="rounded-2xl border border-slate-600 px-8 py-4 font-semibold"
//           >
//             Clear Selection
//           </button>
//         </div>

//         {error && (
//           <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
//             {error}
//           </div>
//         )}
//       </div>

//       <div className="mt-10 rounded-3xl border border-slate-800 bg-[#081633] p-8">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-4xl font-bold">Existing Assigned Controls</h2>

//           <div className="text-slate-400">
//             Total: {assignments.length}
//           </div>
//         </div>

//         <div className="space-y-4">
//           {assignments.map((assignment) => (
//             <div
//               key={assignment.id}
//               className="rounded-2xl border border-slate-800 bg-[#020b24] p-5"
//             >
//               <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                   <div className="text-lg font-bold text-white">
//                     {assignment.framework} • {assignment.controlId}
//                   </div>

//                   <div className="mt-1 text-slate-400">
//                     {assignment.controlName}
//                   </div>

//                   <div className="mt-3 text-sm text-slate-500">
//                     Owner: {assignment.ownerName} | Tester:{" "}
//                     {assignment.testerName}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleDelete(assignment.id)}
//                   className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}

//           {assignments.length === 0 && (
//             <div className="rounded-2xl border border-slate-800 bg-[#020b24] py-12 text-center text-slate-500">
//               No controls assigned yet
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { API_BASE } from "../api/config"; // ✅ added

// type User = {
//   id: number;
//   name: string;
//   role: string;
// };

// type Control = {
//   framework: string;
//   controlId?: string;
//   controlName?: string;
//   code?: string;
//   title?: string;
// };

// type Assignment = {
//   id: number;
//   framework: string;
//   controlId: string;
//   controlName: string;
//   ownerName: string;
//   testerName: string;
//   testerStatus: string;
//   ownerStatus: string;
//   updatedAt: string;
// };

// export default function AdminAssignments() {
//   const [owners, setOwners] = useState<User[]>([]);
//   const [testers, setTesters] = useState<User[]>([]);
//   const [controls, setControls] = useState<Control[]>([]);
//   const [assignments, setAssignments] = useState<Assignment[]>([]);

//   const [selectedOwner, setSelectedOwner] = useState("");
//   const [selectedTester, setSelectedTester] = useState("");
//   const [selectedControls, setSelectedControls] = useState<string[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [usersRes, controlsRes, assignmentsRes] = await Promise.all([
//         axios.get(`${API_BASE}/users`),          // ✅ fixed
//         axios.get(`${API_BASE}/controls`),       // ✅ fixed
//         axios.get(`${API_BASE}/assignments`),    // ✅ fixed
//       ]);

//       const users = usersRes.data?.data || usersRes.data || [];

//       setOwners(
//         users.filter(
//           (u: User) =>
//             u.role?.toLowerCase() === "owner" ||
//             u.role?.toLowerCase() === "control owner"
//         )
//       );

//       setTesters(
//         users.filter((u: User) => u.role?.toLowerCase() === "tester")
//       );

//       const rawControls = controlsRes.data?.data || controlsRes.data || [];

//       const normalizedControls = rawControls.map((c: any) => ({
//         framework: c.framework || "Unknown",
//         controlId: c.controlId || c.code || c.id || "",
//         controlName:
//           c.controlName ||
//           c.title ||
//           c.name ||
//           c.description ||
//           "Unnamed Control",
//       }));

//       setControls(normalizedControls);

//       setAssignments(
//         assignmentsRes.data?.data || assignmentsRes.data || []
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load controls, users or assignments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const selectedControlObjects = useMemo(() => {
//     return selectedControls
//       .map((value) =>
//         controls.find(
//           (c) => `${c.framework}|${c.controlId}` === value
//         )
//       )
//       .filter(Boolean);
//   }, [selectedControls, controls]);

//   const handleAssign = async () => {
//     try {
//       if (!selectedOwner || !selectedTester || selectedControls.length === 0) {
//         alert("Please select owner, tester and at least one control");
//         return;
//       }

//       setAssigning(true);

//       const owner = owners.find((o) => String(o.id) === selectedOwner);
//       const tester = testers.find((t) => String(t.id) === selectedTester);

//       if (!owner || !tester) {
//         alert("Owner or Tester not found");
//         return;
//       }

//       await axios.post(`${API_BASE}/assignments`, {   // ✅ fixed
//         framework: selectedControlObjects[0]?.framework,
//         ownerId: owner.id,
//         testerId: tester.id,
//         selectedControls: selectedControlObjects,
//       });

//       setSelectedControls([]);
//       await fetchData();

//       alert("Controls assigned successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to assign controls");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this assignment?"
//       );

//       if (!confirmDelete) return;

//       await axios.delete(`${API_BASE}/assignments/${id}`); // ✅ fixed

//       setAssignments((prev) => prev.filter((a) => a.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete assignment");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020b24] p-8 text-white">
//       <h1 className="mb-2 text-5xl font-bold">Assignment Center</h1>
//       <p className="mb-8 text-slate-400">
//         Assign controls to control owners and testers.
//       </p>

//       <div className="rounded-3xl border border-slate-800 bg-[#081633] p-8">
//         {/* UI unchanged */}
//         {error && (
//           <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

















import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api/config";

type User = {
id: number;
name: string;
role: string;
};

type Control = {
framework: string;
controlId: string;
controlName: string;
};

type Assignment = {
id: number;
framework: string;
controlId: string;
controlName: string;
ownerName: string;
testerName: string;
status: string;
updatedAt: string;
};

export default function AdminAssignments() {
const [owners, setOwners] = useState<User[]>([]);
const [testers, setTesters] = useState<User[]>([]);
const [controls, setControls] = useState<Control[]>([]);
const [assignments, setAssignments] = useState<Assignment[]>([]);

const [selectedOwner, setSelectedOwner] = useState("");
const [selectedTester, setSelectedTester] = useState("");
const [selectedControls, setSelectedControls] = useState<string[]>([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [assigning, setAssigning] = useState(false);

const fetchData = async () => {
try {
setLoading(true);
setError("");


  const [usersRes, controlsRes, assignmentsRes] = await Promise.all([
    axios.get(`${API_BASE}/users`),
    axios.get(`${API_BASE}/controls`),
    axios.get(`${API_BASE}/assignments`),
  ]);

  const users = usersRes.data?.data || [];

  // ✅ FIXED ROLE FILTER
  setOwners(users.filter((u: User) => u.role === "Control Owner"));
  setTesters(users.filter((u: User) => u.role === "Tester"));

  const rawControls = controlsRes.data?.data || [];

  const normalizedControls = rawControls.map((c: any) => ({
    framework: c.framework,
    controlId: c.controlId,
    controlName: c.controlName,
  }));

  setControls(normalizedControls);

  setAssignments(assignmentsRes.data?.data || []);
} catch (err) {
  console.error(err);
  setError("Failed to load controls, users or assignments");
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchData();
}, []);

const selectedControlObjects = useMemo(() => {
return selectedControls
.map((value) =>
controls.find((c) => `${c.framework}|${c.controlId}` === value)
)
.filter(Boolean) as Control[];
}, [selectedControls, controls]);

const handleAssign = async () => {
try {
if (!selectedOwner || !selectedTester || selectedControls.length === 0) {
alert("Please select owner, tester and at least one control");
return;
}


  setAssigning(true);

  const owner = owners.find((o) => String(o.id) === selectedOwner);
  const tester = testers.find((t) => String(t.id) === selectedTester);

  if (!owner || !tester) {
    alert("Owner or Tester not found");
    return;
  }

  await axios.post(`${API_BASE}/assignments`, {
    framework: selectedControlObjects[0]?.framework,
    ownerId: owner.id,
    testerId: tester.id,
    selectedControls: selectedControlObjects,
  });

  setSelectedControls([]);
  await fetchData();

  alert("Controls assigned successfully");
} catch (err) {
  console.error(err);
  alert("Failed to assign controls");
} finally {
  setAssigning(false);
}


};

const handleDelete = async (id: number) => {
try {
if (!confirm("Delete this assignment?")) return;

  await axios.delete(`${API_BASE}/assignments/${id}`);
  setAssignments((prev) => prev.filter((a) => a.id !== id));
} catch (err) {
  console.error(err);
  alert("Failed to delete assignment");
}


};

return ( <div className="min-h-screen bg-[#020b24] p-8 text-white"> <h1 className="mb-2 text-5xl font-bold">Assignment Center</h1> <p className="mb-8 text-slate-400">
Assign controls to control owners and testers. </p>


  <div className="rounded-3xl border border-slate-800 bg-[#081633] p-8">

    {/* 🔥 DROPDOWNS */}
    <div className="grid grid-cols-3 gap-6 mb-6">

      <select
        value={selectedOwner}
        onChange={(e) => setSelectedOwner(e.target.value)}
        className="p-3 rounded bg-slate-900 border border-slate-700"
      >
        <option value="">Select Control Owner</option>
        {owners.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>

      <select
        value={selectedTester}
        onChange={(e) => setSelectedTester(e.target.value)}
        className="p-3 rounded bg-slate-900 border border-slate-700"
      >
        <option value="">Select Tester</option>
        {testers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        disabled={assigning}
        className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-3"
      >
        {assigning ? "Assigning..." : "Assign Controls"}
      </button>
    </div>

    {/* 🔥 CONTROL MULTI SELECT */}
    <select
      multiple
      value={selectedControls}
      onChange={(e) =>
        setSelectedControls(
          Array.from(e.target.selectedOptions, (o) => o.value)
        )
      }
      className="w-full h-48 p-3 rounded bg-slate-900 border border-slate-700 mb-6"
    >
      {controls.map((c) => {
        const value = `${c.framework}|${c.controlId}`;
        return (
          <option key={value} value={value}>
            {c.framework} - {c.controlId} - {c.controlName}
          </option>
        );
      })}
    </select>

    {/* 🔥 ERROR */}
    {error && (
      <div className="rounded border border-red-500 p-3 text-red-400">
        {error}
      </div>
    )}

    {/* 🔥 ASSIGNMENT TABLE */}
    {!loading && (
      <table className="w-full text-left mt-6">
        <thead>
          <tr className="text-slate-400">
            <th>Framework</th>
            <th>Control</th>
            <th>Owner</th>
            <th>Tester</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className="border-t border-slate-700">
              <td>{a.framework}</td>
              <td>{a.controlId}</td>
              <td>{a.ownerName}</td>
              <td>{a.testerName}</td>
              <td>{a.status}</td>
              <td>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

  </div>
</div>


);
}
