// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  // se veio do subdomínio notes.seoft.app
  if (host === "notes.seoft.app") {
    const url = new URL(req.url);
    url.hostname = "seoft.app";
    url.pathname = "/notes";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // aplica em todas as rotas
  matcher: "/:path*",
};
