export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: "student" | "admin";
  created_at?: string | Date;
}
