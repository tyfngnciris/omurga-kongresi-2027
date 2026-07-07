import { notFound } from "next/navigation";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import StatusBadge from "@/components/StatusBadge";
import AbstractForm from "@/components/AbstractForm";
import { updateAbstract, withdrawAbstract } from "@/lib/actions/abstract-actions";
import { isSubmissionOpen } from "@/lib/abstract-constants";

export const metadata = { title: "Bildiri Detayı" };
export const dynamic = "force-dynamic";

export default async function BasvuruDetayPage({ params, searchParams }) {
  const session = await requireRole(["AUTHOR"]);

  const abstract = await prisma.abstract.findUnique({ where: { id: params.id } });
  if (!abstract || abstract.submitterId !== session.id) {
    notFound();
  }

  const editable = ["GONDERILDI", "REVIZYON_ISTENDI"].includes(abstract.status) && isSubmissionOpen();
  const boundUpdate = updateAbstract.bind(null, abstract.id);
  const boundWithdraw = withdrawAbstract.bind(null, abstract.id);

  return (
    <DashboardShell session={session} title={abstract.title} subtitle={abstract.trackingCode}>
      {searchParams?.gonderildi && (
        <p className="mb-6 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Bildiriniz başarıyla gönderildi.
        </p>
      )}
      {searchParams?.guncellendi && (
        <p className="mb-6 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Bildiriniz güncellendi.
        </p>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <StatusBadge status={abstract.status} />
        {!["KABUL_EDILDI", "PROGRAMLANDI"].includes(abstract.status) && (
          <form action={boundWithdraw}>
            <button
              type="submit"
              className="rounded-md border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Bildiriyi Geri Çek
            </button>
          </form>
        )}
      </div>

      {abstract.committeeNote && (
        <div className="card mb-6 border-amber-100 bg-amber-50/40">
          <p className="mb-1 text-xs font-medium text-amber-700">Komite Notu</p>
          <p className="text-sm text-gray-700">{abstract.committeeNote}</p>
        </div>
      )}

      {editable ? (
        <AbstractForm
          action={boundUpdate}
          defaultValues={abstract}
          submitLabel="Değişiklikleri Kaydet"
          pendingLabel="Kaydediliyor..."
        />
      ) : (
        <div className="card space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500">Kategori</p>
            <p className="text-sm text-gray-700">{abstract.category}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Amaç</p>
            <p className="text-sm text-gray-700">{abstract.purpose}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Yöntem</p>
            <p className="text-sm text-gray-700">{abstract.method}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Bulgular</p>
            <p className="text-sm text-gray-700">{abstract.findings}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Sonuç</p>
            <p className="text-sm text-gray-700">{abstract.conclusion}</p>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
