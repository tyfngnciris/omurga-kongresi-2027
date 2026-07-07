import PageHeader from "@/components/PageHeader";
import { abstractRules, site } from "@/lib/site-data";

export const metadata = { title: "Bildiri Gönderimi" };

function List({ items }) {
  return (
    <ul className="space-y-2 text-sm text-gray-600">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BildiriPage() {
  return (
    <>
      <PageHeader title="Bildiri Gönderimi" breadcrumb="Bildiri Gönderimi" />

      <section className="mx-auto max-w-content px-5 py-16">
        <div className="card mb-12 flex flex-col items-center gap-4 border-teal-100 bg-teal-50/40 text-center">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            Online bildiri gönderim sistemi yakında aktif olacaktır
          </span>
          <p className="max-w-xl text-sm text-gray-600">
            Hakem değerlendirmeli bildiri gönderim sistemi bir sonraki geliştirme
            aşamasında bu sayfaya eklenecektir. Aşağıda gönderim koşullarını ve yazım
            kurallarını inceleyebilirsiniz.
          </p>
          <p className="text-sm font-medium text-navy-700">
            Son bildiri gönderim tarihi: {site.importantDates.abstractDeadline}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label mb-3">Gönderim Koşulları</p>
            <p className="mb-4 text-sm text-gray-600">{abstractRules.deadlineNote}</p>
            <p className="mb-6 text-sm text-gray-600">{abstractRules.submissionNote}</p>

            <p className="section-label mb-3">Önemli Noktalar</p>
            <List items={abstractRules.importantPoints} />
          </div>

          <div>
            <p className="section-label mb-3">Yazım Kuralları</p>
            <List items={abstractRules.writingRules} />
          </div>
        </div>

        <div className="card mt-12">
          <p className="mb-2 text-sm font-medium text-navy-700">Bildirilerin Değerlendirilmesi</p>
          <p className="text-sm text-gray-600">{abstractRules.review}</p>
        </div>
      </section>
    </>
  );
}
