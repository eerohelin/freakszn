import pkg from "../../../package.json";
import { publicProcedure, router } from "@src/trpc";
import { userRouter } from "./user";
import { windowRouter } from "./window";
import { lolRouter } from "./lol";

export const appRouter = router({
  window: windowRouter,
  user: userRouter,
  lol: lolRouter,
  version: publicProcedure.query(async () => {
    return pkg.version;
  }),
});

export type AppRouter = typeof appRouter;
