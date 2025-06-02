"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "请输入密码" }),
});

const SignInView = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "qwer@qwer.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          console.log("登陆成功");
          router.push("/");
          setPending(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        },
      },
    );
  };
  return (
    <div className=" flex flex-col gap-6">
      <Card className=" overflow-hidden p-0">
        <CardContent className=" grid p-0 md:grid-cols-2 ">
          <Form {...form}>
            <form
              className=" p-6 md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className=" flex flex-col gap-6">
                <div className=" flex flex-col items-center text-center">
                  <h1 className=" text-2xl  font-bold">欢迎回来</h1>
                  <p className=" text-muted-foreground text-balance">
                    登录你的账户
                  </p>
                </div>

                <div className=" grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>邮箱</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="qwer@qwer.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="12345678"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {!!error && (
                  <Alert className=" bg-destructive/10  border-none">
                    <OctagonAlertIcon className=" size-4 !text-destructive" />
                    <AlertTitle>错误:{error}</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" disabled={pending} className=" w-full">
                  登录
                </Button>
                <div
                  className=" after:border-border relative text-center text-sm after:absolute 
                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t "
                >
                  <span className=" bg-card text-muted-foreground  relative z-10 px-2">
                    或者
                  </span>
                </div>

                <div className=" grid grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full cursor-pointer"
                  >
                    Google
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full cursor-pointer"
                  >
                    Github
                  </Button>
                </div>

                <div className=" text-center text-sm">
                  没有账户？{" "}
                  <Link
                    className=" underline underline-offset-4"
                    href={"/sign-up"}
                  >
                    注册
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div
            className=" bg-radial from-green-700 to-green-900 
           relative hidden md:flex flex-col gap-y-4
            items-center justify-center"
          >
            <img src="/logo.svg" alt="Image" className=" size-[92px]" />
            <p className=" text-2xl font-semibold text-white">遇见AI</p>
          </div>
        </CardContent>
      </Card>

      <div
        className=" text-muted-foreground *:[a]:hover:text-primary text-center
       text-xs text-balance  *:[a]:underline *:[a]:underline-offset-4"
      >
        点击继续，你同意我们的<a href="#">服务条款</a>和<a href="#">隐私策略</a>
      </div>
    </div>
  );
};

export default SignInView;
