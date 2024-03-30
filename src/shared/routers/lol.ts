import { getLCU } from "@src/main";
import { publicProcedure, router } from "@src/trpc";
import { deleteSummoners, getSummoner, updateSummoner } from "../db";
import { observable } from "@trpc/server/observable";

export const lolRouter = router({
  setSummoner: publicProcedure.mutation(async ({ ctx }) => {
    const lcu = getLCU();
    if (!lcu) {
      return;
    }
    const summoner = await lcu.getCurrentSummoner();
    console.log("updating summoner with:", summoner);
    await updateSummoner({ ...summoner });
  }),
  getSummoner: publicProcedure.query(async () => {
    return await getSummoner();
  }),
  deleteSummoners: publicProcedure.mutation(async () => {
    return await deleteSummoners();
  }),
});

/**
 * minimize: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) return;
    ctx.window.minimize();w
  }),
 */
