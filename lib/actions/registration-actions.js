"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateTrackingCode } from "@/lib/auth";
import { CATEGORY_LABELS, ACCOMMODATION_LABELS } from "@/lib/registration-constants";

function emailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitRegistration(prevState, formData) {
  const fullName = (formData.get("fullName") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const institution = (formData.get("institution") || "").toString().trim();
  const category = (formData.get("category") || "").toString();
  const accommodation = (formData.get("accommodation") || "YOK").toString();
  const invoiceTitle = (formData.get("invoiceTitle") || "").toString().trim();
  const taxOffice = (formData.get("taxOffice") || "").toString().trim();
  const taxNumber = (formData.get("taxNumber") || "").toString().trim();
  const invoiceAddress = (formData.get("invoiceAddress") || "").toString().trim();

  if (!fullName || !email || !phone || !category) {
    return { error: "Lütfen zorunlu alanları (*) doldurun." };
  }
  if (!emailValid(email)) {
    return { error: "Geçerli bir e-posta adresi girin." };
  }
  if (!CATEGORY_LABELS[category]) {
    return { error: "Geçersiz kayıt kategorisi." };
  }
  if (!ACCOMMODATION_LABELS[accommodation]) {
    return { error: "Geçersiz konaklama seçimi." };
  }
  if (!invoiceTitle) {
    return { error: "Fatura ünvanı zorunludur." };
  }

  const registration = await prisma.registration.create({
    data: {
      trackingCode: generateTrackingCode("KYT"),
      fullName,
      email,
      phone,
      institution,
      category,
      accommodation,
      invoiceTitle,
      taxOffice,
      taxNumber,
      invoiceAddress,
    },
  });

  redirect(`/kayit-konaklama/basvuru/${registration.id}?gonderildi=1`);
}
