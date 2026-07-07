"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession } from "@/lib/auth";
import { ROLE_HOME } from "@/lib/guards";

export async function registerAuthor(prevState, formData) {
  const name = (formData.get("name") || "").toString().trim();
  const institution = (formData.get("institution") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const password = (formData.get("password") || "").toString();

  if (!name || !email || !password) {
    return { error: "Ad, e-posta ve şifre zorunludur." };
  }
  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalıdır." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, institution, email, passwordHash, role: "AUTHOR" },
  });

  await createSession(user);
  redirect(ROLE_HOME.AUTHOR);
}

export async function loginUser(prevState, formData) {
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const password = (formData.get("password") || "").toString();

  if (!email || !password) {
    return { error: "E-posta ve şifre zorunludur." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "E-posta veya şifre hatalı." };
  }
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "E-posta veya şifre hatalı." };
  }

  await createSession(user);
  redirect(ROLE_HOME[user.role] || "/bildiri");
}

export async function logoutUser() {
  destroySession();
  redirect("/bildiri");
}
