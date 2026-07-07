import { logoutUser } from "@/lib/actions/auth-actions";

const ROLE_LABELS = {
  AUTHOR: "Yazar",
  REVIEWER: "Hakem",
  COMMITTEE: "Komite",
  ADMIN: "Yönetici",
};

export default function DashboardShell({ session, title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-content px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 pb-6">
        <div>
          <p className="section-label mb-1">{ROLE_LABELS[session.role] || "Panel"}</p>
          <h1 className="text-2xl font-medium text-navy-700">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-navy-700">{session.name}</p>
            <p className="text-xs text-gray-500">{session.email}</p>
          </div>
          <form action={logoutUser}>
            <button
              type="submit"
              className="rounded-md border border-navy-100 px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-navy-50"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </div>
      {children}
    </section>
  );
}
