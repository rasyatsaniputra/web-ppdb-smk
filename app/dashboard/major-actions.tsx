"use server";

import { RowDataPacket } from "mysql2";
import connection from "../lib/db";
import { Major } from "../lib/models/major-model";

export async function getAllMajors() {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM majors"
    );

    return { success: true, majors: rows as Major[] };
  } catch (err: any) {
    return { success: false, error: "Gagal mengambil data." };
  }
}
