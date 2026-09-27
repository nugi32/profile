import { NextRequest, NextResponse } from "next/server";
import { listItems, getSchema, hasPublishGate } from "@/lib/cms-service";
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
 * Public read-only API: GET /api/<collection>
 * Supports simple equality filters via query params, e.g.
 *   /api/projects?status=Live
 *   /api/projects?slug=my-project
 *
 * This route only exports GET — there is no POST here on purpose.
 * All writes go through the admin's server actions (app/admin/actions.ts),
 * which call lib/cms-service.ts directly. If you need write access from
 * an external client, add an authenticated route/action deliberately
 * rather than opening this one up.
 *
 * For collections with a draft/publish workflow (a "status" field), this
 * route (and therefore the nextjs frontend, which reads through it) only ever
 * returns published items — any client-supplied ?status= is overridden so
 * drafts can't be fetched by guessing the query param.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  try {
    const schema = getSchema(collection); // throws if unknown collection

    const filters: Record<string, string> = {};
    req.nextUrl.searchParams.forEach((value, key) => {
      filters[key] = value;
    });

    if (hasPublishGate(schema)) {
      filters.status = "published";
    }

    const items = await listItems(collection, filters);
    const response = NextResponse.json({ data: items });
    return applyCorsHeaders(req, response);
  } catch (e: any) {
    console.error(`GET /api/${collection} failed:`, e);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return applyCorsHeaders(req, new NextResponse(null, { status: 204 }));
}
