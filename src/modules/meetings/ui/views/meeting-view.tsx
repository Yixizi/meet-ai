"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetins.getMany.queryOptions({}));

  return <div>{JSON.stringify(data)}</div>;
};

export const MeetingsViewLoading = () => {
  return <LoadingState title="加载会议中" description="这可能需要一些时间" />;
};

export const MeetingsViewError = () => {
  return <ErrorState title="加载会议出错" description="请稍后重新尝试获取" />;
};
