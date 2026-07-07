"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitRegistration } from "@/lib/actions/registration-actions";
import { CATEGORY_LABELS, ACCOMMODATION_LABELS } from "@/lib/registration-constants";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Gönderiliyor..." : "Kayıt Talebini Gönder"}
    </button>
  );
}

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none";

export default function RegistrationForm() {
  const [state, formAction] = useFormState(submitRegistration, null);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="card space-y-4">
        <p className="text-sm font-medium text-navy-700">Kişisel Bilgiler</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ad Soyad *">
            <input name="fullName" required className={inputClass} />
          </Field>
          <Field label="E-Posta *">
            <input type="email" name="email" required className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon *">
            <input name="phone" required className={inputClass} />
          </Field>
          <Field label="Kurum">
            <input name="institution" className={inputClass} />
          </Field>
        </div>
        <Field label="Kayıt Kategorisi *" hint="Ücret tablosundaki kategoriye göre seçin">
          <select name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Seçiniz
            </option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="card space-y-4">
        <p className="text-sm font-medium text-navy-700">Konaklama</p>
        <Field label="Konaklama Seçimi">
          <select name="accommodation" defaultValue="YOK" className={inputClass}>
            {Object.entries(ACCOMMODATION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="card space-y-4">
        <p className="text-sm font-medium text-navy-700">Fatura Bilgileri</p>
        <Field label="Fatura Ünvanı *" hint="Şahıs için ad-soyad, kurum için kurum ünvanı">
          <input name="invoiceTitle" required className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Vergi Dairesi">
            <input name="taxOffice" className={inputClass} />
          </Field>
          <Field label="Vergi No / TC Kimlik No">
            <input name="taxNumber" className={inputClass} />
          </Field>
        </div>
        <Field label="Fatura Adresi">
          <textarea name="invoiceAddress" rows={2} className={inputClass} />
        </Field>
      </div>

      <div className="rounded-md bg-navy-50 p-3 text-xs text-navy-700">
        Not: Online ödeme sistemi bir sonraki aşamada aktif olacaktır. Kayıt talebiniz
        alındıktan sonra kongre sekretaryası ödeme adımları için sizinle iletişime geçecektir.
      </div>

      <SubmitButton />
    </form>
  );
}
