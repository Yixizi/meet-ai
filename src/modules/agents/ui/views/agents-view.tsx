"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const AgentsView = () => {
  const trpc = useTRPC();
  const {
    data,
    // , isLoading, isError
  } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  //   if (isLoading)
  //     return <LoadingState title="加载代理中" description="这可能需要一些时间" />;
  //   if (isError)
  //     return <ErrorState title="加载代理出错" description="请稍后重新尝试获取" />;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default AgentsView;

export const AgentsViewLoading = () => {
  return <LoadingState title="加载代理中" description="这可能需要一些时间" />;
};

export const AgentsViewError = () => {
  return <ErrorState title="加载代理出错" description="请稍后重新尝试获取" />;
};
