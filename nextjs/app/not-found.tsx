import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[65vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="sticker -rotate-2 bg-sun-tint px-10 py-6">
        <p className="font-display text-8xl font-extrabold leading-none">404</p>
      </div>
      <h1 className="font-display text-4xl font-extrabold">This page wandered off.</h1>
      <p className="max-w-md text-lg text-soft">
        It may have moved, or it was never written down. Let&apos;s get you back somewhere fun.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Take me home
      </Link>
    </section>
  );
}
