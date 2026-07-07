"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site-data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-sm font-semibold text-white">
            TO
          </span>
          <span className="text-sm font-medium leading-tight text-navy-700">
            17. Uluslararası
            <br />
            Türk Omurga Kongresi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-navy-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-xs font-medium text-navy-700">TR</span>
          <span className="text-xs text-gray-400">EN</span>
          <Link href="/kayit-konaklama" className="btn-primary py-2 text-xs">
            Kayıt Ol
          </Link>
        </div>

        <button
          aria-label="Menüyü aç"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className="h-0.5 w-6 bg-navy-700" />
          <span className="h-0.5 w-6 bg-navy-700" />
          <span className="h-0.5 w-6 bg-navy-700" />
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/kayit-konaklama" className="btn-primary mt-2 py-2 text-xs">
              Kayıt Ol
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
