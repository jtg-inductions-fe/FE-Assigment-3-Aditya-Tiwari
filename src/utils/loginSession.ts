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

interface SessionPayload extends Record<string, unknown> {
  accessToken: string;
}

type AccessToken = SessionPayload["accessToken"];

export const createLoginSession = async (accessToken: AccessToken) => {
  const expiresAtDate = new Date(Date.now() + LOGIN_SESSION_EXPIRY_MS);

  const payload = { accessToken } satisfies SessionPayload;
  const session = await encrypt(payload);

  const cookieStore = await cookies();

  cookieStore.set(LOGIN_SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
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
  session: string = ""
): Promise<SessionPayload | null> => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: [JWT_ALGORITHM],
    });

    return payload;
  } catch {
    return null;
  }
};
