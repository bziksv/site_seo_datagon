import type { HttpHeadersDemoResponse } from "@/lib/demo/types";

export type HttpHeadersRunBody = {
  url: string;
};

type RunResult =
  | { ok: true; data: HttpHeadersDemoResponse }
  | { ok: false; status: number; error: string; message?: string; remaining?: number };

export async function runHttpHeadersDemo(body: HttpHeadersRunBody): Promise<RunResult> {
  const res = await fetch("/api/demo/http-headers/run/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as HttpHeadersDemoResponse & {
    error?: string;
    message?: string;
    remaining?: number;
  };

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data.error ?? "error",
      message: data.message,
      remaining: data.remaining,
    };
  }

  return { ok: true, data };
}
