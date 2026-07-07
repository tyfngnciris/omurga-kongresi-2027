export const ABSTRACT_DEADLINE = new Date("2027-01-15T23:59:59+03:00");

export const CATEGORIES = [
  "Dejeneratif Omurga Hastalıkları",
  "Deformite",
  "Travma",
  "Enfeksiyon",
  "Tümör",
  "Minimal İnvaziv Cerrahi",
  "Diğer",
];

export const PRESENTATION_TYPE_LABELS = {
  SOZLU: "Sözlü Sunum",
  POSTER: "Poster",
};

export const STATUS_LABELS = {
  GONDERILDI: "Gönderildi",
  DEGERLENDIRMEDE: "Değerlendirmede",
  REVIZYON_ISTENDI: "Revizyon İstendi",
  KABUL_EDILDI: "Kabul Edildi",
  REDDEDILDI: "Reddedildi",
  PROGRAMLANDI: "Programlandı",
};

export const STATUS_COLORS = {
  GONDERILDI: { bg: "#E6F1FB", text: "#0C447C" },
  DEGERLENDIRMEDE: { bg: "#FAEEDA", text: "#854F0B" },
  REVIZYON_ISTENDI: { bg: "#FAEEDA", text: "#854F0B" },
  KABUL_EDILDI: { bg: "#EAF3DE", text: "#3B6D11" },
  REDDEDILDI: { bg: "#FCEBEB", text: "#A32D2D" },
  PROGRAMLANDI: { bg: "#EAF3DE", text: "#3B6D11" },
};

export const DECISION_LABELS = {
  KABUL: "Kabul",
  KOSULLU_KABUL: "Koşullu Kabul (Revizyon)",
  RED: "Red",
};

export function isSubmissionOpen() {
  return new Date() < ABSTRACT_DEADLINE;
}

export function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}
