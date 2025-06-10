"use client";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const router = useRouter();
  const {
    data: session,
    // isPending, //loading state
    // error, //error object
    // refetch, //refetch the session
  } = authClient.useSession();

  if (!session) {
    return <p>加载中</p>;
  }

  return (
    <div className=" flex flex-col p-4 gap-y-4">
      <p>已登录{session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("sign-in"),
            },
          })
        }
      >
        退出
      </Button>
    </div>
  );
}
