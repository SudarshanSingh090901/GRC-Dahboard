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


// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ better navigation
// import { loginUser } from "../services/authApi";

// export default function Login() {
//   const navigate = useNavigate(); // ✅ added

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);

//       const user = await loginUser(username, password);

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("ownerName", user.name || "");

//       // ✅ cleaner routing
//       if (user.role === "Admin") {
//         navigate("/dashboard");
//       } else if (user.role === "Tester") {
//         navigate("/tester-dashboard");
//       } else {
//         navigate("/owner-dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Invalid username or password");
//     } finally {
//       setLoading(false);
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
//             disabled={loading}
//             className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
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
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

export default function Login() {
  const navigate = useNavigate();

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
    <div className="min-h-screen flex bg-[#050816] overflow-hidden">
      
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-14 bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-[#1b0d3b]">

        {/* Glow Effects */}
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-white">GRC & </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Compliance
            </span>
          </h1>

          <p className="mt-3 text-xl text-slate-400">
            Govern • Risk • Compliance
          </p>
        </div>

        {/* Center Shield */}
        <div className="relative z-10 flex flex-col items-center justify-center">

          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500/30 blur-3xl"></div>

            <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.4)]">
              <div className="text-8xl">🛡️</div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6">

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl">
              <p className="text-slate-400">Compliance Score</p>
              <h2 className="mt-2 text-4xl font-bold text-cyan-400">
                92%
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl">
              <p className="text-slate-400">Open Risks</p>
              <h2 className="mt-2 text-4xl font-bold text-red-400">
                12
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl">
              <p className="text-slate-400">Controls</p>
              <h2 className="mt-2 text-4xl font-bold text-green-400">
                256
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl">
              <p className="text-slate-400">Audit Findings</p>
              <h2 className="mt-2 text-4xl font-bold text-yellow-400">
                7
              </h2>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-8 text-slate-400">
          <div>🔒 Secure by Design</div>
          <div>📊 Real-Time Insights</div>
          <div>🧾 Audit Ready</div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2 bg-[#0a1025]">

        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/70 p-10 shadow-[0_0_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">

          <div className="mb-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-4xl shadow-lg shadow-cyan-500/30">
              🛡️
            </div>

            <h2 className="mt-6 text-4xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="mt-3 text-slate-400">
              Sign in to continue to your GRC Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-2xl border border-slate-700 bg-[#050816] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
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
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-700 bg-[#050816] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-[#050816] p-5 text-sm text-slate-400">
            <p className="font-semibold text-white">
              Login Instructions
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Use the username assigned to you by the administrator.
              </li>

              <li>
                Password format: YourName@123
              </li>

              <li>
                Example:
                Sudarshan Singh → SudarshanSingh@123
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}