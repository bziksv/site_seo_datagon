/**
 * Редакторские оверрайды v2 по модулям (концепция «Центр управления»).
 * Подмешиваются в buildModuleV2Config поверх классики.
 */
import type {
  ModuleV2Act,
  ModuleV2FooterUi,
  ModuleV2HeroUi,
  ModuleV2Metric,
  ModuleV2OrbitNode,
  ModuleV2PainGain,
  ModuleV2SectionCopy,
} from "@/lib/content/module-v2/types";

import { RELEVANCE_SCREENSHOTS } from "@/lib/content/analiz-relevantnosti-page";
import { COMPETITOR_SCREENSHOTS } from "@/lib/content/analiz-konkurentov-page";
import { SITE_MON_SCREENSHOTS } from "@/lib/content/monitoring-saytov-page";
import { META_MON_SCREENSHOTS } from "@/lib/content/proverka-meta-tegov-page";
import { WORD_GEN_SCREENSHOTS } from "@/lib/content/generator-slov-page";
import { TEXT_LENGTH_SCREENSHOTS } from "@/lib/content/podschet-dliny-teksta-page";
import { PW_GEN_SCREENSHOTS } from "@/lib/content/generator-paroley-page";
import { LIST_COMPARE_SCREENSHOTS } from "@/lib/content/sravnenie-spiskov-page";
import { DEDUP_SCREENSHOTS } from "@/lib/content/udalenie-dublikatov-page";
import { UTM_SCREENSHOTS } from "@/lib/content/utm-metki-page";
import { ROI_CALC_SCREENSHOTS } from "@/lib/content/kalkulyator-roi-page";
import { HTTP_HEADERS_SCREENSHOTS } from "@/lib/content/http-headers-page";
import { HTML_EDITOR_SCREENSHOTS } from "@/lib/content/html-redaktor-page";
import { UNIQUE_WORDS_SCREENSHOTS } from "@/lib/content/vydelenie-unikalnykh-slov-page";
import { LINK_TRACK_SCREENSHOTS } from "@/lib/content/otslezhivanie-ssylok-page";
import { DOMAIN_REG_SCREENSHOTS } from "@/lib/content/otslezhivanie-sroka-registratsii-domenov-page";
import { TEXT_ANAL_SCREENSHOTS } from "@/lib/content/analiz-teksta-page";
import { CLUSTER_SCREENSHOTS } from "@/lib/content/klasterizator-klyuchevykh-slov-page";

const S0 = "/modules/assets/3d7d72c85b4af88c.jpg";
const S1 = "/modules/assets/518ec5eeb1bee67f.jpg";
const S2 = S1;

export type ModuleV2Override = {
  eyebrow?: string;
  headline?: string;
  lead?: string;
  cta?: string;
  painGain?: Partial<ModuleV2PainGain>;
  acts?: readonly ModuleV2Act[];
  metrics?: readonly ModuleV2Metric[];
  orbit?: readonly ModuleV2OrbitNode[];
  hubTitle?: string;
  storySection?: Partial<ModuleV2SectionCopy>;
  metricSection?: Partial<ModuleV2SectionCopy>;
  optionsSection?: Partial<ModuleV2SectionCopy>;
  orbitSection?: Partial<ModuleV2SectionCopy & { hubTitle?: string }>;
  heroUi?: Partial<ModuleV2HeroUi>;
  footerUi?: Partial<ModuleV2FooterUi>;
  showSearchEngines?: boolean;
  videos?: readonly { id: string; title: string; description: string }[];
};

function act(
  n: string,
  title: string,
  lead: string,
  image: string,
  imageAlt: string,
  points: readonly string[],
  imageFocus?: string
): ModuleV2Act {
  return { act: n, title, lead, image, imageAlt, points, imageFocus };
}

function m(value: string, unit: string, note: string): ModuleV2Metric {
  return { value, unit, note };
}

const ORBIT = {
  relevance: { label: "Анализ релевантности", href: "/analiz-relevantnosti/", role: "ТОП и правки текста" },
  competitors: { label: "Анализ конкурентов", href: "/analiz-konkurentov/", role: "Кто в выдаче по фразам" },
  positions: { label: "Мониторинг позиций", href: "/monitoring-pozicii-sayta/", role: "Динамика по ключам" },
  meta: { label: "Мониторинг мета-тегов", href: "/proverka-meta-tegov-online/", role: "Title и description" },
  siteMon: { label: "Мониторинг сайтов", href: "/monitoring-saytov/", role: "Uptime и доступность" },
  links: { label: "Отслеживание ссылок", href: "/otslezhivanie-ssylok/", role: "Индексация URL" },
  http: { label: "HTTP headers", href: "/http-headers/", role: "Ответ сервера по URL" },
  cluster: { label: "Кластеризатор", href: "/klasterizator-klyuchevykh-slov/", role: "Группировка ядра" },
  wordGen: { label: "Генератор слов", href: "/generator_slov/", role: "Комбинации фраз" },
  textAn: { label: "Анализ текста", href: "/analiz-teksta/", role: "Статистика и тошнота" },
} as const;

function orbit(...nodes: ModuleV2OrbitNode[]): readonly ModuleV2OrbitNode[] {
  return nodes;
}

