"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { login } from "@/app/(auth)/login/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

type LoginFormValues = {
  AccessToken: string;
};

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [state, loginAction] = useActionState(login, undefined);
  const { pending } = useFormStatus();

  React.useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        form.setError(field as keyof LoginFormValues, {
          type: "server",
          message: Array.isArray(messages) ? messages.join(", ") : messages,
        });
      });
    }
  }, [state?.errors, form]);

  return (
    <Card className="w-full max-w-sm flex gap-6">
      <CardHeader className="flex-col">
        <Image
          src="/images/Logo.png"
          alt="company logo"
          className="justify-self-center my-3"
          height={100}
          width={100}
        />
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your Github access token below to login to your account
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form action={loginAction} noValidate>
          <CardContent>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="AccessToken"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor={field.name}>Access Token</Label>
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Access Token"
                        value={field.value ?? ""}
                        aria-invalid={
                          form.formState.errors.AccessToken ? "true" : "false"
                        }
                        disabled={pending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full my-2"
              disabled={pending}
              aria-disabled={pending}
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
