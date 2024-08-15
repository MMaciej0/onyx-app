import LoadingButton from "@/components/LoadingButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/lib/hooks/useAuthContext";
import { useNavigate } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createLazyFileRoute("/_home-layout/login")({
  component: Login,
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();

  const {
    auth: { login, user, accessToken, isLoading },
  } = useAuthContext();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, setError } = form;

  useEffect(() => {
    if (user && accessToken && !isLoading) {
      navigate({ to: "/budget" });
    }
  }, [user, accessToken, navigate, isLoading]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const isLoggedIn = await login(data.email, data.password);

      if (!isLoggedIn) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root", {
        type: "manual",
        message: "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>Sign in</CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="Email" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" placeholder="Password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <p className="text-red-500">
                  {form.formState.errors.root.message}
                </p>
              )}
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full"
              >
                Sign in
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