export const MODULE_V2_OVERRIDES: Record<string, ModuleV2Override> = {
  "analiz-relevantnosti": {
    eyebrow: "Центр управления контентом",
    headline: "Релевантность страницы — в одном отчёте",
    cta: "Запустить анализ релевантности",
    showSearchEngines: true,
    painGain: {
      painTitle: "Без системного анализа",
      pains: [
        "Сравниваете страницу с ТОПом вручную — вкладка за вкладкой",
        "Переспам и пробелы по словам видны после публикации",
        "TLP и облака собираете отдельно для копирайтера",
      ],
      gainTitle: "С отчётом Титло",
      gains: [
        "URL, регион и ТОП‑10/20 в одной форме",
        "Облака слов и рекомендации: добавить, убрать, усилить",
        "Повторный анализ после правок — в истории проекта",
      ],
    },
    acts: [
      act(
        "01",
        "Укажите URL и запрос",
        "Посадочная страница и ключевая фраза — точка входа в сравнение с выдачей.",
        RELEVANCE_SCREENSHOTS[0].src,
        RELEVANCE_SCREENSHOTS[0].caption,
        ["Регион поиска", "ТОП‑10 или ТОП‑20", "Исключение своих доменов"]
      ),
      act(
        "02",
        "Сравните с лидерами ниши",
        "Сервис снимает ТОП и сопоставляет ваш текст, мета и ссылки с конкурентами.",
        RELEVANCE_SCREENSHOTS[1].src,
        RELEVANCE_SCREENSHOTS[1].caption,
        ["Текстовые облака", "Зоны: текст · ссылки · мета", "Пересечение с ТОПом"],
        "65% top"
      ),
      act(
        "03",
        "Передайте правки в работу",
        "Список добавить / убрать / усилить — готовое ТЗ копирайтеру или в CMS.",
        RELEVANCE_SCREENSHOTS[1].src,
        "Рекомендации и экспорт TLP",
        ["Экспорт словосочетаний", "Повтор после правок", "Связка с мониторингом позиций"]
      ),
    ],
    metrics: [
      m("ТОП", "10/20", "сравнение с выдачей"),
      m("3", "зоны", "текст · ссылки · мета"),
      m("TLP", "экспорт", "списки для копирайтера"),
      m("∞", "проектов", "в личном кабинете"),
    ],
    orbit: orbit(ORBIT.competitors, ORBIT.positions, ORBIT.cluster, ORBIT.http),
    hubTitle: "Анализ релевантности",
    storySection: {
      title: "От URL до списка правок — три шага",
      lead: "Не «оценка ради оценки»: сценарий ведёт к конкретным изменениям на странице.",
    },
    metricSection: { title: "Что заложено в один прогон анализа" },
    optionsSection: {
      eyebrow: "Параметры анализа",
      title: "Что учитывается в отчёте",
      lead: "Регион, глубина ТОПа и зоны сравнения — без ручного сбора выдачи.",
    },
    heroUi: { keysFooter: "Запрос · URL", dynamicsFooter: "Отчёт · TLP" },
  },

  "analiz-konkurentov": {
    eyebrow: "Центр разведки по выдаче",
    headline: "Карта конкурентов по вашим ключам",
    cta: "Собрать матрицу конкурентов",
    showSearchEngines: true,
    painGain: {
      painTitle: "Без карты ниши",
      pains: [
        "ТОП по каждой фразе снимаете вручную — десятки вкладок",
        "Мета и вложенность конкурентов — в разных таблицах",
        "Стратегию строите на устаревшем срезе выдачи",
      ],
      gainTitle: "С анализом Титло",
      gains: [
        "Список ключей → сводная матрица доменов по региону",
        "Мета, вложенность и % в ТОП — в одном отчёте",
        "Экспорт для приоритетов в SEO и ТЗ",
      ],
    },
    acts: [
      act("01", "Загрузите семантику", "Фразы из файла или вставкой — ядро проекта в одном поле.", COMPETITOR_SCREENSHOTS[0]?.src ?? S0, "Список ключевых фраз", ["ТОП‑10/20", "Регион", "Пакетная проверка"]),
      act("02", "Снимите выдачу", "По каждому ключу — реальные URL из поиска, не «похожие сайты».", COMPETITOR_SCREENSHOTS[1]?.src ?? S1, "Матрица конкурентов", ["Домены в ТОПе", "Метатеги", "Вложенность страниц"], "65% top"),
      act("03", "Примите решения", "Кто доминирует, где разрыв по мета и структуре — для стратегии и правок.", COMPETITOR_SCREENSHOTS[2]?.src ?? S1, COMPETITOR_SCREENSHOTS[2]?.caption ?? "Сравнение посадочных", ["% в ТОП", "Экспорт", "Связка с релевантностью"]),
    ],
    metrics: [m("ТОП", "10/20", "по каждому ключу"), m("4", "среза", "ТОП · мета · вложенность · %"), m("∞", "ключей", "в одной проверке"), m("0", "₽", "старт в кабинете")],
    orbit: orbit(ORBIT.relevance, ORBIT.positions, ORBIT.meta, ORBIT.cluster),
    hubTitle: "Анализ конкурентов",
    storySection: { title: "От списка фраз до карты ниши" },
    heroUi: { keysFooter: "Ключи · регион", dynamicsFooter: "Матрица · экспорт" },
  },

  "monitoring-saytov": {
    eyebrow: "Центр доступности",
    headline: "Сайт на связи — без сюрпризов",
    cta: "Настроить мониторинг сайта",
    painGain: {
      painTitle: "Без автоматического контроля",
      pains: [
        "О падении узнаёте от клиента или случайной проверки",
        "Uptime считаете вручную по логам хостинга",
        "Нет единой истории инцидентов по проектам",
      ],
      gainTitle: "С мониторингом Титло",
      gains: [
        "Проверки по расписанию — HTTP, HTTPS, ключи на странице",
        "Email и Telegram при сбое",
        "Uptime и время ответа в отчёте кабинета",
      ],
    },
    acts: [
      act("01", "Создайте проект", "URL, интервал и таймаут — правила проверки в одной форме.", SITE_MON_SCREENSHOTS[0]?.src ?? S0, "Настройка проекта", ["Несколько сайтов", "GET / HTTPS", "Интервал проверок"]),
      act("02", "Получайте статус", "Сервер фиксирует код ответа, время и текст ошибки.", SITE_MON_SCREENSHOTS[1]?.src ?? S1, "История проверок", ["Uptime %", "Время ответа", "Описание сбоя"], "65% top"),
      act("03", "Реагируйте вовремя", "Оповещение уходит до эскалации от заказчика.", SITE_MON_SCREENSHOTS[1]?.src ?? S1, "Оповещения", ["Email", "Telegram", "Отчёт в кабинете"]),
    ],
    metrics: [m("24", "/7", "проверки по расписанию"), m("2", "канала", "email · telegram"), m("100", "%", "uptime в отчёте"), m("N", "сайтов", "в одном кабинете")],
    orbit: orbit(ORBIT.http, ORBIT.meta, ORBIT.positions, ORBIT.links),
    hubTitle: "Мониторинг сайтов",
    storySection: { title: "От настройки до алерта — три шага" },
    optionsSection: { title: "Что проверяет модуль" },
    heroUi: { keysFooter: "Проект · URL", dynamicsFooter: "Uptime · алерт" },
  },

  "proverka-meta-tegov-online": {
    eyebrow: "Центр разметки",
    headline: "Мета-теги под контролем",
    cta: "Проверить мета-теги",
    painGain: {
      painTitle: "Без снимка разметки",
      pains: [
        "Title и description смотрите вручную на сотнях URL",
        "Изменения на проде замечаете после просадки CTR",
        "Нет diff «было — стало» по canonical и H1",
      ],
      gainTitle: "С мониторингом мета",
      gains: [
        "До 500 URL в одном прогоне",
        "История снимков и сравнение версий",
        "Уведомления при изменении разметки",
      ],
    },
    acts: [
      act("01", "Соберите список URL", "Свой сайт или конкуренты — до 500 адресов за раз.", META_MON_SCREENSHOTS[0]?.src ?? S0, "Список страниц", ["Title · description", "Canonical", "H1–H3"]),
      act("02", "Снимите разметку", "Парсинг head без DevTools на каждой странице.", META_MON_SCREENSHOTS[1]?.src ?? S1, "Таблица мета", ["Noindex / nofollow", "Keywords", "Сравнение с прошлым"], "65% top"),
      act("03", "Отслеживайте изменения", "Сохранённый снимок — база для следующего прогона.", META_MON_SCREENSHOTS[1]?.src ?? S1, "История изменений", ["Δ по полям", "Экспорт", "Связка с релевантностью"]),
    ],
    metrics: [m("500", "URL", "в одной проверке"), m("6", "+", "полей в отчёте"), m("CTR", "контроль", "сниппета в поиске"), m("Δ", "версии", "было — стало")],
    orbit: orbit(ORBIT.relevance, ORBIT.competitors, ORBIT.positions, ORBIT.http),
    hubTitle: "Мониторинг мета-тегов",
    heroUi: { keysFooter: "URL · список", dynamicsFooter: "Снимок · diff" },
  },

  "generator_slov": {
    eyebrow: "Центр комбинаций",
    headline: "Семантика из блоков — за минуту",
    cta: "Собрать комбинации фраз",
    painGain: {
      painTitle: "Ручной перебор в Excel",
      pains: [
        "Сотни склеек «услуга + город» вручную",
        "Стоп-слова и порядок слов — отдельная возня",
        "Ошибки в скобках [] ломают выгрузку в Wordstat",
      ],
      gainTitle: "С генератором Титло",
      gains: [
        "Несколько блоков → все пересечения автоматически",
        "Длина фразы, минус-слова, порядок в []",
        "Готовый список для частотности и кластеризации",
      ],
    },
    acts: [
      act("01", "Разбейте на блоки", "Услуга, объект, гео — по смыслу, не одной простынёй.", WORD_GEN_SCREENSHOTS[0]?.src ?? S0, "Блоки слов", ["5+ блоков", "Синонимы", "Стоп-слова"]),
      act("02", "Задайте правила", "Длина, порядок, «в Москве» — в подсказках у полей.", WORD_GEN_SCREENSHOTS[0]?.src ?? S0, "Опции генерации", ["[] для Wordstat", "Минус-вхождения", "Лимит длины"]),
      act("03", "Заберите ядро", "Комбинации в буфер — дальше в Wordstat или кластеризатор.", WORD_GEN_SCREENSHOTS[1]?.src ?? S1, "Готовые фразы", ["Копирование списка", "Анализ конкурентов", "Кластеризатор"]),
    ],
    metrics: [m("∞", "фраз", "на Free"), m("5", "+", "блоков ввода"), m("4", "опции", "длина · порядок"), m("SEO", "готово", "для частотности")],
    orbit: orbit(ORBIT.cluster, ORBIT.competitors, ORBIT.relevance, ORBIT.positions),
    hubTitle: "Генератор слов",
    heroUi: { keysFooter: "Блоки · опции", dynamicsFooter: "Фразы · экспорт" },
  },

  "podschet-dliny-teksta": {
    eyebrow: "Центр текста",
    headline: "Длина и структура — сразу",
    cta: "Подсчитать текст",
    painGain: {
      painTitle: "Считаете в Word вручную",
      pains: [
        "Символы с пробелами и без — разные цифры в ТЗ",
        "Вода и повторы не видны до сдачи копирайтеру",
        "Нет единого отчёта для SEO и редактора",
      ],
      gainTitle: "В модуле Титло",
      gains: [
        "Символы, слова, предложения — в одном окне",
        "Список слов и частотность по тексту",
        "Быстрая проверка перед публикацией",
      ],
    },
    acts: [
      act("01", "Вставьте текст", "Статья, карточка или фрагмент — без загрузки файла.", TEXT_LENGTH_SCREENSHOTS[0]?.src ?? S0, "Поле ввода", ["С пробелами / без", "Слова · предложения", "Мгновенный пересчёт"]),
      act("02", "Разберите состав", "Частотность слов и «вода» — до правок в CMS.", TEXT_LENGTH_SCREENSHOTS[1]?.src ?? S1, "Статистика текста", ["Уникальные слова", "Повторы", "Сравнение с нормой"], "65% top"),
      act("03", "Согласуйте с SEO", "Цифры для ТЗ и релевантности — без пересчёта вручную.", TEXT_LENGTH_SCREENSHOTS[1]?.src ?? S1, "Отчёт для команды", ["Копирование", "Анализ текста", "Релевантность"]),
    ],
    metrics: [m("∞", "проверок", "в кабинете"), m("2", "режима", "с пробелами · без"), m("100", "%", "точность подсчёта"), m("0", "₽", "старт на Free")],
    orbit: orbit(ORBIT.textAn, ORBIT.relevance, ORBIT.wordGen, ORBIT.cluster),
    hubTitle: "Подсчёт длины текста",
    heroUi: { keysFooter: "Текст · ввод", dynamicsFooter: "Статистика · слова" },
  },

  "generator-paroley": {
    eyebrow: "Центр безопасности",
    headline: "Надёжные пароли — без блокнота",
    cta: "Сгенерировать пароль",
    painGain: {
      painTitle: "Слабые и одинаковые пароли",
      pains: [
        "Один пароль на десяток сервисов",
        "«Qwerty» и даты рождения в проде",
        "Нет политики длины и символов для команды",
      ],
      gainTitle: "С генератором",
      gains: [
        "Длина и набор символов — настраиваются",
        "Исключение похожих знаков (0/O, l/1)",
        "Копирование в один клик — без хранения у нас",
      ],
    },
    acts: [
      act("01", "Задайте политику", "Длина, цифры, спецсимволы — под требования сервиса.", PW_GEN_SCREENSHOTS[0]?.src ?? S0, "Настройки", ["До 64 символов", "Без неоднозначных", "Обновить набор"]),
      act("02", "Сгенерируйте", "Криптостойкий набор за секунду — в браузере.", PW_GEN_SCREENSHOTS[1]?.src ?? S1, "Результат", ["Копировать", "Новый пароль", "Без отправки на сервер"], "65% top"),
      act("03", "Передайте безопасно", "Менеджер паролей или защищённый канал — не в чат проекта.", PW_GEN_SCREENSHOTS[1]?.src ?? S1, "Практика", ["Не в email", "Ротация доступов", "Разные пароли на сервисы"]),
    ],
    metrics: [m("64", "симв.", "максимальная длина"), m("4", "набора", "буквы · цифры · спец"), m("1", "клик", "копирование"), m("0", "хранение", "пароль не сохраняем")],
    orbit: orbit(ORBIT.http, ORBIT.siteMon, { label: "HTML-редактор", href: "/html-redaktor/", role: "Вёрстка и доступы" }, { label: "UTM метки", href: "/utm-metki/", role: "Кампании" }),
    hubTitle: "Генератор паролей",
    heroUi: { keysFooter: "Политика · длина", dynamicsFooter: "Пароль · копировать" },
  },

  "sravnenie-spiskov-klyuchevykh-fraz": {
    eyebrow: "Центр сверки",
    headline: "Два списка — одна правда",
    cta: "Сравнить списки фраз",
    painGain: {
      painTitle: "Сверка в Excel",
      pains: [
        "VLOOKUP ломается на дубликатах и регистре",
        "Не видно, что только в ядре клиента, что только у вас",
        "Часы на подготовку отчёта перед созвоном",
      ],
      gainTitle: "С модулем сравнения",
      gains: [
        "Два списка → пересечение и разница",
        "Дубликаты и нормализация — автоматически",
        "Экспорт для согласования семантики",
      ],
    },
    acts: [
      act("01", "Загрузите списки", "Ядро агентства и список клиента — или два среза проекта.", LIST_COMPARE_SCREENSHOTS[0]?.src ?? S0, "Два поля", ["Вставка · файл", "Регистр", "Пустые строки"]),
      act("02", "Получите матрицу", "Общие, уникальные слева и справа — без формул.", LIST_COMPARE_SCREENSHOTS[1]?.src ?? S1, "Результат сверки", ["Только A", "Только B", "Пересечение"], "65% top"),
      act("03", "Согласуйте ядро", "Финальный список — в мониторинг или кластеризатор.", LIST_COMPARE_SCREENSHOTS[1]?.src ?? S1, "Экспорт", ["Копирование", "Кластеризатор", "Мониторинг позиций"]),
    ],
    metrics: [m("2", "списка", "за один прогон"), m("3", "среза", "A · B · общие"), m("∞", "строк", "по тарифу"), m("мин", "вместо", "часов в Excel")],
    orbit: orbit(ORBIT.cluster, ORBIT.wordGen, ORBIT.positions, ORBIT.competitors),
    hubTitle: "Сравнение списков",
    heroUi: { keysFooter: "Список A · B", dynamicsFooter: "Сверка · diff" },
  },

  "udalenie-dublikatov": {
    eyebrow: "Центр чистых списков",
    headline: "Дубликаты — вне ядра",
    cta: "Очистить список",
    painGain: {
      painTitle: "Грязное семантическое ядро",
      pains: [
        "Одинаковые фразы с разным регистром и пробелами",
        "Повторы раздувают отчёты мониторинга",
        "Час на ручную чистку перед выгрузкой",
      ],
      gainTitle: "После очистки",
      gains: [
        "Уникальные строки за один прогон",
        "Нормализация пробелов и регистра",
        "Готовый список для Wordstat и кластеризации",
      ],
    },
    acts: [
      act("01", "Вставьте список", "Ключи из Excel, Wordstat или отчёта — как есть.", DEDUP_SCREENSHOTS[0]?.src ?? S0, "Исходные фразы", ["До лимита тарифа", "По строкам", "Копипаст"]),
      act("02", "Уберите повторы", "Алгоритм оставляет первое вхождение, считает удалённые.", DEDUP_SCREENSHOTS[1]?.src ?? S1, "Чистый список", ["Сколько снято", "Сортировка", "Копирование"], "65% top"),
      act("03", "Продолжите пайплайн", "Чистое ядро — в генератор, кластеризатор или мониторинг.", DEDUP_SCREENSHOTS[1]?.src ?? S1, "Дальше по цепочке", ["Сравнение списков", "Кластеризатор", "Экспорт"]),
    ],
    metrics: [m("1", "клик", "очистка списка"), m("100", "%", "уникальных строк"), m("∞", "списков", "в кабинете"), m("SEO", "ядро", "без мусора")],
    orbit: orbit(
      ORBIT.wordGen,
      ORBIT.cluster,
      ORBIT.competitors,
      { label: "Сравнение списков", href: "/sravnenie-spiskov-klyuchevykh-fraz/", role: "Сверка ядер" }
    ),
    hubTitle: "Удаление дубликатов",
    heroUi: { keysFooter: "Список · ввод", dynamicsFooter: "Уникальные · счётчик" },
  },

  "utm-metki": {
    eyebrow: "Центр разметки трафика",
    headline: "UTM без ошибок в ссылке",
    cta: "Собрать UTM-ссылку",
    painGain: {
      painTitle: "Ручная сборка меток",
      pains: [
        "Опечатки в utm_source ломают отчёт в Метрике",
        "Разные форматы у маркетологов в команде",
        "Нет шаблонов под типовые кампании",
      ],
      gainTitle: "С конструктором",
      gains: [
        "Поля source, medium, campaign — с подсказками",
        "Готовая ссылка для копирования",
        "Единый формат для всей команды",
      ],
    },
    acts: [
      act("01", "Заполните поля", "Источник, канал, кампания — по соглашению в компании.", UTM_SCREENSHOTS[0]?.src ?? S0, "Конструктор UTM", ["utm_content", "utm_term", "Базовый URL"]),
      act("02", "Проверьте ссылку", "Кодирование параметров — без «битых» query.", UTM_SCREENSHOTS[1]?.src ?? S1, "Превью URL", ["Копировать", "Обновить", "Шаблон"]),
      act("03", "Запустите кампанию", "Ссылка в объявлениях и рассылках — атрибуция сойдётся.", UTM_SCREENSHOTS[1]?.src ?? S1, "В работу", ["Директ · VK", "Email", "Отчёты в Метрике"]),
    ],
    metrics: [m("5", "полей", "стандарт UTM"), m("1", "URL", "на выходе"), m("0", "опечаток", "автосборка"), m("∞", "ссылок", "в истории")],
    orbit: orbit({ label: "Калькулятор ROI", href: "/kalkulyator-roi/", role: "Окупаемость кампаний" }, ORBIT.positions, { label: "HTML-редактор", href: "/html-redaktor/", role: "Посадочные" }, ORBIT.meta),
    hubTitle: "UTM метки",
    heroUi: { keysFooter: "Кампания · поля", dynamicsFooter: "Ссылка · копировать" },
  },

  "kalkulyator-roi": {
    eyebrow: "Центр окупаемости",
    headline: "ROI кампании — до запуска",
    cta: "Посчитать ROI",
    painGain: {
      painTitle: "Решения «на глаз»",
      pains: [
        "Бюджет согласуют без модели окупаемости",
        "Разные таблицы у маркетинга и финансов",
        "Нет сценария «что если снизить CPA»",
      ],
      gainTitle: "С калькулятором",
      gains: [
        "Доход, расход, конверсия — в одной форме",
        "ROI и маржа на выходе сразу",
        "Сценарии для презентации руководству",
      ],
    },
    acts: [
      act("01", "Введите вводные", "Бюджет, средний чек, конверсия — цифры из прошлой кампании.", ROI_CALC_SCREENSHOTS[0]?.src ?? S0, "Параметры", ["Доход · расход", "CPA", "Период"]),
      act("02", "Получите ROI", "Процент окупаемости и чистая прибыль — без Excel.", ROI_CALC_SCREENSHOTS[1]?.src ?? S1, "Результат", ["Сравнение сценариев", "Копирование", "UTM для атрибуции"], "65% top"),
      act("03", "Защитите бюджет", "Обоснование для согласования — на цифрах, не на ощущениях.", ROI_CALC_SCREENSHOTS[1]?.src ?? S1, "Для руководства", ["План · факт", "Масштабирование", "Стоп-линии"]),
    ],
    metrics: [m("ROI", "%", "на выходе"), m("3", "сценария", "что если"), m("0", "₽", "модуль Free"), m("1", "форма", "все вводные")],
    orbit: orbit({ label: "UTM метки", href: "/utm-metki/", role: "Разметка трафика" }, ORBIT.positions, ORBIT.competitors, { label: "Мониторинг сайтов", href: "/monitoring-saytov/", role: "Лендинг жив" }),
    hubTitle: "Калькулятор ROI",
    heroUi: { keysFooter: "Вводные · бюджет", dynamicsFooter: "ROI · маржа" },
  },

  "http-headers": {
    eyebrow: "Центр ответа сервера",
    headline: "HTTP-заголовки — в одной таблице",
    cta: "Проверить заголовки",
    painGain: {
      painTitle: "curl и DevTools по URL",
      pains: [
        "Редиректы и кэш смотрите вручную на каждой странице",
        "Пакет из 50 URL — вечер в терминале",
        "Нет CSV для техаудита заказчика",
      ],
      gainTitle: "С проверкой Титло",
      gains: [
        "Один URL или до 500 в пакете",
        "Статус, Cache-Control, безопасность — в отчёте",
        "Выгрузка CSV для команды",
      ],
    },
    acts: [
      act("01", "Укажите URL", "Посадочная, раздел каталога или список до 500 ссылок.", HTTP_HEADERS_SCREENSHOTS[0]?.src ?? S0, "Ввод", ["User-Agent", "Свои заголовки", "Задержка"]),
      act("02", "Снимите ответ", "Полная цепочка редиректов и тело заголовков.", HTTP_HEADERS_SCREENSHOTS[1]?.src ?? S1, "Таблица ответа", ["301/302", "ETag", "CSP"], "65% top"),
      act("03", "Исправьте технику", "Отчёт в работу разработчику или SEO — с фактами.", HTTP_HEADERS_SCREENSHOTS[1]?.src ?? S1, "CSV · аудит", ["Сравнение URL", "Мониторинг сайтов", "Релевантность"]),
    ],
    metrics: [m("500", "URL", "в пакете"), m("CSV", "экспорт", "для аудита"), m("3", "категории", "запрос · ответ · безопасность"), m("UA", "смена", "разные агенты")],
    orbit: orbit(ORBIT.siteMon, ORBIT.meta, ORBIT.relevance, ORBIT.links),
    hubTitle: "HTTP headers",
    heroUi: { keysFooter: "URL · пакет", dynamicsFooter: "Ответ · CSV" },
  },

  "html-redaktor": {
    eyebrow: "Центр вёрстки",
    headline: "HTML под рукой — без тяжёлого IDE",
    cta: "Открыть редактор",
    painGain: {
      painTitle: "Правки в блокноте",
      pains: [
        "Нет подсветки и превью — ошибки в тегах",
        "Тяжёлый редактор — ради одной правки meta",
        "Сложно передать фрагмент коллеге",
      ],
      gainTitle: "В HTML-редакторе",
      gains: [
        "Подсветка синтаксиса в браузере",
        "Быстрые правки сниппетов и блоков",
        "Копирование готового фрагмента",
      ],
    },
    acts: [
      act("01", "Вставьте разметку", "Фрагмент страницы или письма — сразу в поле.", HTML_EDITOR_SCREENSHOTS[0]?.src ?? S0, "Редактор", ["Подсветка", "Отступы", "Поиск"]),
      act("02", "Правьте код", "Теги, атрибуты, микроразметка — без перезагрузки проекта.", HTML_EDITOR_SCREENSHOTS[1]?.src ?? S1, "Правки", ["Валидация глазами", "Копировать", "Сохранить локально"], "65% top"),
      act("03", "Отдайте в прод", "Чистый HTML в CMS или письмо — без лишних обёрток.", HTML_EDITOR_SCREENSHOTS[1]?.src ?? S1, "Экспорт", ["Мета-мониторинг", "Релевантность", "HTTP headers"]),
    ],
    metrics: [m("1", "окно", "в браузере"), m("0", "установок", "не нужен IDE"), m("∞", "фрагментов", "сессия"), m("HTML", "5", "подсветка")],
    orbit: orbit(ORBIT.meta, ORBIT.relevance, ORBIT.http, { label: "Генератор паролей", href: "/generator-paroley/", role: "Доступы" }),
    hubTitle: "HTML-редактор",
    heroUi: { keysFooter: "Код · ввод", dynamicsFooter: "Фрагмент · копия" },
  },

  "vydelenie-unikalnykh-slov-v-tekste": {
    eyebrow: "Центр уникальности",
    headline: "Уникальные слова — на виду",
    cta: "Выделить уникальные слова",
    painGain: {
      painTitle: "Сравнение двух текстов вручную",
      pains: [
        "Не видно, что есть только в вашей статье",
        "Копирайт и SEO спорят без цифр",
        "Долго готовить отчёт по дублям контента",
      ],
      gainTitle: "С модулем выделения",
      gains: [
        "Два текста → уникальные формулировки",
        "Наглядная разметка в отчёте",
        "Быстрая сверка с конкурентом или ТЗ",
      ],
    },
    acts: [
      act("01", "Вставьте тексты", "Ваш материал и эталон — статья конкурента или старая версия.", UNIQUE_WORDS_SCREENSHOTS[0]?.src ?? S0, "Два поля", ["Любой объём", "Без файлов", "Мгновенно"]),
      act("02", "Увидьте разницу", "Слова и фразы, которые встречаются только с одной стороны.", UNIQUE_WORDS_SCREENSHOTS[1]?.src ?? S1, "Подсветка", ["Уникальные блоки", "Повторы", "Копирование"], "65% top"),
      act("03", "Усильте контент", "Добавьте недостающую лексику — к релевантности и анализу текста.", UNIQUE_WORDS_SCREENSHOTS[1]?.src ?? S1, "Следующий шаг", ["Анализ текста", "Релевантность", "Подсчёт длины"]),
    ],
    metrics: [m("2", "текста", "за сравнение"), m("100", "%", "наглядность"), m("∞", "прогонов", "Free"), m("SEO", "уникальность", "лексика")],
    orbit: orbit(ORBIT.textAn, ORBIT.relevance, { label: "Подсчёт длины текста", href: "/podschet-dliny-teksta/", role: "Объём" }, ORBIT.competitors),
    hubTitle: "Уникальные слова",
    heroUi: { keysFooter: "Текст A · B", dynamicsFooter: "Уникальные · отчёт" },
  },

  "otslezhivanie-ssylok": {
    eyebrow: "Контроль размещения",
    headline: "Отслеживание ссылок",
    cta: "Проверить ссылку",
    showSearchEngines: false,
    painGain: {
      painTitle: "Проверка доноров вручную",
      pains: [
        "Десятки страниц — открывать каждую вручную",
        "Не заметите снятие ссылки или смену анкора",
        "nofollow и noindex появляются незаметно",
      ],
      gainTitle: "С модулем в кабинете",
      gains: [
        "Страница донора → ссылка и анкор на месте",
        "Проверка раз в сутки по всему проекту",
        "Telegram; email при расхождении — на платных",
      ],
    },
    acts: [
      act("01", "Создайте проект", "Название и привязка к мониторингу позиций — при необходимости.", LINK_TRACK_SCREENSHOTS[0]?.src ?? S0, "Проект", ["Списоком", "Таблицей", "Шаги 1–2–3"]),
      act("02", "Добавьте ссылки", "Страница донора, URL на ваш сайт, анкор, контроль nofollow и noindex.", LINK_TRACK_SCREENSHOTS[1]?.src ?? S1, "Ссылки", ["Пакет строк", "Построчно", "Редактирование"], "65% top"),
      act("03", "Реагируйте", "Ссылку сняли или изменили — узнаете до просадки отчётов.", LINK_TRACK_SCREENSHOTS[2]?.src ?? S2, "Оповещения", ["Повтор через час", "Статусы", "Сводка проблем"], "65% top"),
    ],
    metrics: [m("24 ч", "проверка", "по расписанию"), m("2", "формата", "список и таблица"), m("5", "демо", "на сайте"), m("TG", "алерт", "и email")],
    orbit: orbit(ORBIT.http, ORBIT.meta, ORBIT.positions, ORBIT.siteMon),
    hubTitle: "Отслеживание ссылок",
    heroUi: { keysFooter: "донор · анкор", dynamicsFooter: "nofollow · noindex" },
  },

  "otslezhivanie-sroka-registratsii-domenov": {
    eyebrow: "Центр доменов",
    headline: "Срок регистрации — не пропустить",
    cta: "Добавить домены",
    painGain: {
      painTitle: "WHOIS вручную",
      pains: [
        "Десятки доменов клиентов — в разных регистраторах",
        "Просрочка — сайт и почта лежат",
        "Нет единого календаря продлений",
      ],
      gainTitle: "С мониторингом доменов",
      gains: [
        "Список доменов → дата окончания",
        "Напоминания до истечения",
        "История проверок в кабинете",
      ],
    },
    acts: [
      act("01", "Импортируйте домены", "Свои и клиентские — одним списком.", DOMAIN_REG_SCREENSHOTS[0]?.src ?? S0, "Список доменов", ["WHOIS", "Дата истечения", "Статус"]),
      act("02", "Смотрите сроки", "Сколько дней осталось — без захода в регистратор.", DOMAIN_REG_SCREENSHOTS[1]?.src ?? S1, "Календарь рисков", ["Сортировка", "Фильтр", "Экспорт"], "65% top"),
      act("03", "Продлите вовремя", "Алерт уходит до падения сайта и репутации.", DOMAIN_REG_SCREENSHOTS[1]?.src ?? S1, "Напоминания", ["Email", "Отчёт", "Мониторинг сайта"]),
    ],
    metrics: [m("WHOIS", "авто", "дата окончания"), m("N", "доменов", "в проекте"), m("30", "дней", "напоминание"), m("0", "просрочек", "цель")],
    orbit: orbit(ORBIT.siteMon, ORBIT.http, ORBIT.links, ORBIT.positions),
    hubTitle: "Срок регистрации доменов",
    heroUi: { keysFooter: "Домены · список", dynamicsFooter: "Срок · алерт" },
  },

  "analiz-teksta": {
    eyebrow: "Центр качества текста",
    headline: "Тошнота и вода — в цифрах",
    cta: "Проанализировать текст",
    painGain: {
      painTitle: "«Плохой текст» без метрик",
      pains: [
        "Тошнота и водность — на ощущениях редактора",
        "Нет единого листа для SEO и копирайта",
        "Сравнение с нормой ниши откладывается",
      ],
      gainTitle: "С анализом текста",
      gains: [
        "Статистика слов, знаков, предложений",
        "Показатели тошноты и заспамленности",
        "Список слов для правок перед публикацией",
      ],
    },
    acts: [
      act("01", "Вставьте материал", "Статья, описание товара или лендинг — целиком.", TEXT_ANAL_SCREENSHOTS[0]?.src ?? S0, "Текст на входе", ["Любой объём", "Без регистрации файла", "Мгновенный отчёт"]),
      act("02", "Изучите метрики", "Тошнота, вода, частотность — в одной панели.", TEXT_ANAL_SCREENSHOTS[1]?.src ?? S1, "Показатели", ["Слова · знаки", "Список лемм", "Пороги"], "65% top"),
      act("03", "Отдайте на правки", "Конкретные зоны риска — копирайтеру или в релевантность.", TEXT_ANAL_SCREENSHOTS[1]?.src ?? S1, "Правки", ["Уникальные слова", "Подсчёт длины", "Релевантность"]),
    ],
    metrics: [m("10+", "метрик", "в отчёте"), m("1", "текст", "за прогон"), m("∞", "проверок", "в кабинете"), m("SEO", "качество", "до публикации")],
    orbit: orbit(ORBIT.relevance, { label: "Подсчёт длины", href: "/podschet-dliny-teksta/", role: "Объём" }, { label: "Уникальные слова", href: "/vydelenie-unikalnykh-slov-v-tekste/", role: "Сверка" }, ORBIT.wordGen),
    hubTitle: "Анализ текста",
    heroUi: { keysFooter: "Текст · ввод", dynamicsFooter: "Метрики · список" },
  },

  "klasterizator-klyuchevykh-slov": {
    eyebrow: "Центр семантики",
    headline: "Ядро из хаоса — в кластеры",
    cta: "Запустить кластеризацию",
    showSearchEngines: true,
    painGain: {
      painTitle: "Группировка в Excel",
      pains: [
        "Тысячи фраз — недели ручной сортировки",
        "Связи по ТОПу не видны без парсинга",
        "Структура сайта отстаёт от семантики",
      ],
      gainTitle: "С кластеризатором",
      gains: [
        "Парсинг выдачи и группировка автоматически",
        "Классический и профессиональный режим",
        "CSV / Excel для структуры и ТЗ",
      ],
    },
    acts: [
      act("01", "Загрузите ядро", "Список из Wordstat, генератора или файла клиента.", CLUSTER_SCREENSHOTS[1]?.src ?? S0, CLUSTER_SCREENSHOTS[1]?.caption ?? "Фразы · регион", ["Hard / Soft", "Глубина ТОПа", "Режим"]),
      act("02", "Дождитесь кластеров", "Связи по пересечению URL в выдаче — не «по слову».", CLUSTER_SCREENSHOTS[0]?.src ?? S1, CLUSTER_SCREENSHOTS[0]?.caption ?? "Кластеры", ["Парсинг конкурентов", "Прогресс", "Пауза"], "65% top"),
      act("03", "Постройте структуру", "Кластер → раздел или посадочная в плане SEO.", CLUSTER_SCREENSHOTS[2]?.src ?? S1, CLUSTER_SCREENSHOTS[2]?.caption ?? "Экспорт", ["CSV · XLS", "Мониторинг", "Релевантность"]),
    ],
    metrics: [m("2", "режима", "классика · pro"), m("ТОП", "выдача", "основа связей"), m("CSV", "экспорт", "таблица кластеров"), m("мин", "вместо", "недель в Excel")],
    orbit: orbit(ORBIT.wordGen, ORBIT.competitors, ORBIT.relevance, ORBIT.positions),
    hubTitle: "Кластеризатор",
    storySection: { title: "От списка фраз до структуры сайта" },
    heroUi: { keysFooter: "Ядро · регион", dynamicsFooter: "Кластеры · CSV" },
  },
};
