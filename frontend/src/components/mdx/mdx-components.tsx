import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-display text-2xl text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-xl text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 text-base leading-relaxed text-muted" {...props} />
  ),
  a: (props) => (
    <a className="text-ice underline-offset-4 hover:underline" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-ice/50 pl-4 italic text-foreground/80"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted" {...props} />
  ),
  code: (props) => (
    <code
      className="rounded bg-panel px-1.5 py-0.5 font-mono text-sm text-ice"
      {...props}
    />
  ),
};
