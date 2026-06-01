import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SECTIONS } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
}

function revalidateSiteContent() {
  revalidateTag("articles");
  revalidateTag("site");

  revalidatePath("/", "layout");
  revalidatePath("/about");

  for (const section of SECTIONS) {
    revalidatePath(`/${section}`);
  }

  revalidatePath("/article", "layout");
}

/** Sanity webhooks POST here after publish. Also callable manually for testing. */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return unauthorized();
  }

  revalidateSiteContent();

  try {
    const body = await request.json();
    const slug =
      typeof body?.slug === "string"
        ? body.slug
        : typeof body?.slug?.current === "string"
          ? body.slug.current
          : null;
    if (slug) {
      revalidatePath(`/article/${slug}`);
    }
  } catch {
    // Empty or non-JSON body is fine — full-site revalidation already ran.
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

/** Lets you paste the webhook URL in a browser to confirm the route + secret work. */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return unauthorized();
  }

  revalidateSiteContent();
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    hint: "Cache cleared. Refresh the public site (hard refresh if needed).",
  });
}
