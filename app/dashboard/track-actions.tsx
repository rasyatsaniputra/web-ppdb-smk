"use server";

import { RowDataPacket } from "mysql2";
import connection from "../lib/db";
import { Track } from "../lib/models/track-model";

export async function getAllTracks() {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM tracks"
    );

    return { success: true, tracks: rows as Track[] };
  } catch (err: any) {
    return { success: false, error: "Gagal mengambil data." };
  }
}
