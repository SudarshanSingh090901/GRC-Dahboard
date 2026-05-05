export type ControlAssignment = {
    id: number;
    ownerName: string;
    testerName: string;
    framework: string;
    controlId: string;
    status: "Assigned" | "Under Review" | "Tested";
  };
  
  export const controlAssignments: ControlAssignment[] = [];