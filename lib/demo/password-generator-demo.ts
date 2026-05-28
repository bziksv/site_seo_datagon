import { LK_URL } from "@/lib/site";

export const PASSWORD_GEN_DEMO_MODULE = "generator-paroley" as const;

export function buildPasswordGenRegisterUrl(): string {
  const u = new URL(`${LK_URL}/register`);
  u.searchParams.set("module", PASSWORD_GEN_DEMO_MODULE);
  u.searchParams.set("from", "demo");
  return u.toString();
}

export function buildPasswordGenIdeasUrl(): string {
  return `${LK_URL}/ideas`;
}

export const PASSWORD_GEN_CABINET_FEATURES = [
  "Сохранение паролей с комментариями — без логина, email и названия сервиса, только абстрактная пометка",
  "Десятки модулей: SEO, мониторинг, UTM, кластеризация, мета-теги и другие",
  "Доска идей — предложите улучшение, мы берём в работу и воплощаем",
  "Один кабинет для команды, агентства и фриланса",
] as const;

export const PASSWORD_GEN_UPGRADE_HINT =
  "Зарегистрируйтесь бесплатно — сохраняйте пароли с комментариями в кабинете, подключайте остальные модули платформы и предлагайте идеи на доске «Идеи».";
