import { site } from "@/lib/site-data";

export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="bg-navy-700 px-5 py-14 text-center text-white">
      <p className="mb-2 text-xs text-teal-100/80">
        {site.dateLabel} · {site.venue}
      </p>
      <h1 className="text-2xl font-medium sm:text-3xl">{title}</h1>
      {breadcrumb && (
        <p className="mt-2 text-xs text-navy-100/70">Ana Sayfa / {breadcrumb}</p>
      )}
    </div>
  );
}
