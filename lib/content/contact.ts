import { SITE } from "@/lib/site";

export const CONTACT_LEAD =
  "Мы всегда рады общению с вами — по телефону, e-mail и в офисе по предварительной договорённости.";

/** Виджет карты с redbox.su/contact (конструктор Яндекс.Карт) */
export const OFFICE_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?um=constructor%3Abf70895a37409468935a1b6feb83662b2498a354670c55e9cbd1b25cf0d4b066&source=constructor";

export const OFFICES = [
  {
    name: "Главный офис",
    address: "г. Воронеж, Московский пр-т., 19",
    phone: "+7-473-203-01-24",
    hours: "Ежедневно с 10:00 до 19:00",
  },
] as const;

export const REQUISITES = {
  org: "ИП Виленская Юлия Андреевна",
  inn: "362903774541",
  ogrnip: "316366800107911",
  address: "394030, г. Воронеж, ул. Революции 1905 г., 31Е-174",
} as const;

export const BANK = {
  account: "40802810300000019189",
  bank: 'АО «ТИНЬКОФФ БАНК», Москва',
  corr: "30101810145250000974",
  bik: "044525974",
} as const;

export const SUPPORT = {
  hours: SITE.supportHours,
  phone: SITE.phone,
  email: SITE.email,
} as const;
