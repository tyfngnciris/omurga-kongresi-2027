import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site-data";

export const metadata = { title: "İletişim" };

export default function IletisimPage() {
  return (
    <>
      <PageHeader title="İletişim" breadcrumb="İletişim" />

      <section className="mx-auto grid max-w-content gap-10 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="section-label mb-2">Mesaj Gönder</p>
          <h2 className="mb-4 text-xl font-medium text-navy-700">Bize Ulaşın</h2>
          <p className="mb-6 text-sm text-gray-600">
            Sorularınız için aşağıdaki formu kullanabilir veya doğrudan kongre
            sekretaryası ile iletişime geçebilirsiniz.
          </p>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Adı Soyadı
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="Adınız ve soyadınız"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                E-Posta
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="ornek@eposta.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Konu</label>
              <input
                type="text"
                className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="Mesaj konusu"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Mesaj</label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                placeholder="Mesajınızı yazın"
              />
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Gönder
            </button>
            <p className="text-xs text-gray-400">
              Not: Bu form arka uç bağlantısı (e-posta gönderimi) bir sonraki geliştirme
              aşamasında eklenecektir.
            </p>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card">
            <p className="mb-1 text-xs font-medium text-teal-600">Kongre Organizasyonu</p>
            <p className="mb-3 text-sm font-medium text-navy-700">{site.contact.orgName}</p>
            <p className="text-sm text-gray-600">{site.contact.address}</p>
            <p className="mt-2 text-sm text-gray-600">{site.contact.phone}</p>
            <p className="text-sm text-gray-600">{site.contact.email}</p>
          </div>

          <div className="card">
            <p className="mb-1 text-xs font-medium text-teal-600">Kongre Merkezi</p>
            <p className="mb-1 text-sm font-medium text-navy-700">{site.venue}</p>
            <p className="mb-3 text-sm text-gray-600">{site.venueDetail}</p>
            <p className="text-sm text-gray-600">{site.dateLabel}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-navy-100">
            <iframe
              src={site.mapEmbedUrl}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              title="Kongre Merkezi Konumu"
            />
          </div>
        </div>
      </section>
    </>
  );
}
