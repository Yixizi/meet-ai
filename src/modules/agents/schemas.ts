import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "请输入名字" }),
  instructions: z.string().min(1, { message: "请输入说明" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "必须传入ID" }),
});
