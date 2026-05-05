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


import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log("LOGIN INPUT:", username, password);

    // 🔎 Step 1: Find user by username ONLY
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: username,
          mode: "insensitive", // 🔥 handles case mismatch
        },
      },
    });

    console.log("USER FOUND:", user);

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
    return res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};