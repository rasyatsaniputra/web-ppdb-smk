"use server";

import { Application } from "../lib/models/application-model";
import connection from "../lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function createApplication(values: Application) {
  const {
    user_id,
    full_name,
    nisn,
    address,
    phone,
    place_of_birth,
    date_of_birth,
    gender,
    previous_school_name,
    religion_id,
    major_id,
    track_id,
  } = values;

  try {
    const [rows] = await connection.execute<ResultSetHeader>(
      `INSERT INTO applications 
      (user_id, full_name, nisn, address, phone, place_of_birth, date_of_birth, gender, previous_school_name, religion_id, major_id, track_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        full_name,
        nisn,
        address,
        phone,
        place_of_birth,
        date_of_birth,
        gender,
        previous_school_name,
        religion_id,
        major_id,
        track_id,
      ]
    );

    return { success: true, applicationId: rows.insertId };
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      return { success: false, error: "Pendaftaran sudah terkirim." };
    }

    return { success: false, error: "Gagal membuat formulir." };
  }
}

export async function getAllApplications() {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM applications`
    );
    return { success: true, applications: rows as Application[] };
  } catch (err: any) {
    return { success: false, error: "Gagal membuat formulir." };
  }
}

export async function getAllApplicationsWithRelations() {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT a.*, 
              u.username, u.email, u.role,
              r.name AS religion_name,
              m.name AS major_name,
              t.name AS track_name
       FROM applications a
       LEFT JOIN users u ON a.user_id = u.id
       LEFT JOIN religions r ON a.religion_id = r.id
       LEFT JOIN majors m ON a.major_id = m.id
       LEFT JOIN tracks t ON a.track_id = t.id
       ORDER BY a.registration_date`
    );

    return { success: true, applications: rows };
  } catch (err: any) {
    return { success: false, error: "Gagal mengambil data." };
  }
}

export async function getApplicationById(id: number) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM applications WHERE id = ?`,
      [id]
    );
    return { success: true, application: rows[0] as Application | null };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: "Gagal mengambil data." };
  }
}

export async function updateApplication(
  id: number,
  values: Partial<Application>
) {
  try {
    const fields = Object.keys(values);
    const placeholders = fields.map((f) => `${f} = ?`).join(", ");
    const params = Object.values(values);

    const [rows] = await connection.execute<ResultSetHeader>(
      `UPDATE applications SET ${placeholders} WHERE id = ?`,
      [...params, id]
    );

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: "Gagal memperbarui formulir." };
  }
}

export async function deleteApplication(id: number) {
  try {
    await connection.execute(`DELETE FROM applications WHERE id = ?`, [id]);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: "Gagal menghapus formulir." };
  }
}
