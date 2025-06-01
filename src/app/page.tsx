"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("yixizi@gmail.com");
  const [password, setPassword] = useState("12345678");
  const {
    data: session,
    // isPending, //loading state
    // error, //error object
    // refetch, //refetch the session
  } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (err) => {
          console.log(err);
          window.alert("未知名报错");
        },
        onSuccess: () => {
          window.alert("成功");
        },
      },
    );
  };
  const onLogin = () => {
    authClient.signIn.email(
      {
        email,

        password,
      },
      {
        onError: (err) => {
          console.log(err);
          window.alert("未知名报错");
        },
        onSuccess: () => {
          window.alert("成功");
        },
      },
    );
  };

  if (session) {
    return (
      <div className=" flex flex-col p-4 gap-y-4">
        <p>已登录{session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>退出</Button>
      </div>
    );
  }
  return (
    <div className=" flex flex-col gap-4 justify-center items-center">
      <Input
        placeholder="名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      <Input
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Button onClick={onSubmit}>创建用户</Button>

      <div className=" pt-20 flex flex-col gap-4 justify-center items-center">
        <Input
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={onLogin}>登录</Button>
      </div>
    </div>
  );
}
