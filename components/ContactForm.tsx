"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      agree: data.get("agree") === "on",
    };

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; fallbackEmail?: string };

      if (!res.ok) {
        setState("error");
        const msg =
          json.error === "mail_send_failed"
            ? "Не удалось отправить письмо. Попробуйте позже или напишите напрямую."
            : json.error === "contact_unavailable"
              ? "Форма временно недоступна."
              : (json.error ?? "Не удалось отправить форму");
        setError(json.fallbackEmail ? `${msg} ${json.fallbackEmail}` : msg);
        return;
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
      setError(`Не удалось отправить. Напишите на ${SITE.email}`);
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        <p className="font-medium">Спасибо! Вопрос отправлен.</p>
        <p className="mt-2 text-sm">Мы ответим на указанный e-mail в рабочее время.</p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
          onClick={() => setState("idle")}
        >
          Отправить ещё один вопрос
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Задать вопрос</h2>
      <p className="text-sm text-slate-600">Заполните форму — мы свяжемся с вами по e-mail.</p>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
          Имя <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700">
          Телефон
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          Вопрос <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <label className="flex gap-2 text-sm text-slate-600">
        <input name="agree" type="checkbox" required defaultChecked className="mt-1" />
        <span>
          Согласен с{" "}
          <Link href="/legal/doc/privacy-policy/" className="text-brand-600 hover:text-brand-700">
            политикой обработки персональных данных
          </Link>
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {state === "loading" ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}
