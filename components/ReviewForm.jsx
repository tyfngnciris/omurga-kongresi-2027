"use client";

import { useFormState, useFormStatus } from "react-dom";
import { DECISION_LABELS } from "@/lib/abstract-constants";

const inputClass =
  "w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Kaydediliyor..." : "Değerlendirmeyi Gönder"}
    </button>
  );
}

function ScoreField({ name, label }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">{label} (1-5)</label>
      <select name={name} required className={inputClass} defaultValue="">
        <option value="" disabled>
          Puan seçin
        </option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ReviewForm({ action }) {
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="card space-y-5">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <ScoreField name="originality" label="Özgünlük" />
        <ScoreField name="methodology" label="Yöntem" />
        <ScoreField name="contribution" label="Bilimsel Katkı" />
        <ScoreField name="presentation" label="Sunum Uygunluğu" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">Yorumlar</label>
        <textarea name="comments" rows={4} className={inputClass} placeholder="Yazara iletilecek yorumlarınız (opsiyonel)" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">Kararınız *</label>
        <div className="flex flex-wrap gap-4">
          {Object.entries(DECISION_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="decision" value={value} required className="h-4 w-4" />
              {label}
            </label>
          ))}
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
