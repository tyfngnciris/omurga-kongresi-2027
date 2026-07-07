import { notFound } from "next/navigation";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import ReviewForm from "@/components/ReviewForm";
import { submitReview } from "@/lib/actions/review-actions";
import { PRESENTATION_TYPE_LABELS, DECISION_LABELS } from "@/lib/abstract-constants";

export const metadata = { title: "Bildiri Değerlendirme" };
export const dynamic = "force-dynamic";

export default async function HakemDetayPage({ params }) {
  const session = await requireRole(["REVIEWER"]);

  const review = await prisma.review.findUnique({
    where: { id: params.id },
    include: { abstract: true },
  });
  if (!review || review.reviewerId !== session.id) {
    notFound();
  }

  const a = review.abstract;
  const boundSubmit = submitReview.bind(null, review.id);

  return (
    <DashboardShell session={session} title="Bildiri Değerlendirme" subtitle={a.trackingCode}>
      <div className="card mb-6 space-y-4">
        <p className="rounded-md bg-navy-50 px-3 py-2 text-xs text-navy-700">
          Çift-kör değerlendirme: yazar ve kurum bilgileri size gösterilmemektedir.
        </p>
        <div>
          <p className="text-xs font-medium text-gray-500">Başlık</p>
          <p className="text-sm font-medium text-navy-700">{a.title}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Kategori</p>
            <p className="text-sm text-gray-700">{a.category}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Sunum Tercihi</p>
            <p className="text-sm text-gray-700">{PRESENTATION_TYPE_LABELS[a.presentationType]}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Anahtar Kelimeler</p>
          <p className="text-sm text-gray-700">{a.keywords || "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Amaç</p>
          <p className="text-sm text-gray-700">{a.purpose}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Yöntem</p>
          <p className="text-sm text-gray-700">{a.method}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Bulgular</p>
          <p className="text-sm text-gray-700">{a.findings}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Sonuç</p>
          <p className="text-sm text-gray-700">{a.conclusion}</p>
        </div>
      </div>

      {review.submittedAt ? (
        <div className="card">
          <p className="mb-2 text-sm font-medium text-navy-700">
            Bu bildiriyi değerlendirdiniz: {DECISION_LABELS[review.decision]}
          </p>
          <p className="text-sm text-gray-600">{review.comments}</p>
        </div>
      ) : (
        <ReviewForm action={boundSubmit} />
      )}
    </DashboardShell>
  );
}
