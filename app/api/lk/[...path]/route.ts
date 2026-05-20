import { proxyToLk } from "@/lib/lk-api";

type Props = { params: Promise<{ path: string[] }> };

async function handle(request: Request, { params }: Props) {
  const { path } = await params;
  const lkPath = path.join("/");
  const url = new URL(request.url);
  const target = `${lkPath}${url.search}`;

  const headers = new Headers();
  const contentType = request.headers.get("Content-Type");
  if (contentType) headers.set("Content-Type", contentType);
  const accept = request.headers.get("Accept");
  headers.set("Accept", accept ?? "application/json");

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const res = await proxyToLk(target, init);
  const body = await res.text();

  return new Response(body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export const GET = handle;
export const POST = handle;
