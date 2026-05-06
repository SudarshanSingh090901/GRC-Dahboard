// import { Request, Response } from "express";
// import { prisma } from "../lib/prisma";

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;

//     const user = await prisma.user.findFirst({
//       where: {
//         name: username,
//         password: password
//       }
//     });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid username or password"
//       });
//     }

//     return res.json({
//       success: true,
//       data: {
//         id: user.id,
//         name: user.name,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Login failed"
//     });
//   }
// };


// import { Request, Response } from "express";
// import { prisma } from "../lib/prisma";

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;

//     console.log("LOGIN INPUT:", username, password);

//     // 🔎 Step 1: Find user by username ONLY
//     const user = await prisma.user.findFirst({
//       where: {
//         name: {
//           equals: username,
//           mode: "insensitive", // 🔥 handles case mismatch
//         },
//       },
//     });

//     console.log("USER FOUND:", user);

//     // ❌ User not found
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Password mismatch
//     if (user.password !== password) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid username or password",
//       });
//     }

//     // ✅ Success
//     return res.json({
//       success: true,
//       data: {
//         id: user.id,
//         name: user.name,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Login failed",
//     });
//   }
// };



// import { Request, Response } from "express";
// import { prisma } from "../lib/prisma";

// // ⏱️ Utility: timeout wrapper to avoid hanging queries
// const withTimeout = async <T>(promise: Promise<T>, ms = 5000): Promise<T> => {
//   return new Promise((resolve, reject) => {
//     const timer = setTimeout(() => {
//       reject(new Error("Database timeout"));
//     }, ms);

//     promise
//       .then((res) => {
//         clearTimeout(timer);
//         resolve(res);
//       })
//       .catch((err) => {
//         clearTimeout(timer);
//         reject(err);
//       });
//   });
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;

//     console.log("🔐 LOGIN REQUEST:", username);

//     // 🔎 Step 1: Find user with timeout protection
//     let user;
//     try {
//       user = await withTimeout(
//         prisma.user.findFirst({
//           where: {
//             name: {
//               equals: username,
//               mode: "insensitive",
//             },
//           },
//         }),
//         5000 // 5 sec timeout
//       );
//     } catch (dbError) {
//       console.error("❌ DB ERROR:", dbError);
//       return res.status(500).json({
//         success: false,
//         message: "Database connection issue",
//       });
//     }

//     console.log("👤 USER FOUND:", user);

//     // ❌ User not found
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Password mismatch
//     if (user.password !== password) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid username or password",
//       });
//     }

//     // ✅ Success
//     return res.status(200).json({
//       success: true,
//       data: {
//         id: user.id,
//         name: user.name,
//         role: user.role,
//       },
//     });

//   } catch (error) {
//     console.error("🔥 LOGIN ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };









import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ⏱️ Utility: timeout wrapper
const withTimeout = async <T>(promise: Promise<T>, ms = 5000): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Database timeout"));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    // ✅ FIX: Trim input (important)
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    console.log("🔐 LOGIN RAW:", req.body.username);
    console.log("🔐 LOGIN TRIMMED:", username);

    let user;

    try {
      // ✅ FIX: Use contains instead of equals (handles small mismatches)
      user = await withTimeout(
        prisma.user.findFirst({
          where: {
            name: {
              contains: username,
              mode: "insensitive",
            },
          },
        }),
        5000
      );
    } catch (dbError) {
      console.error("❌ DB ERROR:", dbError);
      return res.status(500).json({
        success: false,
        message: "Database connection issue",
      });
    }

    console.log("👤 USER FOUND:", user);

    // ❌ User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ Password mismatch
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // ✅ Success
    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};