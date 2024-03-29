import pkg from "../../../package.json";
import { publicProcedure, router } from "@src/trpc";
import { userRouter } from "./user";
import { windowRouter } from "./window";
import { lolRouter } from "./lol";
import { shell } from "electron";

export const appRouter = router({
  window: windowRouter,
  user: userRouter,
  lcu: lolRouter,
  version: publicProcedure.query(async () => {
    return pkg.version;
  }),
  gh: publicProcedure.mutation(async () => {
    shell.openExternal("https://github.com/rikurainio/juu");
  }),
});

export type AppRouter = typeof appRouter;
