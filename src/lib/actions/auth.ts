"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const validUsername = process.env.ADMIN_USERNAME;
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !validPasswordHash) {
    return { error: "Admin credentials are not configured." };
  }

  const passwordMatches = await bcrypt.compare(password, validPasswordHash);

  if (username !== validUsername || !passwordMatches) {
    return { error: "Invalid username or password" };
  }

  await createSession(username);
  redirect("/admin/companies");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
