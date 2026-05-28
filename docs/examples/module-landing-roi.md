# Эталон: лендинг «Калькулятор ROI»

| Среда | URL |
|-------|-----|
| Локально | http://localhost:3001/kalkulyator-roi/ |
| Прод | https://datagon.ru/kalkulyator-roi/ |

Публично: **Module V2** (`ModuleV2Landing`, `demoWidget: roi-calculator` в `build-config.ts`). Классика `KalkulyatorRoiLanding` — `/kalkulyator-roi-v1/`.

Контент: `lib/content/kalkulyator-roi-page.ts` · демо: `RoiCalculatorDemoWidget` · логика `lib/demo/roi-calculator-process.ts` (клиент, без API, без лимитов).

Акцент: **ROI, CTR/CPC/CPA, прогноз трафика, два режима расчёта**.

Проверка:

```bash
npm run verify:roi
# страница должна отдавать 200 и содержать секцию «Попробовать бесплатно» + «без лимитов»
```
