// TODO: Add all route constants

export const ROUTES = {
  LOGIN: "/login",
  DEFAULT: "/",
} as const;

export const GITHUB_API = {
  ROUTES: {
    USER: "/user",
    USERS: "/users",
  },
  REVALIDATE: {
    DEFAULT: 0,
  },
} as const;

export const PUBLIC_ROUTES: string[] = [ROUTES.LOGIN, ROUTES.DEFAULT] as const;

/** Regular expression for /[username] dynamic route like /john, not /john/settings */
export const USERNAME_ROUTE_REGEX = /^\/[^/]+$/;

export const PROTECTED_ROUTES: (string | RegExp)[] = [USERNAME_ROUTE_REGEX];
