import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /pages and /*.c routes
  const isCFile = pathname.match(/^\/[^/]+\.c$/);
  const isPages = pathname === "/pages";

  if (!isCFile && !isPages) {
    return NextResponse.next();
  }

  const userAgent = (request.headers.get("user-agent") ?? "").toLowerCase();

  // Detect non-browser clients by User-Agent
  // curl sends "curl/x.x.x", wget sends "Wget/x.x.x"
  const isCurlLike =
    userAgent.startsWith("curl") ||
    userAgent.startsWith("wget") ||
    userAgent === "" || // no UA = likely programmatic
    userAgent.startsWith("python-requests") ||
    userAgent.startsWith("go-http") ||
    userAgent.startsWith("httpie");

  if (isCurlLike) {
    if (pathname === "/pages") {
      const url = request.nextUrl.clone();
      url.pathname = "/api/programs";
      return NextResponse.rewrite(url);
    }
    const filename = pathname.slice(1); // strip leading /
    const url = request.nextUrl.clone();
    url.pathname = `/api/raw/${filename}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Match any path ending in .c at the root level
  matcher: ["/pages", "/([^/]+)\\.c"],
};
