import Link from "next/link";
import Countdown from "@/components/Countdown";
import {
  site,
  stats,
  presidents,
  invitationLetter,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="bg-navy-700 px-5 py-20 text-center text-white sm:py-28">
        <p className="mb-4 text-xs font-medium tracking-widest text-teal-200 sm:text-sm">
          {site.dateLabel.toUpperCase()} · {site.venue.toUpperCase()}
        </p>
        <h1 className="mx-auto max-w-3xl text-3xl font-medium leading-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-navy-100/90 sm:text-base">
          {site.theme}
          <br />
          <span className="text-navy-100/60">({site.themeEn})</span>
        </p>
        <p className="mt-2 text-xs text-navy-100/70">
          {site.organizer} &amp; {site.partner} işbirliğiyle
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/kayit-konaklama" className="btn-primary">
            Kayıt Ol →
          </Link>
          <Link href="/program" className="btn-outline">
            Programı İncele
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-content px-5 pt-6 text-center">
          <p className="section-label">Kongreye Kalan Süre</p>
        </div>
        <Countdown target={site.startDate} />
      </section>

      <section className="mx-auto grid max-w-content gap-4 px-5 py-12 sm:grid-cols-3">
        <div className="card">
          <p className="section-label">Son Tarih</p>
          <p className="mt-2 text-lg font-medium text-navy-700">Bildiri Gönderimi</p>
          <p className="text-sm text-gray-500">{site.importantDates.abstractDeadline}</p>
        </div>
        <div className="card">
          <p className="section-label">Son Tarih</p>
          <p className="mt-2 text-lg font-medium text-navy-700">Erken Kayıt</p>
          <p className="text-sm text-gray-500">{site.importantDates.earlyRegDeadline}</p>
        </div>
        <div className="card">
          <p className="section-label">Başlangıç</p>
          <p className="mt-2 text-lg font-medium text-navy-700">Kongre Başlıyor</p>
          <p className="text-sm text-gray-500">{site.importantDates.congressStart}</p>
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-content px-5">
          <p className="section-label mb-2 text-center">Rakamlarla Kongremiz</p>
          <h2 className="mb-10 text-center text-2xl font-medium text-navy-700">
            Uluslararası Buluşmanın Boyutu
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-semibold text-teal-600">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-navy-700">{s.label}</div>
                <div className="mt-1 text-xs text-gray-500">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="section-label mb-2">Davet</p>
            <h2 className="mb-4 text-2xl font-medium text-navy-700">
              Değerli Meslektaşlarımız
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {invitationLetter.paragraphs[0]}
            </p>
            <Link
              href="/davet"
              className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Devamını Oku →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {presidents.map((p) => (
              <div key={p.name} className="card text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-sm font-medium text-navy-700">
                  {p.name
                    .split(" ")
                    .slice(-2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <p className="text-sm font-medium text-navy-700">{p.name}</p>
                <p className="text-xs text-gray-500">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 px-5 py-16">
        <div className="mx-auto max-w-content text-center">
          <p className="section-label mb-2">Bilimsel Program</p>
          <h2 className="mb-3 text-2xl font-medium text-navy-700">Program Hazırlanıyor</h2>
          <p className="mx-auto max-w-lg text-sm text-gray-600">
            Kongremizin bilimsel programı hazırlanmaktadır. Program kesinleştiğinde bu
            alanda detaylı şekilde yayınlanacaktır.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-content gap-6 px-5 py-16 sm:grid-cols-2">
        <div className="card">
          <p className="section-label">Erken Kayıt Açık</p>
          <h3 className="mt-2 text-lg font-medium text-navy-700">Kayıt Olun</h3>
          <p className="mt-2 text-sm text-gray-600">
            Erken kayıt ücretleri {site.importantDates.earlyRegDeadline} tarihine kadar
            geçerlidir. Üyelik durumuna göre fiyat farklılaşır.
          </p>
          <Link
            href="/kayit-konaklama"
            className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Kayıt Sistemi →
          </Link>
        </div>
        <div className="card">
          <p className="section-label">Son Tarih {site.importantDates.abstractDeadline}</p>
          <h3 className="mt-2 text-lg font-medium text-navy-700">Bildiri Gönderin</h3>
          <p className="mt-2 text-sm text-gray-600">
            Bildiri özetlerinizi online sistem üzerinden, yazım kurallarına uygun şekilde
            gönderebilirsiniz.
          </p>
          <Link
            href="/bildiri"
            className="mt-4 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Bildiri Sistemi →
          </Link>
        </div>
      </section>
    </>
  );
}
