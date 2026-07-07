import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function requireRole(roles, redirectTo = "/bildiri/giris") {
  const session = await getSession();
  if (!session || !roles.includes(session.role)) {
    redirect(redirectTo);
  }
  return session;
}

export const ROLE_HOME = {
  AUTHOR: "/bildiri/basvurularim",
  REVIEWER: "/hakem",
  COMMITTEE: "/admin/bildiriler",
  ADMIN: "/admin/bildiriler",
};
