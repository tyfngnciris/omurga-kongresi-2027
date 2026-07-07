"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession, generateTrackingCode } from "@/lib/auth";
import { requireRole } from "@/lib/guards";
import { isSubmissionOpen, wordCount } from "@/lib/abstract-constants";

const MAX_AUTHORS = 8;
const MAX_ABSTRACT_WORDS = 400;

function collectAuthors(formData) {
  const authors = [];
  for (let i = 0; i < MAX_AUTHORS; i++) {
    const name = (formData.get(`authorName_${i}`) || "").toString().trim();
    const institution = (formData.get(`authorInstitution_${i}`) || "").toString().trim();
    if (!name) continue;
    authors.push({
      name,
      institution,
      isCorresponding: formData.get(`authorCorresponding_${i}`) === "on",
    });
  }
  return authors;
}

export async function submitAbstract(prevState, formData) {
  const session = await requireRole(["AUTHOR"]);

  if (!isSubmissionOpen()) {
    return { error: "Bildiri gönderim süresi sona ermiştir." };
  }

  const title = (formData.get("title") || "").toString().trim();
  const category = (formData.get("category") || "").toString();
  const presentationType = (formData.get("presentationType") || "").toString();
  const purpose = (formData.get("purpose") || "").toString().trim();
  const method = (formData.get("method") || "").toString().trim();
  const findings = (formData.get("findings") || "").toString().trim();
  const conclusion = (formData.get("conclusion") || "").toString().trim();
  const keywords = (formData.get("keywords") || "").toString().trim();
  const authors = collectAuthors(formData);

  if (!title || !category || !presentationType || !purpose || !method || !findings || !conclusion) {
    return { error: "Lütfen tüm zorunlu alanları doldurun." };
  }
  if (authors.length === 0) {
    return { error: "En az bir yazar eklemelisiniz." };
  }
  if (!authors.some((a) => a.isCorresponding)) {
    return { error: "Bir sorumlu yazar işaretlemelisiniz." };
  }

  const totalWords = wordCount(purpose) + wordCount(method) + wordCount(findings) + wordCount(conclusion);
  if (totalWords > MAX_ABSTRACT_WORDS) {
    return { error: `Özet metni ${MAX_ABSTRACT_WORDS} kelimeyi geçemez (şu an ${totalWords} kelime).` };
  }

  const abstract = await prisma.abstract.create({
    data: {
      trackingCode: generateTrackingCode(),
      title,
      category,
      presentationType,
      purpose,
      method,
      findings,
      conclusion,
      keywords,
      authors,
      submitterId: session.id,
    },
  });

  revalidatePath("/bildiri/basvurularim");
  redirect(`/bildiri/basvurularim/${abstract.id}?gonderildi=1`);
}

export async function updateAbstract(id, prevState, formData) {
  const session = await requireRole(["AUTHOR"]);

  const existing = await prisma.abstract.findUnique({ where: { id } });
  if (!existing || existing.submitterId !== session.id) {
    return { error: "Bu bildiriye erişim yetkiniz yok." };
  }
  if (!["GONDERILDI", "REVIZYON_ISTENDI"].includes(existing.status)) {
    return { error: "Bu bildiri artık düzenlenemez." };
  }
  if (!isSubmissionOpen()) {
    return { error: "Düzenleme süresi sona ermiştir." };
  }

  const title = (formData.get("title") || "").toString().trim();
  const category = (formData.get("category") || "").toString();
  const presentationType = (formData.get("presentationType") || "").toString();
  const purpose = (formData.get("purpose") || "").toString().trim();
  const method = (formData.get("method") || "").toString().trim();
  const findings = (formData.get("findings") || "").toString().trim();
  const conclusion = (formData.get("conclusion") || "").toString().trim();
  const keywords = (formData.get("keywords") || "").toString().trim();
  const authors = collectAuthors(formData);

  const totalWords = wordCount(purpose) + wordCount(method) + wordCount(findings) + wordCount(conclusion);
  if (totalWords > MAX_ABSTRACT_WORDS) {
    return { error: `Özet metni ${MAX_ABSTRACT_WORDS} kelimeyi geçemez (şu an ${totalWords} kelime).` };
  }

  await prisma.abstract.update({
    where: { id },
    data: {
      title,
      category,
      presentationType,
      purpose,
      method,
      findings,
      conclusion,
      keywords,
      authors,
      status: "GONDERILDI",
    },
  });

  revalidatePath(`/bildiri/basvurularim/${id}`);
  revalidatePath("/bildiri/basvurularim");
  redirect(`/bildiri/basvurularim/${id}?guncellendi=1`);
}

export async function withdrawAbstract(id) {
  const session = await requireRole(["AUTHOR"]);
  const existing = await prisma.abstract.findUnique({ where: { id } });
  if (!existing || existing.submitterId !== session.id) {
    return;
  }
  if (["KABUL_EDILDI", "PROGRAMLANDI"].includes(existing.status)) {
    return;
  }
  await prisma.abstract.delete({ where: { id } });
  revalidatePath("/bildiri/basvurularim");
  redirect("/bildiri/basvurularim");
}

export async function assignReviewer(abstractId, formData) {
  await requireRole(["ADMIN", "COMMITTEE"]);
  const reviewerId = (formData.get("reviewerId") || "").toString();
  if (!reviewerId) return;

  await prisma.review.upsert({
    where: { abstractId_reviewerId: { abstractId, reviewerId } },
    update: {},
    create: { abstractId, reviewerId },
  });

  await prisma.abstract.updateMany({
    where: { id: abstractId, status: "GONDERILDI" },
    data: { status: "DEGERLENDIRMEDE" },
  });

  revalidatePath(`/admin/bildiriler/${abstractId}`);
}

export async function unassignReviewer(abstractId, formData) {
  await requireRole(["ADMIN", "COMMITTEE"]);
  const reviewerId = (formData.get("reviewerId") || "").toString();
  await prisma.review.deleteMany({ where: { abstractId, reviewerId } });
  revalidatePath(`/admin/bildiriler/${abstractId}`);
}

export async function finalizeDecision(abstractId, prevState, formData) {
  await requireRole(["ADMIN", "COMMITTEE"]);
  const status = (formData.get("status") || "").toString();
  const committeeNote = (formData.get("committeeNote") || "").toString().trim();

  const validStatuses = ["DEGERLENDIRMEDE", "REVIZYON_ISTENDI", "KABUL_EDILDI", "REDDEDILDI", "PROGRAMLANDI"];
  if (!validStatuses.includes(status)) {
    return { error: "Geçersiz durum." };
  }

  await prisma.abstract.update({
    where: { id: abstractId },
    data: { status, committeeNote },
  });

  revalidatePath(`/admin/bildiriler/${abstractId}`);
  revalidatePath("/admin/bildiriler");
  return { success: "Karar kaydedildi." };
}
