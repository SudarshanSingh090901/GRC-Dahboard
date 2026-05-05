import { Request, Response } from "express";
import { frameworkControls } from "../data/frameworkControls";

export const getControls = (_req: Request, res: Response) => {
  try {
    let controls: any[] = [];

    // Case 1: frameworkControls is already an array
    if (Array.isArray(frameworkControls)) {
      controls = frameworkControls.map((control: any) => ({
        framework: control.framework || "Unknown",
        controlId:
          control.controlId ||
          control.code ||
          control.id ||
          "",
        controlName:
          control.controlName ||
          control.title ||
          control.name ||
          control.description ||
          "Unnamed Control",
      }));
    }

    // Case 2: frameworkControls is an object like { "ISO 27001": [...] }
    else if (
      frameworkControls &&
      typeof frameworkControls === "object"
    ) {
      Object.entries(frameworkControls).forEach(
        ([framework, frameworkArray]: [string, any]) => {
          if (Array.isArray(frameworkArray)) {
            frameworkArray.forEach((control: any) => {
              controls.push({
                framework,
                controlId:
                  control.controlId ||
                  control.code ||
                  control.id ||
                  "",
                controlName:
                  control.controlName ||
                  control.title ||
                  control.name ||
                  control.description ||
                  "Unnamed Control",
              });
            });
          }
        }
      );
    }

    return res.status(200).json({
      success: true,
      data: controls,
    });
  } catch (error) {
    console.error("GET CONTROLS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch controls",
      error,
    });
  }
};