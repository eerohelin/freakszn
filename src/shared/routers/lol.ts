import { publicProcedure, router } from "@src/trpc";

export const lolRouter = router({
  loadAccount: publicProcedure.mutation(async ({ ctx }) => {
    
  })
});

/**
 * minimize: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) return;
    ctx.window.minimize();
  }),
 */