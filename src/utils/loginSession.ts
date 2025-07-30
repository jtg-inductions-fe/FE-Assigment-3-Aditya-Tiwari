"use server";

import { ROUTES } from "@/constants/routes";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  LOGIN_SESSION_COOKIE_NAME,
  LOGIN_SESSION_EXPIRY_MS,
  LOGIN_SESSION_EXPIRATION,
  JWT_ALGORITHM,
} from "./loginSession.constants";

const secretKey = process.env.SESSION_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  accessToken: string;
};

export const createLoginSession = async (accessToken: string) => {
  const expiresAtDate = new Date(Date.now() + LOGIN_SESSION_EXPIRY_MS);

  const payload: SessionPayload = { accessToken };
  const session = await encrypt(payload);

  const cookieStore = await cookies();

  cookieStore.set(LOGIN_SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: ROUTES.DEFAULT,
    expires: expiresAtDate,
  });
};

export const clearLoginSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(LOGIN_SESSION_COOKIE_NAME);
};

export const encrypt = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(LOGIN_SESSION_EXPIRATION)
    .sign(encodedKey);
};

export const decrypt = async (
  session: string | undefined = ""
): Promise<SessionPayload | null> => {
  try {
    if (session.length === 0) return null;
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [JWT_ALGORITHM],
    });

    return payload as SessionPayload;
  } catch {
    return null;
  }
};
