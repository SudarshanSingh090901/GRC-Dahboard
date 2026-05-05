// import { useState } from "react";
// import { loginUser } from "../services/authApi";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const user = await loginUser(username, password);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("ownerName", user.name || "");

//       if (user.role === "Admin") {
//         window.location.href = "/dashboard";
//       } else if (user.role === "Tester") {
//         window.location.href = "/tester-dashboard";
//       } else {
//         window.location.href = "/owner-dashboard";
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
//         <h1 className="text-center text-3xl font-bold text-white">
//           Enterprise GRC Portal
//         </h1>

//         <p className="mt-2 text-center text-slate-400">
//           Login using your assigned company username and password.
//         </p>

//         <form onSubmit={handleLogin} className="mt-8 space-y-6">
//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Username
//             </label>

//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter username"
//               className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-slate-300">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
//             />
//           </div>

//           {error && (
//             <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
//           <p className="font-semibold text-white">Login Instructions</p>

//           <ul className="mt-3 list-disc space-y-2 pl-5">
//             <li>Use the username assigned to you by the administrator.</li>
//             <li>Your password format is: YourName@123</li>
            
//             <li>
//               Example: if your username is Sudarshan Singh, password will be
//               SudarshanSingh@123
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ better navigation
import { loginUser } from "../services/authApi";

export default function Login() {
  const navigate = useNavigate(); // ✅ added

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const user = await loginUser(username, password);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ownerName", user.name || "");

      // ✅ cleaner routing
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else if (user.role === "Tester") {
        navigate("/tester-dashboard");
      } else {
        navigate("/owner-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Enterprise GRC Portal
        </h1>

        <p className="mt-2 text-center text-slate-400">
          Login using your assigned company username and password.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          <p className="font-semibold text-white">Login Instructions</p>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Use the username assigned to you by the administrator.</li>
            <li>Your password format is: YourName@123</li>
            <li>
              Example: if your username is Sudarshan Singh, password will be
              SudarshanSingh@123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}