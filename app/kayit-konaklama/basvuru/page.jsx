import PageHeader from "@/components/PageHeader";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata = { title: "Kongre Kaydı" };

export default function KayitBasvuruPage() {
  return (
    <>
      <PageHeader title="Kongre Kaydı" breadcrumb="Kayıt & Konaklama / Kayıt Formu" />

      <section className="mx-auto max-w-content px-5 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-sm text-gray-600">
            Aşağıdaki formu doldurarak kongre kaydınızı oluşturabilirsiniz. Güncel ücretleri{" "}
            <a href="/kayit-konaklama" className="text-teal-700 underline">
              Kayıt &amp; Konaklama
            </a>{" "}
            sayfasından inceleyebilirsiniz.
          </p>
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
