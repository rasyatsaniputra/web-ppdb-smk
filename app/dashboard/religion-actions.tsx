"use server";

import { RowDataPacket } from "mysql2";
import connection from "../lib/db";
import { Religion } from "../lib/models/religion-model";

export async function getAllReligions() {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM religions"
    );

    return { success: true, religions: rows as Religion[] };
  } catch (err: any) {
    return { success: false, error: "Gagal mengambil data." };
  }
}
