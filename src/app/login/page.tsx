import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

const studioConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export default function LoginPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="border-b border-tfa-ink/25">
        <div className="page-shell pt-5 sm:pt-8">
          <Masthead showIssue={false} />
          <SiteNav />
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-xl px-5 py-12 sm:px-10 sm:py-16"
      >
        <h1 className="font-serif text-3xl font-semibold text-tfa-ink">
          Editor login
        </h1>
        <p className="mt-4 text-tfa-muted leading-relaxed">
          TFA editors publish articles through our editorial workspace. You will
          sign in with the email address your Editor-in-Chief invited to the
          CMS—there is no separate password for this site.
        </p>

        {studioConfigured ? (
          <div className="mt-10 space-y-4">
            <Link
              href="/studio"
              className="inline-flex w-full items-center justify-center bg-tfa-red px-6 py-4 font-display text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-tfa-charcoal sm:w-auto"
            >
              Open editor workspace →
            </Link>
            <p className="text-sm text-tfa-muted">
              First time? Use the link in your Sanity invite email, or sign in
              with Google if your board set that up.
            </p>
          </div>
        ) : (
          <div className="mt-10 border-y border-tfa-rule py-6">
            <p className="font-display text-xs font-semibold tracking-[0.15em] text-tfa-red uppercase">
              Setup required
            </p>
            <p className="mt-3 text-sm leading-relaxed text-tfa-muted">
              The editor backend is not connected yet. An Editor-in-Chief or
              faculty advisor needs to create a Sanity project and add{" "}
              <code className="text-tfa-ink">
                NEXT_PUBLIC_SANITY_PROJECT_ID
              </code>{" "}
              to the site environment. See the publishing steps below.
            </p>
          </div>
        )}

        <section className="mt-14 border-t border-tfa-ink/10 pt-10">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] uppercase">
            Publishing workflow
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-tfa-muted">
            <li>
              Sign in at{" "}
              <Link href="/studio" className="text-tfa-red hover:underline">
                /studio
              </Link>
            </li>
            <li>
              Open{" "}
              <strong className="text-tfa-ink">Site &amp; About page</strong> to
              edit the About page and homepage “Why this issue matters”
            </li>
            <li>
              Under{" "}
              <strong className="text-tfa-ink">Editors &amp; board</strong>,
              update leadership photos and the full roster
            </li>
            <li>
              In an <strong className="text-tfa-ink">Article</strong>, click + →{" "}
              <strong className="text-tfa-ink">Pull quote</strong> for
              highlighted sentences
            </li>
            <li>
              Set <strong className="text-tfa-ink">status</strong> to Published
            </li>
            <li>Article appears on the public site within ~1 minute</li>
          </ol>
        </section>

        <p className="mt-10 text-sm text-tfa-muted">
          Publishing is available only to invited Sanity members.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
