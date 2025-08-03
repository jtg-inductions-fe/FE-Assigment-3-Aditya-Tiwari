import { LOGIN_SESSION_COOKIE_NAME } from "@/utils/loginSession.constants";
import { cookies } from "next/headers";
import { decrypt } from "./loginSession";
import {
  GithubUnauthorisedResponse,
  GitHubUserResponse,
} from "@/types/githubResponse";
import { GITHUB_API } from "@/constants/routes";

interface FetchDataOptions {
  resource: string;
  revalidate?: number;
  accessToken?: string;
  baseURL?: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  body?: BodyInit;
  mode?: "cors" | "no-cors" | "same-origin";
}

interface FetchDataResponse {
  responseData: GitHubUserResponse | GithubUnauthorisedResponse;
  userName?: string;
}

const fetchData = async ({
  resource,
  revalidate,
  accessToken,
  baseURL,
  method = "get",
  body,
  mode = "cors",
}: FetchDataOptions): Promise<FetchDataResponse> => {
  if (!accessToken) {
    const cookieStore = await cookies();
    const session = cookieStore.get(LOGIN_SESSION_COOKIE_NAME)?.value;
    if (session) {
      const decrypted = await decrypt(session);
      accessToken = decrypted?.accessToken;
    }
  }

  if (!accessToken) {
    return {
      responseData: {
        status: "401",
        message: "Unauthorized access",
      },
    };
  }

  const response = await fetch(
    `${baseURL || process.env.GITHUB_BASE_URL}${resource}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      ...(body ? { body } : {}),
      next: {
        revalidate: revalidate ?? GITHUB_API.REVALIDATE.DEFAULT,
      },
      mode,
    }
  );

  const responseData = await response.json();
  return {
    responseData,
    ...(responseData.login && { userName: responseData.login }),
  };
};

export { fetchData };
