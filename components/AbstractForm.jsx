"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CATEGORIES, PRESENTATION_TYPE_LABELS, wordCount } from "@/lib/abstract-constants";

const AUTHOR_SLOTS = 5;

function SubmitButton({ label, pendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? pendingLabel : label}
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

export default function AbstractForm({ action, defaultValues, submitLabel, pendingLabel }) {
  const [state, formAction] = useFormState(action, null);
  const d = defaultValues || {};
  const authors = d.authors && d.authors.length ? d.authors : [{}];

  const [wordText, setWordText] = useState({
    purpose: d.purpose || "",
    method: d.method || "",
    findings: d.findings || "",
    conclusion: d.conclusion || "",
  });

  const totalWords =
    wordCount(wordText.purpose) +
    wordCount(wordText.method) +
    wordCount(wordText.findings) +
    wordCount(wordText.conclusion);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="card space-y-4">
        <p className="text-sm font-medium text-navy-700">Bildiri Bilgileri</p>
        <Field label="Başlık *">
          <input name="title" required defaultValue={d.title} className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Konu Kategorisi *">
            <select name="category" required defaultValue={d.category || ""} className={inputClass}>
              <option value="" disabled>
                Seçiniz
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sunum Tercihi *">
            <select
              name="presentationType"
              required
              defaultValue={d.presentationType || ""}
              className={inputClass}
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {Object.entries(PRESENTATION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Anahtar Kelimeler" hint="Virgülle ayırarak yazın">
          <input name="keywords" defaultValue={d.keywords} className={inputClass} />
        </Field>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-navy-700">Özet Metni</p>
          <p className={`text-xs ${totalWords > 400 ? "text-red-600" : "text-gray-400"}`}>
            {totalWords} / 400 kelime
          </p>
        </div>
        <Field label="Amaç *">
          <textarea
            name="purpose"
            required
            rows={3}
            defaultValue={d.purpose}
            onChange={(e) => setWordText((w) => ({ ...w, purpose: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Yöntem *">
          <textarea
            name="method"
            required
            rows={3}
            defaultValue={d.method}
            onChange={(e) => setWordText((w) => ({ ...w, method: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Bulgular *">
          <textarea
            name="findings"
            required
            rows={3}
            defaultValue={d.findings}
            onChange={(e) => setWordText((w) => ({ ...w, findings: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Sonuç *">
          <textarea
            name="conclusion"
            required
            rows={3}
            defaultValue={d.conclusion}
            onChange={(e) => setWordText((w) => ({ ...w, conclusion: e.target.value }))}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="card space-y-4">
        <p className="text-sm font-medium text-navy-700">Yazarlar</p>
        <p className="text-xs text-gray-400">
          En az bir yazar girin ve sorumlu yazarı işaretleyin. Boş bırakılan satırlar dikkate alınmaz.
        </p>
        {Array.from({ length: AUTHOR_SLOTS }).map((_, i) => {
          const a = authors[i] || {};
          return (
            <div key={i} className="grid gap-3 border-t border-navy-50 pt-4 first:border-0 first:pt-0 sm:grid-cols-[1fr_1fr_auto]">
              <input
                name={`authorName_${i}`}
                placeholder={`Yazar ${i + 1} - Ad Soyad`}
                defaultValue={a.name}
                className={inputClass}
              />
              <input
                name={`authorInstitution_${i}`}
                placeholder="Kurum"
                defaultValue={a.institution}
                className={inputClass}
              />
              <label className="flex items-center gap-2 whitespace-nowrap text-xs text-gray-500">
                <input
                  type="checkbox"
                  name={`authorCorresponding_${i}`}
                  defaultChecked={a.isCorresponding}
                  className="h-4 w-4"
                />
                Sorumlu yazar
              </label>
            </div>
          );
        })}
      </div>

      <SubmitButton label={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}
