// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  // se veio do subdomínio notes.seoft.com.br
  if (host === "notes.seoft.com.br") {
    const url = new URL(req.url);
    url.hostname = "seoft.com.br";
    url.pathname = "/notes";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // aplica em todas as rotas
  matcher: "/:path*",
};
