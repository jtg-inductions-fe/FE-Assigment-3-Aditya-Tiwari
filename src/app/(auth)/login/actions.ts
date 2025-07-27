"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const githubTokenRegex =
  /^(gh[ps]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/;

const loginSchema = z.object({
  AccessToken: z.string().regex(githubTokenRegex, {
    message: "Invalid token",
  }),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { AccessToken } = result.data;

  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AccessToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    return {
      errors: {
        AccessToken: ["Invalid token"],
      },
    };
  }

  const data = await response.json();
  await createSession(data.login);

  redirect(`/${data.login}`);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
