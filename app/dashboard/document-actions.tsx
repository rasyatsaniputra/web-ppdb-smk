"use server";

import connection from "../lib/db";
import { ResultSetHeader } from "mysql2";
import { Document } from "../lib/models/document-model";

export async function createDocument(values: Document) {
  const { user_id, document_type, path } = values;

  try {
    const [rows] = await connection.execute<ResultSetHeader>(
      `INSERT INTO documents (user_id, document_type, path)
       VALUES (?, ?, ?)`,
      [user_id, document_type, path]
    );

    return { success: true, documentId: rows.insertId };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: "Gagal membuat dokumen." };
  }
}
