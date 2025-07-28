import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/utils/session";
import {
  GITHUB_API,
  PUBLIC_ROUTES,
  ROUTES,
  USERNAME_ROUTE_REGEX,
} from "./constants/routes";
import fetcher from "./lib/utils/fetcher";
import { LOGIN_SESSION_COOKIE_NAME } from "./constants/session";

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const isUsernameRoute = USERNAME_ROUTE_REGEX.test(path) && !isPublicRoute;

  const cookieStore = await cookies();
  const cookie = cookieStore.get(LOGIN_SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (isUsernameRoute && !session?.accessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }

  if (path === ROUTES.LOGIN && session?.accessToken) {
    const { userName } = await fetcher(
      GITHUB_API.BASE_URL,
      GITHUB_API.ROUTES.USER
    );

    return NextResponse.redirect(new URL(`/${userName}`, req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
