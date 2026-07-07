import PageHeader from "@/components/PageHeader";
import { registrationFees, accommodationFees } from "@/lib/site-data";

export const metadata = { title: "Kayıt & Konaklama" };

function FeeTable({ title, data }) {
  return (
    <div className="card">
      <p className="mb-4 text-sm font-medium text-navy-700">{title}</p>
      <table className="w-full text-sm">
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.type} className="border-b border-navy-50 last:border-0">
              <td className="py-2.5 pr-4 text-gray-600">{row.type}</td>
              <td className="py-2.5 text-right font-medium text-navy-700">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function KayitKonaklamaPage() {
  return (
    <>
      <PageHeader title="Kayıt & Konaklama" breadcrumb="Kayıt & Konaklama" />

      <section className="mx-auto max-w-content px-5 py-16">
        <div className="card mb-12 flex flex-col items-center gap-4 border-teal-100 bg-teal-50/40 text-center">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            Online kayıt sistemi yakında aktif olacaktır
          </span>
          <p className="max-w-xl text-sm text-gray-600">
            Kredi kartı ile online ödeme ve otomatik fatura oluşturma özellikli kayıt
            sistemi bir sonraki geliştirme aşamasında bu sayfaya eklenecektir. Aşağıda
            güncel kayıt ve konaklama ücretlerini inceleyebilirsiniz.
          </p>
        </div>

        <p className="section-label mb-2">Kayıt Ücretleri</p>
        <h2 className="mb-8 text-2xl font-medium text-navy-700">Kongre Kayıt Ücretleri</h2>
        <div className="mb-4 grid gap-6 sm:grid-cols-2">
          <FeeTable title={registrationFees.before.label} data={registrationFees.before} />
          <FeeTable title={registrationFees.after.label} data={registrationFees.after} />
        </div>

        <div className="card mt-2">
          <p className="mb-3 text-sm font-medium text-navy-700">
            Kayıt ücretlerine dahil olan hizmetler
          </p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            {registrationFees.includes.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-md bg-navy-50 p-3 text-xs text-navy-700">
            Önemli not: {registrationFees.note}
          </p>
        </div>
      </section>

      <section className="bg-navy-50 px-5 py-16">
        <div className="mx-auto max-w-content">
          <p className="section-label mb-2">Konaklama Ücretleri</p>
          <h2 className="mb-8 text-2xl font-medium text-navy-700">Otel Konaklama Paketleri</h2>
          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <FeeTable title={accommodationFees.before.label} data={accommodationFees.before} />
            <FeeTable title={accommodationFees.after.label} data={accommodationFees.after} />
          </div>

          <div className="card mb-6">
            <p className="mb-3 text-sm font-medium text-navy-700">
              Konaklama ücretlerine dahil olan hizmetler
            </p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {accommodationFees.includes.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <p className="mb-2 text-sm font-medium text-navy-700">Transfer</p>
            <p className="mb-3 text-sm text-gray-600">{accommodationFees.transfer.note}</p>
            <p className="text-sm font-medium text-teal-700">
              {accommodationFees.transfer.price}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
