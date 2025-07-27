"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  username: string;
  expiresAt: string;
};

export async function createSession(username: string) {
  const expiresAtDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const expiresAt = expiresAtDate.toISOString();

  const payload: SessionPayload = { username, expiresAt };
  const session = await encrypt(payload);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAtDate,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
