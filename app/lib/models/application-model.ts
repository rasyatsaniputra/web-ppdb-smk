export interface Application {
  id?: number;
  user_id: number;
  full_name: string;
  nisn: string;
  address: string;
  phone: string;
  place_of_birth: string;
  date_of_birth: string | Date;
  gender: "M" | "F";
  previous_school_name: string;
  registration_date?: string | Date;
  religion_id: number;
  major_id: number;
  track_id: number;
  status?: "pending" | "accepted" | "rejected" | "verified" | "cancelled";
}
