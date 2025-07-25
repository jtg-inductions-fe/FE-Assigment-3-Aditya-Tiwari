"use client";

import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const AUTH_TOKEN = formData.get("AccessToken");

    try {
      const response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (response.ok) {
        setCookie("user", JSON.stringify(response), {
          path: "/",
          maxAge: 30, // Expires after 30seconds
          sameSite: true,
        });

        router.push("/");
        // const user = await response.json();
      } else {
        // Add unauthorised access comment
      }
    } catch (err) {
      throw Error("Error occured while authenticating");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your Github access token below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="AccessToken">Access Token</Label>
              <Input
                id="AccessToken"
                type="text"
                name="AccessToken"
                placeholder="Access Token"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="login" type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
