"use client";

import { useCallback, useId, useState } from "react";
import { DemoModuleLinks } from "@/components/demo/DemoModuleLinks";
import { DemoUpgradePanel } from "@/components/demo/DemoUpgradePanel";
import { DemoWidgetShell } from "@/components/demo/DemoWidgetShell";
import {
  buildPasswordGenRegisterUrl,
  buildPasswordGenIdeasUrl,
  PASSWORD_GEN_CABINET_FEATURES,
  PASSWORD_GEN_UPGRADE_HINT,
} from "@/lib/demo/password-generator-demo";
import {
  generatePasswordBatch,
  isPasswordGenOptionsInvalid,
  PASSWORD_GEN_PRESETS,
  type PasswordGenOptions,
  type PasswordGenPreset,
} from "@/lib/demo/password-generator-process";

const DEMO_FEATURES = [
  "Цифры, заглавные и строчные буквы, спецсимволы",
  "Длина от 1 до 50 символов",
  "5 вариантов за один клик",
  "Пресеты: надёжный, буквы, PIN",
  "Без лимитов на этой странице",
] as const;

const DEFAULT_OPTIONS: PasswordGenOptions = {
  enums: true,
  upperCase: true,
  lowerCase: true,
  specialSymbols: true,
  countSymbols: 15,
};

type Props = {
  nested?: boolean;
};

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function PasswordGeneratorDemoWidget({ nested }: Props) {
  const lengthId = useId();
  const [options, setOptions] = useState<PasswordGenOptions>(DEFAULT_OPTIONS);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const applyPreset = (preset: PasswordGenPreset) => {
    setOptions({ ...PASSWORD_GEN_PRESETS[preset] });
    setError(null);
  };

  const toggle = (key: keyof Omit<PasswordGenOptions, "countSymbols">) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    setError(null);
  };

  const setLength = (value: number) => {
    const n = Math.min(50, Math.max(1, Math.floor(value) || 1));
    setOptions((prev) => ({ ...prev, countSymbols: n }));
    setError(null);
  };

  const generate = useCallback(() => {
    if (isPasswordGenOptionsInvalid(options)) {
      setError("Выберите хотя бы одну группу символов и длину от 1 до 50.");
      setPasswords([]);
      return;
    }
    setError(null);
    setPasswords(generatePasswordBatch(options, 5));
  }, [options]);

  const handleCopy = async (pwd: string) => {
    await copyText(pwd);
    setCopied(pwd);
    setTimeout(() => setCopied(null), 2000);
  };

  const demoBody = (
    <>
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-brand-50 px-4 py-3.5 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Без регистрации</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          Генерируйте пароли сколько угодно — <span className="font-semibold text-slate-900">без лимитов</span>.
          В кабинете — сохранение с комментариями и доступ к остальным модулям платформы.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="me-1 self-center text-xs text-slate-500">Пресеты:</span>
            {(
              [
                ["strong", "Надёжный (16)"],
                ["letters", "Буквы (15)"],
                ["pin", "Пин (6 цифр)"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                onClick={() => applyPreset(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <fieldset className="space-y-2.5">
            <legend className="mb-2 text-sm font-semibold text-slate-900">Настройки генератора</legend>
            {(
              [
                ["enums", "Цифры"],
                ["upperCase", "Заглавные буквы"],
                ["lowerCase", "Строчные буквы"],
                ["specialSymbols", "Спецсимволы %, *, ), ?, @, #, $, ~"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600"
                  checked={!!options[key]}
                  onChange={() => toggle(key)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700" htmlFor={lengthId}>
              Количество символов:{" "}
              <span className="font-bold tabular-nums text-brand-700">{options.countSymbols}</span>
            </label>
            <input
              id={lengthId}
              type="range"
              min={1}
              max={50}
              value={options.countSymbols}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-2 w-full accent-brand-600"
            />
            <input
              type="number"
              min={1}
              max={50}
              value={options.countSymbols}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-2 w-24 rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
              aria-label="Длина пароля"
            />
          </div>

          <button
            type="button"
            onClick={generate}
            className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Сгенерировать пароль
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-800">Сгенерированные пароли</p>
          {error && (
            <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900" role="alert">
              {error}
            </p>
          )}
          {!error && passwords.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">Нажмите «Сгенерировать пароль» — появятся 5 вариантов.</p>
          )}
          {passwords.length > 0 && (
            <ul className="mt-3 space-y-2">
              {passwords.map((pwd) => (
                <li
                  key={pwd}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <code className="min-w-0 flex-1 break-all font-mono text-sm text-slate-900">{pwd}</code>
                  <button
                    type="button"
                    onClick={() => void handleCopy(pwd)}
                    className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    {copied === pwd ? "Скопировано" : "Копировать"}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 rounded-lg border border-brand-100 bg-brand-50/80 px-3 py-2 text-xs leading-relaxed text-slate-600">
            <strong className="text-slate-800">В кабинете:</strong> сохраняйте пароли с комментариями — без логина, email и названия
            сервиса; только абстрактная пометка для себя.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <DemoUpgradePanel
          registerUrl={buildPasswordGenRegisterUrl()}
          remaining={1}
          maxRuns={1}
          fullMaxChars={0}
          moduleTitle="платформы Титло"
          showRemaining={false}
          upgradeHint={PASSWORD_GEN_UPGRADE_HINT}
          details={PASSWORD_GEN_CABINET_FEATURES}
        />
      </div>

      <div className="mt-4">
        <DemoModuleLinks
          links={[
            { href: "/services/", label: "Все модули" },
            { href: buildPasswordGenIdeasUrl(), label: "Доска идей" },
            { href: "/utm-metki/", label: "UTM-метки" },
          ]}
        />
      </div>
    </>
  );

  if (nested) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <ul className="mb-6 flex flex-wrap gap-2 lg:hidden">
          {DEMO_FEATURES.map((f) => (
            <li
              key={f}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">{demoBody}</div>
          <aside className="sticky top-20 hidden self-start lg:block">
            <div className="rounded-xl border border-brand-100 bg-gradient-to-b from-brand-50 to-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">В демо</p>
              <ul className="mt-4 space-y-3">
                {DEMO_FEATURES.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <DemoWidgetShell
      title="Сгенерируйте пароль прямо здесь"
      lead="Как в кабинете: цифры, регистр, спецсимволы и длина до 50. Пять вариантов за клик — без лимитов и регистрации."
      features={DEMO_FEATURES}
    >
      {demoBody}
    </DemoWidgetShell>
  );
}
