import Link from "next/link";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import { PRESENTATION_TYPE_LABELS, DECISION_LABELS } from "@/lib/abstract-constants";

export const metadata = { title: "Hakem Paneli" };
export const dynamic = "force-dynamic";

export default async function HakemPage({ searchParams }) {
  const session = await requireRole(["REVIEWER"]);

  const reviews = await prisma.review.findMany({
    where: { reviewerId: session.id },
    include: { abstract: true },
    orderBy: { createdAt: "desc" },
  });

  const pending = reviews.filter((r) => !r.submittedAt);
  const done = reviews.filter((r) => r.submittedAt);

  return (
    <DashboardShell
      session={session}
      title="Hakem Paneli"
      subtitle="Size atanan bildiriler çift-kör olarak (yazar bilgisi gizli) gösterilir."
    >
      {searchParams?.degerlendirildi && (
        <p className="mb-6 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Değerlendirmeniz kaydedildi.
        </p>
      )}

      <p className="section-label mb-3">Bekleyen Değerlendirmeler ({pending.length})</p>
      {pending.length === 0 ? (
        <div className="card mb-8 text-center text-sm text-gray-500">
          Bekleyen değerlendirmeniz yok.
        </div>
      ) : (
        <div className="mb-8 space-y-4">
          {pending.map((r) => (
            <Link
              key={r.id}
              href={`/hakem/${r.id}`}
              className="card block transition hover:border-teal-200"
            >
              <p className="text-xs text-gray-400">{r.abstract.trackingCode}</p>
              <p className="mt-1 text-sm font-medium text-navy-700">{r.abstract.title}</p>
              <p className="mt-1 text-xs text-gray-500">
                {r.abstract.category} · {PRESENTATION_TYPE_LABELS[r.abstract.presentationType]}
              </p>
            </Link>
          ))}
        </div>
      )}

      <p className="section-label mb-3">Tamamlanan Değerlendirmeler ({done.length})</p>
      {done.length === 0 ? (
        <div className="card text-center text-sm text-gray-500">Henüz tamamlanmış değerlendirme yok.</div>
      ) : (
        <div className="space-y-4">
          {done.map((r) => (
            <div key={r.id} className="card">
              <p className="text-xs text-gray-400">{r.abstract.trackingCode}</p>
              <p className="mt-1 text-sm font-medium text-navy-700">{r.abstract.title}</p>
              <p className="mt-2 text-xs text-gray-500">
                Kararınız: <span className="font-medium text-navy-700">{DECISION_LABELS[r.decision]}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
