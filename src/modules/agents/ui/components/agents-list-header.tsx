"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircle, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentDialog from "./new-agent-dialog";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilter();
  const isAnyFilterModifie = !!filters.search;
  const onClearFilter = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className=" p-4 md:px-8 flex flex-col gap-y-4 ">
        <div className=" flex items-center justify-between">
          <h5 className="font-medium text-xl">我的代理</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            新代理
          </Button>
        </div>
        <div className=" flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModifie && (
            <Button variant={"outline"} size={"sm"} onClick={onClearFilter}>
              <XCircleIcon />
              清除
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentsListHeader;
