import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="page-shell mt-12 pb-6 sm:mt-20">
      <div className="grid gap-8 border-t-2 border-tfa-ink pt-8 pb-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div>
          <Link
            href="/"
            className="font-serif text-3xl font-semibold tracking-[-0.04em]"
          >
            The First Amendment.
          </Link>
          <p className="mt-3 font-display text-xs text-tfa-muted">
            A student publication of The Lawrenceville School
          </p>
        </div>
        <p className="max-w-lg text-lg leading-relaxed text-tfa-muted">
          Dedicated to freedom of expression and the belief that all voices have
          a role in shaping our democracy.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-tfa-rule pt-5 font-display text-[11px] text-tfa-muted">
        <p>© {new Date().getFullYear()} The First Amendment</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <Link href="/about" className="hover:text-tfa-red">
                About
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-tfa-red">
                Editor login
              </Link>
            </li>
            <li>
              <a href="/feed.xml" className="hover:text-tfa-red">
                RSS feed
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
