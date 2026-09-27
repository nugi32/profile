"use server";

import { revalidatePath } from "next/cache";
import { del, list, put } from "@vercel/blob";
import { createItem, updateItem, deleteItem } from "@/lib/cms-service";
import { auth, signOut } from "@/lib/auth";
import {
  findAdminByEmail,
  createAdminWithPassword,
  createAdminEmailOnly,
  countAdmins,
  deleteAdmin,
} from "@/lib/admins";

/**
 * Server Actions are their own POST endpoints, dispatched by an action ID
 * that Next.js sends via the `Next-Action` header — that ID is visible in
 * the client bundle/RSC payload, and the request doesn't have to hit the
 * page route the action was defined on. That means `middleware.ts`'s
 * `/admin/:path*` matcher (which only gates page navigation) and the
 * dashboard layout's `if (!session) redirect(...)` (which only runs when
 * the page itself renders) do NOT protect the action dispatch path.
 *
 * Every mutating action below must independently verify the caller has an
 * admin session before touching the database or blob store — this is that
 * check, mirroring the `requireAdmin()` guard already used in
 * app/api/cors/route.ts.
 */
async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function uploadBlobAction(file: File) {
  await requireAdminSession();

  if (!file || typeof file.size !== "number") {
    throw new Error("A file is required.");
  }

  try {
    // NEW: Vercel Blob upload
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Image upload failed"
    );
  }
}

export async function listBlobsAction() {
  await requireAdminSession();

  try {
    // NEW: Vercel Blob media manager
    const result = await list({ limit: 1000 });
    return result.blobs ?? [];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unable to list media files"
    );
  }
}

export async function deleteBlobAction(url: string) {
  await requireAdminSession();

  if (!url) {
    return { error: "A blob URL is required." };
  }

  try {
    // NEW: Vercel Blob delete from media manager
    await del(url);
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to delete media",
    };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function addAdminAction(formData: FormData) {
  await requireAdminSession();

  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  if (!email) return { error: "Email is required." };

  const existing = await findAdminByEmail(email);
  if (existing) return { error: "That email already has admin access." };

  if (password) {
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }
    await createAdminWithPassword(email, password);
  } else {
    // No password set - this account can only sign in via GitHub OAuth
    // using this exact email.
    await createAdminEmailOnly(email);
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function removeAdminAction(id: string) {
  await requireAdminSession();

  const total = await countAdmins();
  if (total <= 1) {
    return { error: "Can't remove the last remaining user." };
  }
  const result = await deleteAdmin(id);
  if (!result.success) {
    return { error: result.error ?? "Unable to remove user." };
  }
  revalidatePath("/admin/users");
  return { success: true };
}

export async function createItemAction(collection: string, formData: FormData) {
  await requireAdminSession();

  const raw = Object.fromEntries(formData.entries());
  const result = await createItem(collection, raw);
  if (!("errors" in result)) {
    revalidatePath(`/admin/${collection}`);
  }
  return result;
}

export async function updateItemAction(
  collection: string,
  id: string,
  formData: FormData
) {
  await requireAdminSession();

  const raw = Object.fromEntries(formData.entries());
  const result = await updateItem(collection, id, raw);
  if (!("errors" in result)) {
    revalidatePath(`/admin/${collection}`);
    revalidatePath(`/admin/${collection}/${id}`);
  }
  return result;
}

export async function deleteItemAction(collection: string, id: string) {
  await requireAdminSession();

  const result = await deleteItem(collection, id);
  if (result.success) {
    revalidatePath(`/admin/${collection}`);
  }
  return result;
}
