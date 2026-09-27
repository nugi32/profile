/**
 * ============================================================
 *  Single source of truth for the CMS.
 *
 *  Add / remove / change collections and fields here and the
 *  admin UI (sidebar, list tables, create/edit forms) and the
 *  REST API automatically follow — no other code changes needed.
 *
 *  Every collection below is consumed by the ../nextjs frontend
 *  (see nextjs/lib/cms.ts → CMS_COLLECTIONS). The journal is NOT
 *  here on purpose: it lives in Notion.
 * ============================================================
 */

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "relation";

export interface FieldSchema {
  /** key stored in MongoDB, e.g. "title" */
  name: string;
  /** label shown in the UI */
  label: string;
  type: FieldType;
  required?: boolean;
  /** only for type: "select" */
  options?: string[];
  /** only for type: "relation" — name of the collection it points to */
  relationTo?: string;
  /** only for type: "relation" — which field to display in the dropdown (defaults to "name") */
  titleField?: string;
}

export interface CollectionSchema {
  /** slug + MongoDB collection name, e.g. "projects" */
  name: string;
  /** label shown in the UI */
  label: string;
  fields: FieldSchema[];
}

export const schemas: CollectionSchema[] = [
  {
    name: "profile",
    label: "Profile",
    fields: [
      // Legal / display identity
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "displayName", label: "Display Name", type: "text" },
      { name: "initials", label: "Initials", type: "text" },
      // Role & location
      { name: "role", label: "Role (long form)", type: "text" },
      { name: "shortRole", label: "Role (short form)", type: "text" },
      { name: "location", label: "Location", type: "text" },
      // Contact
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      // Copy
      { name: "bio", label: "Bio / Summary", type: "textarea" },
      { name: "photo", label: "Photo", type: "image" },
      // Lists — one entry per line.
      // Education line format:   Institution | Degree | Period | Notes
      {
        name: "education",
        label: "Education (one per line: Institution | Degree | Period | Notes)",
        type: "textarea",
      },
      // Achievement line format:  Title | Issuer | Year
      {
        name: "achievements",
        label: "Achievements (one per line: Title | Issuer | Year)",
        type: "textarea",
      },
    ],
  },
  {
    name: "projects",
    label: "Projects",
    fields: [
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "longDescription", label: "Long Description", type: "richtext" },
      { name: "technologies", label: "Technologies", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Live", "In Development", "Research", "Archived"],
      },
      { name: "achievements", label: "Achievements", type: "textarea" },
      { name: "githubUrl", label: "GitHub URL", type: "text" },
      { name: "demoUrl", label: "Demo URL", type: "text" },
      // Lets you keep a project listed even when its repo can't be public
      // (client work, an active competition, embargoed research, etc). The
      // site swaps the "view source" link for a short explanation instead
      // of a dead/missing GitHub button.
      {
        name: "codeVisibility",
        label: "Source Code",
        type: "select",
        options: ["Public", "Private"],
        required: true,
      },
      {
        name: "privateReason",
        label: "Why it's private (shown to visitors, one or two sentences — optional)",
        type: "textarea",
      },
      { name: "accent", label: "Accent", type: "select", options: ["ice", "amber"] },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "image", label: "Image", type: "image" },
      { name: "imageUrl", label: "Image URL", type: "text" },
    ],
  },
  {
    name: "timeline",
    label: "Timeline",
    fields: [
      { name: "year", label: "Year", type: "text", required: true },
      { name: "theme", label: "Theme", type: "text" },
      { name: "items", label: "Items", type: "textarea" },
    ],
  },
  {
    name: "knowledge-nodes",
    label: "Knowledge Nodes",
    fields: [
      { name: "id", label: "ID", type: "text", required: true },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "group", label: "Group", type: "text" },
      { name: "weight", label: "Weight", type: "number" },
    ],
  },
  {
    name: "knowledge-edges",
    label: "Knowledge Edges",
    fields: [
      { name: "source", label: "Source", type: "text", required: true },
      { name: "target", label: "Target", type: "text", required: true },
      { name: "strength", label: "Strength", type: "number" },
    ],
  },
  {
    name: "skills",
    label: "Skills",
    fields: [
      { name: "category", label: "Category", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text" },
      { name: "skills", label: "Skills", type: "textarea" },
    ],
  },
  {
    name: "current-focus",
    label: "Current Focus",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "text" },
    ],
  },
  {
    name: "weird-thoughts",
    label: "Weird Thoughts",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "context", label: "Context", type: "textarea" },
    ],
  },
  {
    name: "metrics",
    label: "Metrics",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "number", required: true },
      { name: "suffix", label: "Suffix", type: "text" },
      { name: "icon", label: "Icon", type: "text" },
    ],
  },
  {
    name: "monthly-deep-work",
    label: "Monthly Deep Work",
    fields: [
      { name: "month", label: "Month", type: "text", required: true },
      { name: "hours", label: "Hours", type: "number", required: true },
    ],
  },
  {
    name: "quarterly-reading",
    label: "Quarterly Reading",
    fields: [
      { name: "quarter", label: "Quarter", type: "text", required: true },
      { name: "books", label: "Books", type: "number", required: true },
    ],
  },
  {
    name: "learning-items",
    label: "Learning Items",
    fields: [
      { name: "topic", label: "Topic", type: "text", required: true },
      { name: "progress", label: "Progress", type: "number", required: true },
    ],
  },
  {
    name: "books",
    label: "Books",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["Reading", "Queued", "Finished"] },
    ],
  },
  {
    name: "papers",
    label: "Papers",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["Reading", "Queued", "Finished"] },
    ],
  },
  {
    name: "social-links",
    label: "Social Links",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "href", label: "URL", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text" },
    ],
  },
];
