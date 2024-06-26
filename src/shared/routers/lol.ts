import { getLCU } from "@src/main";
import { publicProcedure, router } from "@src/trpc";
import { deleteSummoners, getSummoner, updateSummoner } from "../db";
import { z } from "zod";

export const lolRouter = router({
  setSummoner: publicProcedure.mutation(async ({ ctx }) => {
    const lcu = getLCU();
    if (!lcu) {
      return;
    }
    let summoner = await lcu.getCurrentSummoner();
    const rankData = await lcu.getCurrentSummonerRank()

    summoner = {
      ...summoner,
      ...rankData
    }
    console.log("updating summoner with:", summoner);
    await updateSummoner({ ...summoner });
  }),
  getSummoner: publicProcedure.query(async () => {
    return await getSummoner();
  }),
  deleteSummoners: publicProcedure.mutation(async () => {
    return await deleteSummoners();
  }),
  getSummonerIcon: publicProcedure
    .input(
      z.object({
        id: z.number()
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const lcu = getLCU();
      if (!lcu) {
        return;
      }
      const buffer = await lcu.getSummonerIcon(id);
      return buffer;
    }),
  joinLobby: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const lcu = getLCU();
      await lcu?.joinLobby(Number(input.id), "");
      return true
    }),
  createLobby: publicProcedure.query(async () => {
    const lcu = getLCU();
    await lcu?.createLobby("freakszn", "", 1);
    return true
  }),
  isClientOpen: publicProcedure.query(async () => {
    return getLCU() !== undefined;
  }),
});

/**
 * minimize: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) return;
    ctx.window.minimize();w
  }),
 */
