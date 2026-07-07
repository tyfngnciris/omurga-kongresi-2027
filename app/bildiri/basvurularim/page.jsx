import Link from "next/link";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import StatusBadge from "@/components/StatusBadge";
import { PRESENTATION_TYPE_LABELS, isSubmissionOpen } from "@/lib/abstract-constants";

export const metadata = { title: "Bildirilerim" };
export const dynamic = "force-dynamic";

export default async function BasvurularimPage() {
  const session = await requireRole(["AUTHOR"]);

  const abstracts = await prisma.abstract.findMany({
    where: { submitterId: session.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell session={session} title="Bildirilerim" subtitle="Gönderdiğiniz bildirileri buradan takip edin.">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          {abstracts.length} bildiri {isSubmissionOpen() ? "· gönderim açık" : "· gönderim süresi doldu"}
        </p>
        {isSubmissionOpen() && (
          <Link href="/bildiri/basvuru" className="btn-primary">
            + Yeni Bildiri Gönder
          </Link>
        )}
      </div>

      {abstracts.length === 0 ? (
        <div className="card text-center text-sm text-gray-500">
          Henüz bir bildiri göndermediniz.
        </div>
      ) : (
        <div className="space-y-4">
          {abstracts.map((a) => (
            <Link
              key={a.id}
              href={`/bildiri/basvurularim/${a.id}`}
              className="card block transition hover:border-teal-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400">{a.trackingCode}</p>
                  <p className="mt-1 text-sm font-medium text-navy-700">{a.title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {a.category} · {PRESENTATION_TYPE_LABELS[a.presentationType]}
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
