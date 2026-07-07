import Link from "next/link";
import { site } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-xs font-semibold text-white">
              TO
            </span>
            <span className="text-sm font-medium text-white">{site.name}</span>
          </div>
          <p className="text-sm text-navy-100/80">
            {site.dateLabel}
            <br />
            {site.venue}
            <br />
            Türkiye
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-white">Menü</h4>
          <ul className="space-y-2 text-sm text-navy-100/80">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-white">Kongre Organizasyonu</h4>
          <p className="text-sm text-navy-100/80">
            {site.contact.orgName}
            <br />
            {site.contact.address}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-white">İletişim</h4>
          <ul className="space-y-2 text-sm text-navy-100/80">
            <li>{site.contact.phone}</li>
            <li>{site.contact.email}</li>
            <li>
              <a href={site.contact.instagram} className="hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-navy-100/60">
        © {new Date().getFullYear()} {site.organizer} · Tüm hakları saklıdır
      </div>
    </footer>
  );
}
