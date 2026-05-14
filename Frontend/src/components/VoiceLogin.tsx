// import React, { useEffect, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const VoiceLogin = () => {
//   const navigate = useNavigate();

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const [step, setStep] = useState<"username" | "password">(
//     "username"
//   );

//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState(
//     "Click microphone and say your name"
//   );

//   useEffect(() => {
//     if (!transcript) return;

//     if (step === "username") {
//       setUsername(transcript);

//       setMessage(
//         `Hello ${transcript}. Now say your password.`
//       );

//       speechSynthesis.speak(
//         new SpeechSynthesisUtterance(
//           `Hello ${transcript}. Please say your password.`
//         )
//       );

//       resetTranscript();

//       setStep("password");
//     } else {
//       loginUser(username, transcript);

//       resetTranscript();
//     }
//   }, [transcript]);

//   const startListening = () => {
//     SpeechRecognition.startListening({
//       continuous: false,
//       language: "en-US",
//     });
//   };

//   const loginUser = async (
//     username: string,
//     password: string
//   ) => {
//     try {
//       setMessage("Authenticating...");

//       const response = await axios.post(
//         "https://grc-dahboard.onrender.com/api/auth/login",
//         {
//           name: username,
//           password,
//         }
//       );

//       localStorage.setItem(
//         "token",
//         response.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.data.user)
//       );

//       speechSynthesis.speak(
//         new SpeechSynthesisUtterance(
//           `Welcome ${username}`
//         )
//       );

//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);

//       setMessage("Authentication failed.");

//       speechSynthesis.speak(
//         new SpeechSynthesisUtterance(
//           "Authentication failed"
//         )
//       );

//       setStep("username");
//       setUsername("");
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return (
//       <div>
//         Browser does not support speech recognition.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           🎤 AI Voice Login
//         </h1>

//         <button
//           onClick={startListening}
//           className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-semibold transition"
//         >
//           {listening
//             ? "Listening..."
//             : "Start Voice Login"}
//         </button>

//         <div className="mt-6 bg-gray-800 p-4 rounded-xl">
//           <p className="text-gray-400 text-sm mb-2">
//             Assistant
//           </p>

//           <p>{message}</p>
//         </div>

//         <div className="mt-4 text-sm text-gray-500">
//           Transcript: {transcript}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoiceLogin;





// import React, { useEffect, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const VoiceLogin = () => {
//   const navigate = useNavigate();

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [userRecognized, setUserRecognized] =
//     useState(false);

//   const [message, setMessage] = useState(
//     "Click microphone and say your name"
//   );

//   useEffect(() => {
//     if (!transcript || userRecognized) return;

//     setUsername(transcript);

//     setUserRecognized(true);

//     setMessage(
//       `Hello ${transcript}. Please enter your password.`
//     );

//     speechSynthesis.speak(
//       new SpeechSynthesisUtterance(
//         `Hello ${transcript}. Please enter your password.`
//       )
//     );

//     resetTranscript();
//   }, [transcript]);

//   const startListening = () => {
//     SpeechRecognition.startListening({
//       continuous: false,
//       language: "en-US",
//     });
//   };

//   const loginUser = async () => {
//     try {
//       setMessage("Authenticating...");

//       const response = await axios.post(
//         "https://grc-dahboard.onrender.com/api/auth/login",
//         {
//           name: username,
//           password,
//         }
//       );

//       localStorage.setItem(
//         "token",
//         response.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.data.user)
//       );

//       speechSynthesis.speak(
//         new SpeechSynthesisUtterance(
//           `Welcome ${username}`
//         )
//       );

//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);

//       setMessage("Authentication failed");

//       speechSynthesis.speak(
//         new SpeechSynthesisUtterance(
//           "Authentication failed"
//         )
//       );
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return (
//       <div>
//         Browser does not support speech recognition.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

//         <h1 className="text-3xl font-bold text-center mb-6">
//           🎤 AI Voice Login
//         </h1>

//         {!userRecognized && (
//           <button
//             onClick={startListening}
//             className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-semibold transition"
//           >
//             {listening
//               ? "Listening..."
//               : "Start Voice Login"}
//           </button>
//         )}

//         <div className="mt-6 bg-gray-800 p-4 rounded-xl">
//           <p className="text-gray-400 text-sm mb-2">
//             Assistant
//           </p>

//           <p>{message}</p>
//         </div>

//         <div className="mt-4 text-sm text-gray-500">
//           Transcript: {transcript}
//         </div>

//         {userRecognized && (
//           <div className="mt-6 space-y-4">

//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//               className="w-full rounded-xl border border-slate-700 bg-[#050816] px-5 py-4 text-white outline-none"
//             />

//             <button
//               onClick={loginUser}
//               className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-3 rounded-xl font-semibold"
//             >
//               Login
//             </button>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceLogin;



import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authApi";

const users = [
  "Admin",
  "Megha Thomas",
  "Neha Kunche Naidu",
  "Satyam Chadha",
  "Yogesh ES",
  "Nidhi Umesh",
  "Sudarshan Singh",
  "Mitali Hegde",
  "Ponnakka",
];

const aliases: Record<string, string[]> = {
  Admin: ["admin"],

  "Megha Thomas": [
    "megha",
    "mega",
    "me",
    "megha thomas",
  ],

  "Neha Kunche Naidu": [
    "neha",
    "naidu",
    "ne",
    "neha naidu",
  ],

  "Satyam Chadha": [
    "satyam",
    "satya",
    "chadha",
  ],

  "Yogesh ES": [
    "yogesh",
    "yogi",
  ],

  "Nidhi Umesh": [
    "nidhi",
    "umesh",
  ],

  "Sudarshan Singh": [
    "sudarshan",
    "darshan",
    "sudar",
    "sudarshan singh",
  ],

  "Mitali Hegde": [
    "mitali",
    "mita",
    "hegde",
  ],

  Ponnakka: [
    "ponnakka",
    "pona",
  ],
};

const VoiceLogin = () => {
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userRecognized, setUserRecognized] =
    useState(false);

  const [message, setMessage] = useState(
    "Click microphone and say your name"
  );

  // RESET PAGE
  useEffect(() => {
    setUserRecognized(false);

    setUsername("");

    setPassword("");

    localStorage.removeItem("voiceUser");
  }, []);

  // VOICE MATCHING
  useEffect(() => {
    if (!transcript || userRecognized) return;

    const lowerTranscript =
      transcript.toLowerCase();

    const cleanTranscript =
      lowerTranscript.replace(/\s/g, "").trim();

    // MATCH USERS
    const matchedUser = users.find((user) => {
      const aliasList = aliases[user] || [];

      return aliasList.some((alias) =>
        cleanTranscript.includes(
          alias.toLowerCase().replace(/\s/g, "")
        )
      );
    });

    if (matchedUser) {
      setUsername(matchedUser);

      localStorage.setItem(
        "voiceUser",
        matchedUser
      );

      setUserRecognized(true);

      setMessage(
        `Hello ${matchedUser}. Please enter your password.`
      );

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `Hello ${matchedUser}. Please enter your password.`
        )
      );
    } else {
      setMessage(
        `User not recognized. You said: "${transcript}"`
      );

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          "User not recognized. Please try again."
        )
      );
    }

    resetTranscript();
  }, [transcript]);

  // START LISTENING
  const startListening = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      setMessage("Authenticating...");

      const user = await loginUser(
        username,
        password
      );

      localStorage.removeItem("voiceUser");

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "ownerName",
        user.name || ""
      );

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `Welcome ${username}`
        )
      );

      // ROLE NAVIGATION
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else if (user.role === "Tester") {
        navigate("/tester-dashboard");
      } else {
        navigate("/owner-dashboard");
      }
    } catch (error) {
      console.error(error);

      setMessage("Authentication failed");

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          "Authentication failed"
        )
      );
    }
  };

  // BROWSER SUPPORT
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-white p-10">
        Browser does not support speech
        recognition.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          🎤 AI Voice Login
        </h1>

        {/* VOICE SECTION */}
        {!userRecognized && (
          <>
            <button
              onClick={startListening}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-semibold transition"
            >
              {listening
                ? "Listening..."
                : "Start Voice Login"}
            </button>

            {/* MANUAL USER SELECT */}
            <div className="mt-4">
              <select
                onChange={(e) => {
                  setUsername(e.target.value);

                  setUserRecognized(true);

                  localStorage.setItem(
                    "voiceUser",
                    e.target.value
                  );

                  setMessage(
                    `Hello ${e.target.value}. Please enter your password.`
                  );
                }}
                className="w-full rounded-xl border border-slate-700 bg-[#050816] px-5 py-4 text-white"
              >
                <option value="">
                  Or Select User Manually
                </option>

                {users.map((user) => (
                  <option
                    key={user}
                    value={user}
                  >
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* ASSISTANT */}
        <div className="mt-6 bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm mb-2">
            Assistant
          </p>

          <p>{message}</p>
        </div>

        {/* TRANSCRIPT */}
        <div className="mt-4 text-sm text-gray-500">
          Transcript: {transcript}
        </div>

        {/* LOGIN SECTION */}
        {userRecognized && (
          <div className="mt-6 space-y-4">

            <div className="bg-gray-800 p-3 rounded-xl">
              Logged in as:
              <span className="font-bold ml-2 text-cyan-400">
                {username}
              </span>
            </div>

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-[#050816] px-5 py-4 text-white outline-none"
            />

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Login
            </button>

            {/* RESET BUTTON */}
            <button
              onClick={() => {
                setUserRecognized(false);

                setUsername("");

                setPassword("");

                resetTranscript();

                localStorage.removeItem(
                  "voiceUser"
                );

                setMessage(
                  "Click microphone and say your name"
                );
              }}
              className="w-full bg-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-600"
            >
              Reset
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceLogin;