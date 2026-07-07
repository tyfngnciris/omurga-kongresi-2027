import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import {
  CATEGORY_LABELS,
  ACCOMMODATION_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/registration-constants";

export const metadata = { title: "Kayıt Yönetimi" };
export const dynamic = "force-dynamic";

function Badge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        STATUS_COLORS[status] || "bg-navy-50 text-navy-700"
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default async function AdminKayitlarPage({ searchParams }) {
  const session = await requireRole(["ADMIN", "COMMITTEE"]);

  const categoryFilter = searchParams?.kategori;
  const registrations = await prisma.registration.findMany({
    where: categoryFilter ? { category: categoryFilter } : {},
    orderBy: { createdAt: "desc" },
  });

  const allCount = await prisma.registration.count();
  const counts = await prisma.registration.groupBy({ by: ["category"], _count: true });
  const countMap = Object.fromEntries(counts.map((c) => [c.category, c._count]));
  const accommodationCount = registrations.filter((r) => r.accommodation !== "YOK").length;

  return (
    <DashboardShell
      session={session}
      title="Kayıt Yönetimi"
      subtitle={`Toplam ${allCount} kayıt · ${accommodationCount} konaklamalı`}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/admin/kayitlar"
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            !categoryFilter ? "bg-navy-700 text-white" : "bg-navy-50 text-navy-700"
          }`}
        >
          Tümü ({allCount})
        </a>
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <a
            key={value}
            href={`/admin/kayitlar?kategori=${value}`}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              categoryFilter === value ? "bg-navy-700 text-white" : "bg-navy-50 text-navy-700"
            }`}
          >
            {label} ({countMap[value] || 0})
          </a>
        ))}
      </div>

      {registrations.length === 0 ? (
        <div className="card text-center text-sm text-gray-500">Bu filtrede kayıt yok.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs text-gray-500">
                <th className="py-2 pr-4">Takip Kodu</th>
                <th className="py-2 pr-4">Ad Soyad</th>
                <th className="py-2 pr-4">E-Posta / Telefon</th>
                <th className="py-2 pr-4">Kategori</th>
                <th className="py-2 pr-4">Konaklama</th>
                <th className="py-2 pr-4">Durum</th>
                <th className="py-2 pr-4">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-navy-50 last:border-0">
                  <td className="py-3 pr-4 text-xs text-gray-400">{r.trackingCode}</td>
                  <td className="py-3 pr-4 font-medium text-navy-700">{r.fullName}</td>
                  <td className="py-3 pr-4 text-xs text-gray-500">
                    {r.email}
                    <br />
                    {r.phone}
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-600">{CATEGORY_LABELS[r.category]}</td>
                  <td className="py-3 pr-4 text-xs text-gray-600">
                    {ACCOMMODATION_LABELS[r.accommodation]}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge status={r.status} />
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-400">
                    {r.createdAt.toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
