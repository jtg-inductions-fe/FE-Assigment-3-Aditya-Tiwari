"use server";

import { createLoginSession, clearLoginSession } from "@/lib/utils/session";
import { redirect } from "next/navigation";
import { GITHUB_API, ROUTES } from "@/constants/routes";
import { LoginFormValues } from "@/constants/validation";
import fetcher from "@/lib/utils/fetcher";

const login = async (values: LoginFormValues) => {
  const AccessToken = values.AccessToken;

  const { responseData, userName } = await fetcher(
    GITHUB_API.BASE_URL,
    GITHUB_API.ROUTES.USER,
    AccessToken
  );

  if (responseData.status === "401" || userName === undefined) {
    return {
      errors: {
        AccessToken: ["Invalid or expired token. Please try again."],
      },
    };
  }

  await createLoginSession(AccessToken);
  redirect(`/${userName}`);
};

const logout = async () => {
  await clearLoginSession();
  redirect(ROUTES.LOGIN);
};

export { login, logout };
