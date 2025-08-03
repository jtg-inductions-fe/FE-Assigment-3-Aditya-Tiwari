import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/loginSession";
import {
  GITHUB_API,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
} from "@/constants/routes";
import { fetchData } from "@/utils/fetchData";
import { LOGIN_SESSION_COOKIE_NAME } from "@/utils/loginSession.constants";

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    typeof route === "string" ? route === path : route.test(path)
  );

  const cookieStore = await cookies();
  const cookie = cookieStore.get(LOGIN_SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (!isPublicRoute && isProtectedRoute && !session?.accessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }

  if (path === ROUTES.LOGIN && session?.accessToken) {
    const { userName } = await fetchData({ resource: GITHUB_API.ROUTES.USER });

    return NextResponse.redirect(new URL(`/${userName}`, req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
