import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoutes = ["/login", "/"];
  const isPublicRoute = publicRoutes.includes(path);

  const isUsernameRoute = /^\/[^/]+$/.test(path) && !isPublicRoute;

  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  if (isUsernameRoute && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && session?.username) {
    return NextResponse.redirect(new URL(`/${session.username}`, req.nextUrl));
  }

  return NextResponse.next();
}
