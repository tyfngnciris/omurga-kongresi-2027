import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Program" };

export default function ProgramPage() {
  return (
    <>
      <PageHeader title="Bilimsel Program" breadcrumb="Program" />
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-50">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-teal-600" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mb-3 text-xl font-medium text-navy-700">Yakında Açıklanacaktır</h2>
        <p className="mx-auto max-w-md text-sm text-gray-600">
          Kongremizin bilimsel programı hazırlanmaktadır. Program kesinleştiğinde gün ve
          oturum bazında detaylı akış, konuşmacı ve salon bilgileri bu sayfada
          yayınlanacaktır.
        </p>
      </section>
    </>
  );
}
