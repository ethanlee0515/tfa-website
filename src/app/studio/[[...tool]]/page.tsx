"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-8 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">Sanity Studio not configured</h1>
          <p className="mt-4 text-sm text-white/70">
            Add <code className="text-tfa-red">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{" "}
            <code>.env.local</code>. See{" "}
            <code>docs/PUBLISHING.md</code> in the repo.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
