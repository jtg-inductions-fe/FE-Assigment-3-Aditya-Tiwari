import { LOGIN_SESSION_COOKIE_NAME } from "@/utils/loginSession.constants";
import { cookies } from "next/headers";
import { decrypt } from "./loginSession";

const fetchData = async (
  route: string,
  accessToken?: string,
  baseURL?: string
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

  const response = await fetch(
    `${baseURL || process.env.GITHUB_BASE_URL}${route}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate: 60,
      },
    }
  );

  const responseData = await response.json();
  const userName = responseData.login;
  return { responseData, userName };
};

export default fetchData;
