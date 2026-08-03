"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";

export type LoginState = { error?: string } | undefined;

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const clientIp = getClientIp(await headers());
  if (clientIp && !rateLimit(`login:${clientIp}`, 5, 15 * 60_000)) {
    return { error: "Too many attempts. Please try again in 15 minutes." };
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const validUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !passwordHash) {
    return { error: "Admin credentials are not configured." };
  }

  const passwordMatches = await bcrypt.compare(password, passwordHash);
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
