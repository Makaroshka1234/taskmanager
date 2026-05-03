"use client";
import { Button } from "@/schadComponents/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/schadComponents/ui/field";
import { Input } from "@/schadComponents/ui/input";
import Link from "next/link";
import { AuthFormP } from "../types/auth";
import { Controller, useForm } from "react-hook-form";
import {
  registerSchema,
  TypeRegisterSchema,
} from "../api/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";

function AuthForm(props: AuthFormP) {
  const { type } = props;
  const isLoginForm = type === "Login";
  const router = useRouter();
  const { refreshUser } = useAuth();

  const onRegSubmit = async (values: TypeRegisterSchema) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      const data = await res.json();
      console.log(data.error);
    }
  };
  const onLoginSubmit = async (values: TypeRegisterSchema) => {
    const res = await fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      await refreshUser();
      router.push("/profile");
    } else {
      const data = await res.json();
      console.log(data.error);
    }
  };

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <div className="container">
      <Card className="relative mx-auto w-full max-w-xl pt-5" size="default">
        <CardHeader>
          <CardTitle>
            {isLoginForm ? "Login to" : "Register"} your account
          </CardTitle>
          <CardDescription>
            Enter your email below to {isLoginForm ? "Login to" : "Register"}{" "}
            your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href={isLoginForm ? "/reg" : "/login"}>
                {isLoginForm ? "Sign up" : "Sign in"}
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(
              isLoginForm ? onLoginSubmit : onRegSubmit,
            )}
            id="auth-form"
          >
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="example@google.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        aria-invalid={fieldState.invalid}
                        {...field}
                        id="password"
                        type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="auth-form">
            {type}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthForm;
