import { NextRequest, NextResponse } from "next/server";
import { getItem, getSchema, isPublicItem } from "@/lib/cms-service";
import { isOriginAllowed } from "@/lib/cors";

async function applyCorsHeaders(req: NextRequest, response: NextResponse) {
  const origin = req.headers.get("origin");
  if (!origin || !(await isOriginAllowed(origin))) {
    return response;
  }

  // No Access-Control-Allow-Credentials here: this is a public, read-only,
  // unauthenticated data API (no session cookie is ever required to read
  // it), so there's nothing to gain from allowing credentialed requests -
  // omitting it means the browser will never attach cookies to cross-origin
  // requests here, which is the safer default for a public endpoint.
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Vary", "Origin");
  return response;
}

/**
 * Public read-only API: GET /api/<collection>/<id>
 *
 * GET-only by design — see app/api/[collection]/route.ts for why.
 * Same publish gate as the list route: a draft item's id returns 404 here,
 * not the draft content.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const { collection, id } = await params;
  try {
    const schema = getSchema(collection);
    const item = await getItem(collection, id);
    if (!item || !isPublicItem(schema, item)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const response = NextResponse.json({ data: item });
    return applyCorsHeaders(req, response);
  } catch (e: any) {
    console.error(`GET /api/${collection}/${id} failed:`, e);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return applyCorsHeaders(req, new NextResponse(null, { status: 204 }));
}
