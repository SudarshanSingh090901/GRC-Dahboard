export const risks = [
    {
      id: "R-001",
      name: "Unauthorized customer data access",
      category: "Privacy",
      severity: "Critical",
      status: "Open",
      frameworks: ["ISO 27001", "DPDPA 2023", "NIST CSF"]
    },
    {
      id: "R-002",
      name: "AI model bias in recommendation engine",
      category: "AI Governance",
      severity: "High",
      status: "Mitigated",
      frameworks: ["ISO 42001"]
    },
    {
      id: "R-003",
      name: "Weak privileged access controls",
      category: "Cyber Security",
      severity: "High",
      status: "In Progress",
      frameworks: ["ISO 27001", "NIST CSF"]
    }
  ];
  
  export const controls = {
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
  
  export const frameworkScores = Object.entries(controls).map(
    ([name, value]) => ({
      name,
      score: Math.round((value.implemented / value.total) * 100)
    })
  );
  
  export const overallComplianceScore = Math.round(
    frameworkScores.reduce((sum, framework) => sum + framework.score, 0) /
      frameworkScores.length
  );
  
  export const openRiskCount = risks.filter(
    (risk) => risk.status === "Open"
  ).length;
  
  export const criticalRiskCount = risks.filter(
    (risk) => risk.severity === "Critical"
  ).length;