import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface AgentIdViewHeaderProps {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}

const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onRemove,
}: AgentIdViewHeaderProps) => {
  return (
    <div className=" flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className=" font-medium text-xl">
              <Link href={"/agents"}>我的代理</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className=" text-foreground  text-xl [&>svg]:size-4">
            <ChevronRightIcon />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className=" font-medium text-xl text-foreground"
            >
              <Link href={`/agents/${agentId}`}>{agentName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className=" size-4 text-black" />
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className=" size-4 text-black" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgentIdViewHeader;
