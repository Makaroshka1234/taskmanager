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
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/schadComponents/ui/field";
import { Input } from "@/schadComponents/ui/input";
import Link from "next/link";
import { AuthFormP } from "../types/auth";

function AuthForm(props: AuthFormP) {
  const { type } = props;
  const isLoginForm = type === "Login";

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
          <form action="" id="auth-form">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" placeholder="example@google.com" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" />
                </Field>
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
