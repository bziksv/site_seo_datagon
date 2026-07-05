export async function GET() {
  return Response.json({
    ok: true,
    service: "titlo-marketing",
    timestamp: new Date().toISOString(),
  });
}
