/**
 * The generic /api/<collection> and /api/<collection>/<id> routes cover
 * basic reads for every collection automatically. When you need something
 * more specific — a filtered feed, a computed field, combining two
 * collections — add a plain Next.js route file anywhere under app/api/
 * (Next.js matches more specific static paths before the generic dynamic
 * ones).
 *
 * List it here too so it shows up in the /admin/api-routes reference page —
 * purely documentation, has no effect on routing.
 */
export interface CustomApiRoute {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
}

export const customApiRoutes: CustomApiRoute[] = [
  // {
  //   method: "GET",
  //   path: "/api/projects/featured",
  //   description: "Projects with featured=true.",
  // },
];
