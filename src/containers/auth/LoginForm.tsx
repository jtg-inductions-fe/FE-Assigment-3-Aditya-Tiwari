"use client";

import React, { useState } from "react";
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
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/constants/validation";

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const result = await login(data);
    setIsLoading(false);

    if (result?.errors) {
      Object.entries(result.errors).forEach(([field, messages]) => {
        form.setError(field as keyof LoginFormValues, {
          type: "manual",
          message: messages[0],
        });
      });
    }
  };

  return (
    <Card className="w-full max-w-sm flex gap-6">
      <CardHeader className="flex-col">
        <Image
          src="/images/Logo.png"
          alt="Github profile viewer"
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
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
                        disabled={isLoading}
                        autoComplete="off"
                        required
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
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
