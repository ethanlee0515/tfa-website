import Link from "next/link";
import { Masthead } from "@/components/Masthead";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Masthead showTagline={false} />
      <p className="mt-8 font-serif text-xl text-tfa-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-6 font-display text-xs tracking-[0.2em] text-tfa-red uppercase hover:underline"
      >
        Return home
      </Link>
    </div>
  );
}
