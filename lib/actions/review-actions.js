"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/guards";

function toScore(value) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n)) return null;
  return Math.min(5, Math.max(1, n));
}

export async function submitReview(reviewId, prevState, formData) {
  const session = await requireRole(["REVIEWER"]);

  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review || review.reviewerId !== session.id) {
    return { error: "Bu değerlendirmeye erişim yetkiniz yok." };
  }

  const originality = toScore(formData.get("originality"));
  const methodology = toScore(formData.get("methodology"));
  const contribution = toScore(formData.get("contribution"));
  const presentation = toScore(formData.get("presentation"));
  const comments = (formData.get("comments") || "").toString().trim();
  const decision = (formData.get("decision") || "").toString();

  if (!["KABUL", "KOSULLU_KABUL", "RED"].includes(decision)) {
    return { error: "Lütfen bir karar seçin." };
  }
  if (!originality || !methodology || !contribution || !presentation) {
    return { error: "Lütfen tüm puanlama alanlarını doldurun (1-5)." };
  }

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      originality,
      methodology,
      contribution,
      presentation,
      comments,
      decision,
      submittedAt: new Date(),
    },
  });

  revalidatePath("/hakem");
  redirect("/hakem?degerlendirildi=1");
}
