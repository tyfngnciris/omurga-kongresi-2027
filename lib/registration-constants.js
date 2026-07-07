import { registrationFees, accommodationFees } from "@/lib/site-data";

// 1 Ocak 2027 ve öncesi = erken kayıt fiyatları; sonrası = normal fiyat.
export const EARLY_BIRD_DEADLINE = new Date("2027-01-01T23:59:59+03:00");

export function isEarlyBird(date = new Date()) {
  return date.getTime() <= EARLY_BIRD_DEADLINE.getTime();
}

export const CATEGORY_LABELS = {
  UYE: "Dernek Üyesi, Asistan, Hemşire veya Fizyoterapist",
  UYE_DEGIL: "Dernek Üyesi Olmayan veya Uzman",
  FIRMA: "Firma Temsilcisi",
};

export const ACCOMMODATION_LABELS = {
  YOK: "Konaklama yok (sadece kongre kaydı)",
  SINGLE: "Single Konaklama (6-9 Mayıs, 3 gece)",
  DOUBLE: "Double Konaklama (6-9 Mayıs, 3 gece)",
};

export const STATUS_LABELS = {
  KAYIT_ALINDI: "Kayıt Alındı",
  ODEME_ONAYLANDI: "Ödeme Onaylandı",
  IPTAL: "İptal",
};

export const STATUS_COLORS = {
  KAYIT_ALINDI: "bg-amber-50 text-amber-700",
  ODEME_ONAYLANDI: "bg-teal-50 text-teal-700",
  IPTAL: "bg-red-50 text-red-700",
};

function findFeeRow(feeTable, typeLabel, early) {
  const rows = early ? feeTable.before.rows : feeTable.after.rows;
  return rows.find((r) => r.type === typeLabel);
}

export function getRegistrationFee(category, date = new Date()) {
  const early = isEarlyBird(date);
  const typeLabel = CATEGORY_LABELS[category];
  const row = findFeeRow(registrationFees, typeLabel, early);
  return row ? { price: row.price, early } : null;
}

export function getAccommodationFee(accommodation, date = new Date()) {
  if (accommodation === "YOK") return null;
  const early = isEarlyBird(date);
  const typeLabel = ACCOMMODATION_LABELS[accommodation];
  const row = findFeeRow(accommodationFees, typeLabel, early);
  return row ? { price: row.price, early } : null;
}
