// frontend/src/services/assignmentApi.ts

const API_BASE = "http://localhost:5000/api/assignments";

export async function getTesterAssignments(testerName: string) {
  const response = await fetch(
    `${API_BASE}/tester/${encodeURIComponent(testerName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to load tester assignments");
  }

  return response.json();
}

export async function submitTesterReview(formData: FormData) {
  const response = await fetch(`${API_BASE}/tester-review`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit tester review");
  }

  return response.json();
}

export async function getOwnerAssignments(ownerName: string) {
  const response = await fetch(
    `${API_BASE}/owner/${encodeURIComponent(ownerName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to load owner assignments");
  }

  return response.json();
}

export async function ownerDecision(
  assignmentId: number,
  ownerStatus: string,
  ownerRemarks: string
) {
  const response = await fetch(`${API_BASE}/owner-decision`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assignmentId,
      ownerStatus,
      ownerRemarks,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save owner decision");
  }

  return response.json();
}