import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-tfa-ink/10 bg-tfa-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="font-display text-center text-lg font-bold tracking-[0.12em] uppercase">
          The First Amendment
        </p>
        <p className="mt-2 text-center text-sm text-white/60">
          A student publication of The Lawrenceville School
        </p>
        <p className="mt-6 text-center text-sm leading-relaxed text-white/50">
          Dedicated to freedom of expression and the belief that all voices have
          a role in shaping our democracy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 font-display text-xs tracking-[0.15em] uppercase">
          <Link href="/about" className="text-white/80 hover:text-tfa-red">
            About
          </Link>
        </div>
        <p className="mt-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} The First Amendment
        </p>
      </div>
    </footer>
  );
}
