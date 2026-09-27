import { redirect } from "next/navigation";

/** The CMS has no public site of its own — the frontend lives in ../nextjs. */
export default function RootPage() {
  redirect("/admin");
}
