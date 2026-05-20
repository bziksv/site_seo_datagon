"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavMenuIcon } from "@/lib/module-icons";
import { LK_URL, NAV_COMPANY, NAV_MODULES, SITE } from "@/lib/site";

const COMPANY_ICONS: Record<string, string> = {
  "/about/": "🏢",
  "/news/": "📰",
};

const menuLinkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-brand-50 hover:text-brand-700";

const navItemClass =
  "rounded-lg border border-transparent px-3 py-2 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-sm";

const navItemActiveClass =
  "rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-brand-700 shadow-sm";

const dropdownPanelClass =
  "absolute left-0 z-[70] mt-2 rounded-xl border border-slate-200 bg-white shadow-lg";

export function Header() {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!companyOpen && !modulesOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (companyRef.current?.contains(target) || modulesRef.current?.contains(target)) return;
      setCompanyOpen(false);
      setModulesOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCompanyOpen(false);
        setModulesOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [companyOpen, modulesOpen]);

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-visible px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg border border-transparent p-1 transition hover:border-brand-200 hover:bg-brand-50/50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="text-xl font-bold text-brand-600">{SITE.name}</span>
        </Link>

        <nav className="relative hidden items-center gap-1 overflow-visible text-sm font-medium text-slate-700 lg:flex">
          <div ref={companyRef} className={`relative ${companyOpen ? "z-[60]" : ""}`}>
            <button
              type="button"
              className={companyOpen ? navItemActiveClass : navItemClass}
              aria-expanded={companyOpen}
              onClick={() => {
                setCompanyOpen((v) => !v);
                setModulesOpen(false);
              }}
            >
              Компания
            </button>
            {companyOpen && (
              <div className={`${dropdownPanelClass} min-w-[180px] py-2`}>
                {NAV_COMPANY.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={menuLinkClass}
                    onClick={() => setCompanyOpen(false)}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-base" aria-hidden>
                      {COMPANY_ICONS[item.href] ?? "📌"}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div ref={modulesRef} className={`relative ${modulesOpen ? "z-[60]" : ""}`}>
            <button
              type="button"
              className={modulesOpen ? navItemActiveClass : navItemClass}
              aria-expanded={modulesOpen}
              onClick={() => {
                setModulesOpen((v) => !v);
                setCompanyOpen(false);
              }}
            >
              Модули сервиса
            </button>
            {modulesOpen && (
              <div
                className={`${dropdownPanelClass} max-h-[70vh] w-[min(100vw-2rem,380px)] overflow-y-auto p-1.5`}
              >
                {NAV_MODULES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={menuLinkClass}
                    onClick={() => setModulesOpen(false)}
                  >
                    <NavMenuIcon href={item.href} />
                    <span className="min-w-0 leading-snug">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/services/" className={navItemClass}>
            Сервисы
          </Link>
          <Link href="/tarify/" className={navItemClass}>
            Тарифы
          </Link>
          <Link href="/contact/" className={navItemClass}>
            Контакты
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={`${LK_URL}/login`}
            className={`${navItemClass} text-slate-700`}
          >
            Вход
          </a>
          <a
            href={`${LK_URL}/register`}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md"
          >
            Регистрация
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition hover:border-brand-300 hover:bg-brand-50 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          Меню
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 px-4 py-4 lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Компания</p>
          {NAV_COMPANY.map((item) => (
            <Link key={item.href} href={item.href} className={menuLinkClass} onClick={() => setMobileOpen(false)}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-50 text-sm" aria-hidden>
                {COMPANY_ICONS[item.href] ?? "📌"}
              </span>
              {item.label}
            </Link>
          ))}
          <p className="mb-2 mt-4 text-xs font-semibold uppercase text-slate-500">Модули</p>
          {NAV_MODULES.map((item) => (
            <Link key={item.href} href={item.href} className={menuLinkClass} onClick={() => setMobileOpen(false)}>
              <NavMenuIcon href={item.href} size="sm" />
              <span className="min-w-0">{item.label}</span>
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-4">
            <Link href="/services/" className="rounded-lg px-2 py-2 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
              Сервисы
            </Link>
            <Link href="/tarify/" className="rounded-lg px-2 py-2 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
              Тарифы
            </Link>
            <Link href="/contact/" className="rounded-lg px-2 py-2 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
              Контакты
            </Link>
            <a href={`${LK_URL}/login`} className="rounded-lg px-2 py-2 hover:bg-brand-50">
              Вход
            </a>
            <a href={`${LK_URL}/register`} className="rounded-lg px-2 py-2 font-medium text-brand-600 hover:bg-brand-50">
              Регистрация
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
