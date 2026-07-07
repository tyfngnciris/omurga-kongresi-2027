import { notFound } from "next/navigation";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import StatusBadge from "@/components/StatusBadge";
import DecisionForm from "@/components/DecisionForm";
import {
  assignReviewer,
  unassignReviewer,
  finalizeDecision,
} from "@/lib/actions/abstract-actions";
import { PRESENTATION_TYPE_LABELS, DECISION_LABELS } from "@/lib/abstract-constants";

export const metadata = { title: "Bildiri Detayı" };
export const dynamic = "force-dynamic";

export default async function AdminBildiriDetayPage({ params }) {
  const session = await requireRole(["ADMIN", "COMMITTEE"]);

  const abstract = await prisma.abstract.findUnique({
    where: { id: params.id },
    include: { reviews: { include: { reviewer: true } }, submitter: true },
  });
  if (!abstract) notFound();

  const assignedIds = abstract.reviews.map((r) => r.reviewerId);
  const availableReviewers = await prisma.user.findMany({
    where: { role: "REVIEWER", id: { notIn: assignedIds } },
    orderBy: { name: "asc" },
  });

  const boundAssign = assignReviewer.bind(null, abstract.id);
  const boundFinalize = finalizeDecision.bind(null, abstract.id);

  return (
    <DashboardShell session={session} title={abstract.title} subtitle={abstract.trackingCode}>
      <div className="mb-6">
        <StatusBadge status={abstract.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card space-y-4">
            <p className="text-sm font-medium text-navy-700">Bildiri Detayları</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Kategori</p>
                <p className="text-sm text-gray-700">{abstract.category}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Sunum Tercihi</p>
                <p className="text-sm text-gray-700">{PRESENTATION_TYPE_LABELS[abstract.presentationType]}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Anahtar Kelimeler</p>
              <p className="text-sm text-gray-700">{abstract.keywords || "—"}</p>
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

          <div className="card space-y-3">
            <p className="text-sm font-medium text-navy-700">Yazarlar</p>
            <p className="text-xs text-gray-500">Sorumlu yazar/gönderen: {abstract.submitter.name} ({abstract.submitter.email})</p>
            <div className="space-y-2">
              {(abstract.authors || []).map((a, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                  <span className="font-medium">{a.name}</span>
                  <span className="text-gray-400">·</span>
                  <span>{a.institution}</span>
                  {a.isCorresponding && (
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-700">
                      Sorumlu Yazar
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card space-y-4">
            <p className="text-sm font-medium text-navy-700">Hakem Değerlendirmeleri</p>
            {abstract.reviews.length === 0 ? (
              <p className="text-sm text-gray-500">Henüz hakem atanmadı.</p>
            ) : (
              <div className="space-y-4">
                {abstract.reviews.map((r) => (
                  <div key={r.id} className="border-t border-navy-50 pt-4 first:border-0 first:pt-0">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-navy-700">{r.reviewer.name}</p>
                      {r.submittedAt ? (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                          Tamamlandı · {DECISION_LABELS[r.decision]}
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                          Bekliyor
                        </span>
                      )}
                    </div>
                    {r.submittedAt && (
                      <>
                        <p className="text-xs text-gray-500">
                          Özgünlük: {r.originality} · Yöntem: {r.methodology} · Katkı: {r.contribution} ·
                          {" "}Sunum: {r.presentation}
                        </p>
                        {r.comments && <p className="mt-1 text-sm text-gray-600">{r.comments}</p>}
                      </>
                    )}
                    <form action={unassignReviewer.bind(null, abstract.id)} className="mt-2">
                      <input type="hidden" name="reviewerId" value={r.reviewerId} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-red-500 hover:text-red-600"
                      >
                        Atamayı Kaldır
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-3">
            <p className="text-sm font-medium text-navy-700">Hakem Ata</p>
            {availableReviewers.length === 0 ? (
              <p className="text-xs text-gray-500">Atanabilecek uygun hakem yok.</p>
            ) : (
              <form action={boundAssign} className="space-y-3">
                <select
                  name="reviewerId"
                  required
                  defaultValue=""
                  className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Hakem seçin
                  </option>
                  {availableReviewers.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn-primary w-full">
                  Ata
                </button>
              </form>
            )}
          </div>

          <DecisionForm
            action={boundFinalize}
            currentStatus={abstract.status}
            currentNote={abstract.committeeNote}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
