import type { BacklinkDemoResponse } from "@/lib/demo/types";

export type BacklinkRunBody = {
  donor: string;
  link: string;
  anchor: string;
  check_nofollow?: boolean;
  check_noindex?: boolean;
};

type RunResult =
  | { ok: true; data: BacklinkDemoResponse }
  | { ok: false; status: number; error: string; message?: string; remaining?: number };

export async function runBacklinkDemo(body: BacklinkRunBody): Promise<RunResult> {
  const res = await fetch("/api/demo/otslezhivanie-ssylok/run", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as BacklinkDemoResponse & {
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
