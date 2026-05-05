export const riskData = [
    {
      id: "R-001",
      name: "Unauthorized customer data access",
      category: "Privacy",
      severity: "Critical",
      status: "Open",
      framework: ["ISO 27001", "DPDPA 2023", "NIST CSF"]
    },
    {
      id: "R-002",
      name: "AI model bias in recommendation engine",
      category: "AI Governance",
      severity: "High",
      status: "Mitigated",
      framework: ["ISO 42001"]
    },
    {
      id: "R-003",
      name: "Weak privileged access controls",
      category: "Cyber Security",
      severity: "High",
      status: "In Progress",
      framework: ["ISO 27001", "NIST CSF"]
    }
  ];
  
  export const controlData = {
    "ISO 27001": {
      total: 93,
      implemented: 85
    },
    "ISO 42001": {
      total: 38,
      implemented: 28
    },
    "DPDPA 2023": {
      total: 20,
      implemented: 16
    },
    "NIST CSF": {
      total: 108,
      implemented: 95
    }
  };