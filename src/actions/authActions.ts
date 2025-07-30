"use server";

import { createLoginSession, clearLoginSession } from "@/utils/loginSession";
import { redirect } from "next/navigation";
import { GITHUB_API, ROUTES } from "@/constants/routes";
import { LoginFormValues } from "@/containers/auth";
import fetcher from "@/utils/fetchData";

const login = async (values: LoginFormValues) => {
  const accessToken = values.accessToken;

  const { responseData, userName } = await fetcher(
    GITHUB_API.ROUTES.USER,
    accessToken
  );

  if (responseData.status === "401" || userName === undefined) {
    return {
      errors: {
        accessToken: ["Invalid or expired token. Please try again."],
      },
    };
  }

  await createLoginSession(accessToken);
  redirect(`/${userName}`);
};

const logout = async () => {
  await clearLoginSession();
  redirect(ROUTES.LOGIN);
};

export { login, logout };
