import PageHeader from "@/components/PageHeader";
import { invitationLetter } from "@/lib/site-data";

export const metadata = { title: "Davet" };

export default function DavetPage() {
  return (
    <>
      <PageHeader title="Davet" breadcrumb="Davet" />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <p className="mb-6 text-lg font-medium text-navy-700">Değerli Meslektaşlarımız,</p>
        {invitationLetter.paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-sm leading-relaxed text-gray-600">
            {p}
          </p>
        ))}
        <p className="mt-8 text-sm text-gray-600">Saygılarımızla,</p>
        <div className="mt-4 flex flex-wrap gap-8">
          {invitationLetter.authors.map((a) => (
            <div key={a.name}>
              <p className="text-sm font-medium text-navy-700">{a.name}</p>
              <p className="text-xs text-gray-500">{a.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
