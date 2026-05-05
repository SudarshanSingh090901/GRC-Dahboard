export type EvidenceRecord = {
    id: number;
    framework: string;
    controlId: string;
    controlName: string;
    ownerName: string;
    status: "Implemented" | "Partially Implemented" | "Not Implemented";
    evidenceType:
      | "Policy Document"
      | "SOP"
      | "Screenshot"
      | "Log File"
      | "Audit Report"
      | "Training Record"
      | "Incident Report"
      | "Vendor Assessment";
    remarks: string;
    fileName: string;
    uploadedAt: string;
    score: number;
  };
  
  export const evidenceStore: EvidenceRecord[] = [
    {
      id: 1,
      framework: "ISO 27001",
      controlId: "A.5.1",
      controlName: "Policies for Information Security",
      ownerName: "Information Security Team",
      status: "Implemented",
      evidenceType: "Policy Document",
      remarks: "Approved ISMS policy uploaded and communicated.",
      fileName: "isms-policy.pdf",
      uploadedAt: new Date().toISOString(),
      score: 100
    },
    {
      id: 2,
      framework: "ISO 27001",
      controlId: "A.5.15",
      controlName: "Access Control",
      ownerName: "Infrastructure Team",
      status: "Implemented",
      evidenceType: "Screenshot",
      remarks: "MFA enabled for all privileged accounts.",
      fileName: "access-control-mfa.png",
      uploadedAt: new Date().toISOString(),
      score: 100
    },
    {
      id: 3,
      framework: "ISO 27001",
      controlId: "A.8.15",
      controlName: "Logging",
      ownerName: "SOC Team",
      status: "Partially Implemented",
      evidenceType: "Log File",
      remarks: "SIEM implemented only for production environment.",
      fileName: "siem-logs.zip",
      uploadedAt: new Date().toISOString(),
      score: 50
    },
    {
      id: 4,
      framework: "ISO 27001",
      controlId: "A.8.24",
      controlName: "Use of Cryptography",
      ownerName: "Security Architecture Team",
      status: "Not Implemented",
      evidenceType: "Policy Document",
      remarks: "Encryption policy still under approval.",
      fileName: "",
      uploadedAt: new Date().toISOString(),
      score: 0
    },
    {
      id: 5,
      framework: "DPDPA 2023",
      controlId: "DP-01",
      controlName: "Consent Management",
      ownerName: "Privacy Team",
      status: "Implemented",
      evidenceType: "Screenshot",
      remarks: "Consent banner enabled across web and app.",
      fileName: "consent-banner.png",
      uploadedAt: new Date().toISOString(),
      score: 100
    },
    {
      id: 6,
      framework: "DPDPA 2023",
      controlId: "DP-08",
      controlName: "Personal Data Breach Notification",
      ownerName: "Privacy Office",
      status: "Partially Implemented",
      evidenceType: "Incident Report",
      remarks: "Breach notification process documented but not tested.",
      fileName: "breach-process.pdf",
      uploadedAt: new Date().toISOString(),
      score: 50
    },
    {
      id: 7,
      framework: "DPDPA 2023",
      controlId: "DP-13",
      controlName: "Data Protection Impact Assessment",
      ownerName: "Compliance Team",
      status: "Not Implemented",
      evidenceType: "Audit Report",
      remarks: "DPIA template not finalized.",
      fileName: "",
      uploadedAt: new Date().toISOString(),
      score: 0
    },
    {
      id: 8,
      framework: "NIST CSF",
      controlId: "ID.AM",
      controlName: "Asset Management",
      ownerName: "IT Operations Team",
      status: "Implemented",
      evidenceType: "Vendor Assessment",
      remarks: "Central asset inventory available in CMDB.",
      fileName: "asset-inventory.xlsx",
      uploadedAt: new Date().toISOString(),
      score: 100
    },
    {
      id: 9,
      framework: "NIST CSF",
      controlId: "PR.AC",
      controlName: "Identity Management and Access Control",
      ownerName: "Cyber Security Team",
      status: "Partially Implemented",
      evidenceType: "Audit Report",
      remarks: "Privileged access reviews pending for vendors.",
      fileName: "access-review.pdf",
      uploadedAt: new Date().toISOString(),
      score: 50
    },
    {
      id: 10,
      framework: "NIST CSF",
      controlId: "RS.RP",
      controlName: "Response Planning",
      ownerName: "Incident Response Team",
      status: "Implemented",
      evidenceType: "SOP",
      remarks: "Incident response playbook reviewed and approved.",
      fileName: "incident-response-playbook.pdf",
      uploadedAt: new Date().toISOString(),
      score: 100
    }
  ];