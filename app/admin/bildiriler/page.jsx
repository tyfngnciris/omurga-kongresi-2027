import Link from "next/link";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import StatusBadge from "@/components/StatusBadge";
import { STATUS_LABELS, PRESENTATION_TYPE_LABELS } from "@/lib/abstract-constants";

export const metadata = { title: "Bildiri Yönetimi" };
export const dynamic = "force-dynamic";

export default async function AdminBildirilerPage({ searchParams }) {
  const session = await requireRole(["ADMIN", "COMMITTEE"]);

  const statusFilter = searchParams?.durum;
  const abstracts = await prisma.abstract.findMany({
    where: statusFilter ? { status: statusFilter } : {},
    include: { reviews: true, submitter: true },
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.abstract.groupBy({ by: ["status"], _count: true });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));

  return (
    <DashboardShell
      session={session}
      title="Bildiri Yönetimi"
      subtitle={`Toplam ${abstracts.length} bildiri`}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/admin/bildiriler"
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            !statusFilter ? "bg-navy-700 text-white" : "bg-navy-50 text-navy-700"
          }`}
        >
          Tümü ({abstracts.length && !statusFilter ? abstracts.length : Object.values(countMap).reduce((a, b) => a + b, 0)})
        </Link>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <Link
            key={value}
            href={`/admin/bildiriler?durum=${value}`}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusFilter === value ? "bg-navy-700 text-white" : "bg-navy-50 text-navy-700"
            }`}
          >
            {label} ({countMap[value] || 0})
          </Link>
        ))}
      </div>

      {abstracts.length === 0 ? (
        <div className="card text-center text-sm text-gray-500">Bu filtrede bildiri yok.</div>
      ) : (
        <div className="space-y-4">
          {abstracts.map((a) => (
            <Link
              key={a.id}
              href={`/admin/bildiriler/${a.id}`}
              className="card block transition hover:border-teal-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400">{a.trackingCode}</p>
                  <p className="mt-1 text-sm font-medium text-navy-700">{a.title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {a.category} · {PRESENTATION_TYPE_LABELS[a.presentationType]} · Gönderen:{" "}
                    {a.submitter.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {a.reviews.length} hakem atandı ·{" "}
                    {a.reviews.filter((r) => r.submittedAt).length} değerlendirme tamamlandı
                  </p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
