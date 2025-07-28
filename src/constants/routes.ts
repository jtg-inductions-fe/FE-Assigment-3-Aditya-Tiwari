// TODO: Add all route constants

type Routes = {
  LOGIN: string;
  DEFAULT: string;
};

export const ROUTES: Routes = {
  LOGIN: "/login",
  DEFAULT: "/",
} as const;

export const GITHUB_API = {
  BASE_URL: "https://api.github.com",
  ROUTES: {
    USER: "/user",
  },
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.DEFAULT] as const;

export const USERNAME_ROUTE_REGEX = /^\/[^/]+$/;
