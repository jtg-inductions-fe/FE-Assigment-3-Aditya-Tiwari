import { z } from "zod";

export const githubTokenRegex =
  /^(gh[ps]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/;

export const loginSchema = z.object({
  AccessToken: z.string().regex(githubTokenRegex, {
    message: "Invalid token",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
