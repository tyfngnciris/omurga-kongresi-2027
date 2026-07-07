import { requireRole } from "@/lib/guards";
import DashboardShell from "@/components/DashboardShell";
import AbstractForm from "@/components/AbstractForm";
import { submitAbstract } from "@/lib/actions/abstract-actions";
import { isSubmissionOpen, ABSTRACT_DEADLINE } from "@/lib/abstract-constants";

export const metadata = { title: "Bildiri Gönder" };
export const dynamic = "force-dynamic";

export default async function BasvuruPage() {
  const session = await requireRole(["AUTHOR"]);

  if (!isSubmissionOpen()) {
    return (
      <DashboardShell session={session} title="Bildiri Gönder">
        <div className="card text-center text-sm text-gray-600">
          Bildiri gönderim süresi {ABSTRACT_DEADLINE.toLocaleDateString("tr-TR")} tarihinde
          sona ermiştir.
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      session={session}
      title="Yeni Bildiri Gönder"
      subtitle="Yazım kurallarına uygun şekilde formu doldurun."
    >
      <AbstractForm action={submitAbstract} submitLabel="Bildiriyi Gönder" pendingLabel="Gönderiliyor..." />
    </DashboardShell>
  );
}
