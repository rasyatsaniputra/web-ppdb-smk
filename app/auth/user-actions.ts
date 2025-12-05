"use server";

import { hash } from "bcryptjs";
import { User } from "../lib/models/user-model";
import connection from "../lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function createUser(values: User) {
  const { username, email, password } = values;

  const hashedPassword = await hash(password, 10);

  try {
    const [rows] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return { success: true, userId: rows.insertId };
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      return { success: false, error: "Email sudah digunakan." };
    }

    return { success: false, error: "Gagal membuat akun." };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0] as User | undefined;
  } catch (err: any) {
    return undefined;
  }
}
