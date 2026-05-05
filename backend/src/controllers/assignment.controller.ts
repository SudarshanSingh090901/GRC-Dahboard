import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const assignControls = async (req: Request, res: Response) => {
  try {
    const {
      framework,
      ownerId,
      testerId,
      ownerName,
      testerName,
      selectedControls,
      controls,
      controlId,
      controlName,
    } = req.body;

    // Support both old and new frontend payloads
    let controlList: any[] = [];

    if (selectedControls && Array.isArray(selectedControls)) {
      controlList = selectedControls;
    } else if (controls && Array.isArray(controls)) {
      controlList = controls;
    } else if (controlId) {
      controlList = [
        {
          controlId,
          controlName,
        },
      ];
    }

    // Find owner / tester either by id or by name
    let owner = null;
    let tester = null;

    if (ownerId) {
      owner = await prisma.user.findUnique({
        where: {
          id: Number(ownerId),
        },
      });
    } else if (ownerName) {
      owner = await prisma.user.findFirst({
        where: {
          name: ownerName,
        },
      });
    }

    if (testerId) {
      tester = await prisma.user.findUnique({
        where: {
          id: Number(testerId),
        },
      });
    } else if (testerName) {
      tester = await prisma.user.findFirst({
        where: {
          name: testerName,
        },
      });
    }

    if (!framework) {
      return res.status(400).json({
        success: false,
        message: "Framework is required",
      });
    }

    if (!owner || !tester) {
      return res.status(400).json({
        success: false,
        message: "Valid owner and tester are required",
      });
    }

    if (!controlList || controlList.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one control must be selected",
      });
    }

    const createdAssignments = await Promise.all(
      controlList.map(async (control: any) => {
        const finalControlId =
          control.controlId ||
          control.code ||
          control.id?.toString() ||
          "";

        const finalControlName =
          control.controlName ||
          control.name ||
          control.title ||
          control.description ||
          "Unnamed Control";

        // Prevent duplicate assignment
        const existing = await prisma.assignment.findFirst({
          where: {
            framework,
            controlId: finalControlId,
            ownerName: owner!.name,
            testerName: tester!.name,
          },
        });

        if (existing) {
          return existing;
        }

        return prisma.assignment.create({
          data: {
            framework,
            controlId: finalControlId,
            controlName: finalControlName,

            ownerName: owner!.name,
            testerName: tester!.name,

            status: "Assigned",
            testerStatus: "Pending",
            ownerStatus: "Pending",
            testerRemarks: "",
            ownerRemarks: "",

            // Multiple evidence items stored as JSON string
            evidenceFile: JSON.stringify([]),
          },
        });
      })
    );

    return res.status(201).json({
      success: true,
      message: `${createdAssignments.length} control(s) assigned successfully`,
      data: createdAssignments,
    });
  } catch (error) {
    console.error("ASSIGN CONTROL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign controls",
    });
  }
};

export const getAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.error("GET ASSIGNMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
};

export const getAssignmentsForTester = async (
  req: Request,
  res: Response
) => {
  try {
    const { testerName } = req.params;

    const assignments = await prisma.assignment.findMany({
      where: {
        testerName,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.error("GET TESTER ASSIGNMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tester assignments",
    });
  }
};

export const getAssignmentsForOwner = async (
  req: Request,
  res: Response
) => {
  try {
    const { ownerName } = req.params;

    const assignments = await prisma.assignment.findMany({
      where: {
        ownerName,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.error("GET OWNER ASSIGNMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch owner assignments",
    });
  }
};

export const testerSubmitEvidence = async (
  req: Request,
  res: Response
) => {
  try {
    const assignmentId = Number(req.params.id);

    const { testerStatus, testerRemarks, evidenceFile } = req.body;

    const existingAssignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!existingAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    let existingEvidence: any[] = [];

    try {
      existingEvidence = existingAssignment.evidenceFile
        ? JSON.parse(existingAssignment.evidenceFile)
        : [];
    } catch {
      existingEvidence = [];
    }

    const newEvidence = Array.isArray(evidenceFile) ? evidenceFile : [];

    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        testerStatus: testerStatus || "Implemented",
        testerRemarks: testerRemarks || "",
        evidenceFile: JSON.stringify([...existingEvidence, ...newEvidence]),
        status: "Submitted To Owner",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Evidence submitted successfully",
      data: updatedAssignment,
    });
  } catch (error) {
    console.error("TESTER SUBMIT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit evidence",
    });
  }
};

export const ownerReviewAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const assignmentId = Number(req.params.id);

    const { ownerStatus, ownerRemarks } = req.body;

    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        ownerStatus,
        ownerRemarks: ownerRemarks || "",
        status:
          ownerStatus === "Approved"
            ? "Completed"
            : ownerStatus === "Rejected"
            ? "Returned To Tester"
            : "Pending Owner Review",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Owner review submitted successfully",
      data: updatedAssignment,
    });
  } catch (error) {
    console.error("OWNER REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit owner review",
    });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentId = Number(req.params.id);

    const existing = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    await prisma.assignment.delete({
      where: {
        id: assignmentId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ASSIGNMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
    });
  }
};