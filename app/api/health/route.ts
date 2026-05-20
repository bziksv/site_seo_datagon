export async function GET() {
  return Response.json({
    ok: true,
    service: "datagon-marketing",
    timestamp: new Date().toISOString(),
  });
}
