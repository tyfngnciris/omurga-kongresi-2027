"use client";

import { useFormState, useFormStatus } from "react-dom";
import { STATUS_LABELS } from "@/lib/abstract-constants";

const inputClass =
  "w-full rounded-md border border-navy-100 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Kaydediliyor..." : "Kararı Kaydet"}
    </button>
  );
}

const DECISION_STATUSES = ["DEGERLENDIRMEDE", "REVIZYON_ISTENDI", "KABUL_EDILDI", "REDDEDILDI", "PROGRAMLANDI"];

export default function DecisionForm({ action, currentStatus, currentNote }) {
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="card space-y-4">
      <p className="text-sm font-medium text-navy-700">Nihai Karar</p>
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{state.success}</p>
      )}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">Durum</label>
        <select name="status" defaultValue={currentStatus} className={inputClass}>
          {DECISION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">Yazara İletilecek Not</label>
        <textarea name="committeeNote" rows={3} defaultValue={currentNote} className={inputClass} />
      </div>
      <SubmitButton />
    </form>
  );
}
