import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths to intercept
  const isPages = pathname === "/pages";
  // Match top-level paths that are not roots, public assets, or internal
  // Also match requests ending in .dwg
  const isPotentialDwg = 
    (pathname !== "/" && !pathname.includes(".") && pathname.split("/").length === 2) ||
    pathname.endsWith(".dwg");

  if (!isPages && !isPotentialDwg) {
    return NextResponse.next();
  }

  const userAgent = (request.headers.get("user-agent") ?? "").toLowerCase();

  // Detect non-browser clients by User-Agent
  const isCurlLike =
    userAgent.startsWith("curl") ||
    userAgent.startsWith("wget") ||
    userAgent === "" || 
    userAgent.startsWith("python-requests") ||
    userAgent.startsWith("go-http") ||
    userAgent.startsWith("httpie");

  if (isPages) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/dwgs";
    return NextResponse.rewrite(url);
  }

  if (isPotentialDwg) {
    const url = request.nextUrl.clone();
    const dwgId = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    url.pathname = `/api/download/${dwgId}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages", "/:path"],
};
