import PageHeader from "@/components/PageHeader";
import {
  presidents,
  secretaries,
  organizingCommittee,
  boardMembers,
} from "@/lib/site-data";

export const metadata = { title: "Kurullar" };

function PersonCard({ name, role }) {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((n) => n[0])
    .join("");
  return (
    <div className="card flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 text-sm font-medium text-navy-700">
        {initials}
      </div>
      <div>
        <p className="text-sm font-medium text-navy-700">{name}</p>
        {role && <p className="text-xs text-gray-500">{role}</p>}
      </div>
    </div>
  );
}

export default function KurullarPage() {
  return (
    <>
      <PageHeader title="Kongre Kurulları" breadcrumb="Kurullar" />

      <section className="mx-auto max-w-content px-5 py-16">
        <p className="section-label mb-6">Kongre Düzenleme Kurulu</p>

        <h3 className="mb-4 text-sm font-medium text-gray-500">Kongre Başkanları</h3>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {presidents.map((p) => (
            <PersonCard key={p.name} name={p.name} role={p.role} />
          ))}
        </div>

        <h3 className="mb-4 text-sm font-medium text-gray-500">Kongre Sekreterleri</h3>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {secretaries.map((p) => (
            <PersonCard key={p.name} name={p.name} role={p.role} />
          ))}
        </div>

        <h3 className="mb-4 text-sm font-medium text-gray-500">Üyeler</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {organizingCommittee.map((name) => (
            <PersonCard key={name} name={name} />
          ))}
        </div>
      </section>

      <section className="bg-navy-50 px-5 py-16">
        <div className="mx-auto max-w-content">
          <p className="section-label mb-6">Türk Omurga Derneği</p>
          <h3 className="mb-6 text-lg font-medium text-navy-700">Yönetim Kurulu</h3>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PersonCard name={boardMembers.president} role="Başkan" />
            <PersonCard name={boardMembers.vicePresident} role="İkinci Başkan" />
            <PersonCard name={boardMembers.treasurer} role="Sayman" />
            <PersonCard name={boardMembers.secretaryGeneral} role="Genel Sekreter" />
          </div>

          <h4 className="mb-4 text-sm font-medium text-gray-500">Üyeler</h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.members.map((name) => (
              <PersonCard key={name} name={name} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
