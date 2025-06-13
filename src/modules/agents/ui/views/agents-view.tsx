"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilter();

  const router = useRouter();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );
  return (
    <div className=" flex pb-4 px-4 md:px-8 flex-1  flex-col gap-y-4">
      <DataTable
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
        columns={columns}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.item.length === 0 && (
        <EmptyState
          title="创建你的第一个代理"
          description="创建一个代理加入你的会议。每个代理都会遵循你的指令，并可以在通话期间与参与者互动。"
        />
      )}
    </div>
  );
};

export default AgentsView;

export const AgentsViewLoading = () => {
  return <LoadingState title="加载代理中" description="这可能需要一些时间" />;
};

export const AgentsViewError = () => {
  return <ErrorState title="加载代理出错" description="请稍后重新尝试获取" />;
};
