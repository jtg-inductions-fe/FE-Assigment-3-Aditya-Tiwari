"use client";

import { CookiesProvider as ReactCookieProvider } from "react-cookie";

const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReactCookieProvider>{children}</ReactCookieProvider>;
};

export default CookieProvider;
