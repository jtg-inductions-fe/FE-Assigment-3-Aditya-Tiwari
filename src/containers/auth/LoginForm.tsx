"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { login } from "@/actions/authActions";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "./LoginForm.schema";

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      accessToken: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await login(data);
      if (result?.errors) {
        Object.entries(result.errors).forEach(([, messages]) => {
          toast("Invalid login", {
            description: messages,
            classNames: {
              title: "font-semibold",
            },
          });
        });
      }
    });
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="accessToken"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor={field.name}>Access Token</Label>
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Access Token"
                        value={field.value ?? ""}
                        disabled={isPending}
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
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export { LoginForm };
