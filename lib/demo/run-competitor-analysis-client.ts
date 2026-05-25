import type {
  CompetitorAnalysisDemoResult,
  CompetitorAnalysisDemoRunBody,
  DemoErrorBody,
} from "@/lib/demo/types";
import { COMPETITOR_ANALYSIS_DEMO_MODULE } from "@/lib/demo/competitor-analysis-demo";

const LK_PATH = `api/demo/${COMPETITOR_ANALYSIS_DEMO_MODULE}/run`;
const LOCAL_PATH = `/api/demo/${COMPETITOR_ANALYSIS_DEMO_MODULE}/run`;

export async function runCompetitorAnalysisDemo(
  body: CompetitorAnalysisDemoRunBody
): Promise<
  | { ok: true; data: CompetitorAnalysisDemoResult }
  | { ok: false; status: number; error: DemoErrorBody }
> {
  const endpoints = [`/api/lk/${LK_PATH}`, LOCAL_PATH];

  for (const path of endpoints) {
    const res = await fetch(path, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 404 || res.status === 502) continue;

    const json = (await res.json()) as CompetitorAnalysisDemoResult | DemoErrorBody;
    if (!res.ok) {
      return { ok: false, status: res.status, error: json as DemoErrorBody };
    }
    return { ok: true, data: json as CompetitorAnalysisDemoResult };
  }

  return {
    ok: false,
    status: 503,
    error: {
      error: "unavailable",
      message: "Демо временно недоступно. Попробуйте позже или зарегистрируйтесь в кабинете.",
    },
  };
}
