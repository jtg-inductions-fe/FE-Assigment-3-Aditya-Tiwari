import { LOGIN_SESSION_COOKIE_NAME } from "@/constants/session";
import { cookies } from "next/headers";
import { decrypt } from "./session";

const fetchData = async (
  baseURL: string,
  route: string,
  accessToken?: string
) => {
  if (!accessToken) {
    const cookieStore = await cookies();
    const session = cookieStore.get(LOGIN_SESSION_COOKIE_NAME)?.value;
    if (session) {
      const decrypted = await decrypt(session);
      accessToken = decrypted?.accessToken;
    }
  }

  if (!accessToken) {
    throw new Error("Access token not found.");
  }
  const response = await fetch(`${baseURL}${route}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
    next: {
      revalidate: 60,
    },
  });

  const responseData = await response.json();
  const userName = responseData.login;
  return { responseData, userName };
};

export default fetchData;
