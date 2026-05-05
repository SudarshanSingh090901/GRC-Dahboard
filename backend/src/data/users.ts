export type User = {
    id: number;
    username: string;
    password: string;
    role: "Admin" | "Control Owner" | "Tester";
    ownerName?: string;
  };
  
  export const users: User[] = [
    {
      id: 1,
      username: "admin",
      password: "Admin@123",
      role: "Admin"
    },
    {
      id: 2,
      username: "infra.owner",
      password: "Infra@123",
      role: "Control Owner",
      ownerName: "Infrastructure Team"
    },
    {
      id: 3,
      username: "privacy.owner",
      password: "Privacy@123",
      role: "Control Owner",
      ownerName: "Privacy Team"
    },
    {
      id: 4,
      username: "nist.owner",
      password: "Nist@123",
      role: "Control Owner",
      ownerName: "Cyber Security Team"
    },
    {
      id: 5,
      username: "audit.tester",
      password: "Audit@123",
      role: "Tester",
      ownerName: "Internal Audit Team"
    },
    {
      id: 6,
      username: "security.tester",
      password: "Security@123",
      role: "Tester",
      ownerName: "Security Testing Team"
    }
  ];