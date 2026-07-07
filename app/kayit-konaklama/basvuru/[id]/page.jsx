import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import {
  CATEGORY_LABELS,
  ACCOMMODATION_LABELS,
  STATUS_LABELS,
  getRegistrationFee,
  getAccommodationFee,
} from "@/lib/registration-constants";

export const metadata = { title: "Kayıt Özeti" };
export const dynamic = "force-dynamic";

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-navy-50 py-2.5 text-sm last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-navy-700">{value}</span>
    </div>
  );
}

export default async function KayitOzetPage({ params, searchParams }) {
  const registration = await prisma.registration.findUnique({ where: { id: params.id } });
  if (!registration) notFound();

  const submitted = searchParams?.gonderildi === "1";
  const regFee = getRegistrationFee(registration.category, registration.createdAt);
  const accFee = getAccommodationFee(registration.accommodation, registration.createdAt);

  return (
    <>
      <PageHeader title="Kayıt Özeti" breadcrumb="Kayıt & Konaklama / Kayıt Özeti" />

      <section className="mx-auto max-w-content px-5 py-16">
        <div className="mx-auto max-w-2xl">
          {submitted && (
            <div className="mb-8 rounded-md bg-teal-50 px-4 py-3 text-sm text-teal-700">
              Kayıt talebiniz alındı. Takip kodunuz: <strong>{registration.trackingCode}</strong>
            </div>
          )}

          <div className="card space-y-1">
            <Row label="Takip Kodu" value={registration.trackingCode} />
            <Row label="Ad Soyad" value={registration.fullName} />
            <Row label="E-Posta" value={registration.email} />
            <Row label="Telefon" value={registration.phone} />
            {registration.institution && <Row label="Kurum" value={registration.institution} />}
            <Row label="Kategori" value={CATEGORY_LABELS[registration.category]} />
            <Row label="Konaklama" value={ACCOMMODATION_LABELS[registration.accommodation]} />
            <Row label="Durum" value={STATUS_LABELS[registration.status]} />
          </div>

          <div className="card mt-6 space-y-1">
            <p className="mb-2 text-sm font-medium text-navy-700">Ücret Bilgisi</p>
            {regFee && (
              <Row
                label={`Kongre Kaydı (${regFee.early ? "erken kayıt" : "normal"})`}
                value={regFee.price}
              />
            )}
            {accFee && (
              <Row
                label={`Konaklama (${accFee.early ? "erken kayıt" : "normal"})`}
                value={accFee.price}
              />
            )}
          </div>

          <div className="mt-6 rounded-md bg-navy-50 p-3 text-xs text-navy-700">
            Online ödeme sistemi henüz aktif değildir. Kongre sekretaryası, ödeme adımları için
            e-posta adresiniz üzerinden sizinle iletişime geçecektir.
          </div>
        </div>
      </section>
    </>
  );
}
