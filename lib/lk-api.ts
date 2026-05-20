const LK_API_BASE = process.env.LK_API_BASE_URL ?? process.env.NEXT_PUBLIC_LK_URL ?? "https://lk.redbox.su";

/** Префиксы API lk, разрешённые для BFF-прокси с маркетингового сайта */
const ALLOWED_PREFIXES = [
  "api/demo/",
  "api/public/",
  "api/public/contact",
  "sanctum/csrf-cookie",
];

export function getLkApiBase(): string {
  return LK_API_BASE.replace(/\/$/, "");
}

export function isAllowedLkPath(path: string): boolean {
  const normalized = path.replace(/^\/+/, "");
  return ALLOWED_PREFIXES.some((p) => normalized === p.replace(/\/$/, "") || normalized.startsWith(p));
}

export async function proxyToLk(
  path: string,
  init?: RequestInit
): Promise<Response> {
  if (!isAllowedLkPath(path)) {
    return new Response(JSON.stringify({ error: "Path not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `${getLkApiBase()}/${path.replace(/^\/+/, "")}`;
  try {
    return await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    return new Response(JSON.stringify({ error: "LK unavailable" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
