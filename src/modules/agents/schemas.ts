import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "请输入名字" }),
  instructions: z.string().min(1, { message: "请输入说明" }),
});
