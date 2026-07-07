"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { registerAuthor } from "@/lib/actions/auth-actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      {pending ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
    </button>
  );
}

export default function KayitPage() {
  const [state, formAction] = useFormState(registerAuthor, null);

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <p className="section-label mb-2 text-center">Bildiri Sistemi</p>
      <h1 className="mb-8 text-center text-2xl font-medium text-navy-700">
        Yazar Hesabı Oluştur
      </h1>

      <form action={formAction} className="card space-y-4">
        {state?.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        )}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Ad Soyad *</label>
          <input
            name="name"
            required
            className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            placeholder="Adınız ve soyadınız"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Kurum</label>
          <input
            name="institution"
            className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            placeholder="Çalıştığınız kurum"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">E-Posta *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            placeholder="ornek@eposta.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">Şifre *</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            placeholder="En az 6 karakter"
          />
        </div>
        <SubmitButton />
        <p className="text-center text-xs text-gray-500">
          Zaten hesabınız var mı?{" "}
          <Link href="/bildiri/giris" className="font-medium text-teal-600 hover:text-teal-700">
            Giriş yapın
          </Link>
        </p>
      </form>
    </section>
  );
}
