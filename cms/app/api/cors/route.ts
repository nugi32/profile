import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  addAllowedOrigin,
  getAllowedOrigins,
  removeAllowedOrigin,
} from "@/lib/cors";

/**
 * Admin-only configuration endpoint for the CORS whitelist.
 *
 * This is NOT part of the public data API (see app/api/[collection]) — it
 * changes server security configuration, so every method requires an
 * authenticated admin session. It intentionally does not set any
 * Access-Control-Allow-* headers itself: it's only ever meant to be called
 * same-origin, from the admin UI.
 */
async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const origins = await getAllowedOrigins();
  return NextResponse.json({ origins });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const candidate = typeof body?.origin === "string" ? body.origin : "";

  try {
    const origins = await addAllowedOrigin(candidate);
    return NextResponse.json({ origins, success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to save origin.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => ({}));
  const candidate = typeof body?.origin === "string" ? body.origin : "";

  try {
    const origins = await removeAllowedOrigin(candidate);
    return NextResponse.json({ origins, success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to remove origin.",
      },
      { status: 400 }
    );
  }
}
