import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import * as schema from "./schema/index";
import { eq } from "drizzle-orm";

const sqlite = new Database(`${app.getPath("userData")}/db.sqlite`);
export const db = drizzle(sqlite, { schema });

/** DB ACTIONS */
export async function updateSummoner(summoner: Summoner, bannerData: string): Promise<void> {
  try {
    const bd = JSON.parse(bannerData)
    const { theme, level } = bd

    await db
      .insert(schema.summoners)
      .values({
        id: 1,
        ...summoner,
        bannerTheme: theme || "",
        bannerLevel: level || 0
      })
      .onConflictDoUpdate({
        target: schema.summoners.id,
        set: {
          accountId: summoner.accountId,
          displayName: summoner.displayName,
          gameName: summoner.gameName,
          internalName: summoner.gameName,
          profileIconId: summoner.profileIconId,
          summonerId: summoner.summonerId,
          summonerLevel: summoner.summonerLevel,
          puuid: summoner.puuid,
          tagLine: summoner.tagLine,
          backgroundSkinId: summoner.backgroundSkinId,
          bannerTheme: theme || "",
          bannerLevel: level || 0
        },
      });
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getSummoner(): Promise<Summoner | undefined> {
  const summoner = await db.query.summoners.findFirst({
    where: eq(schema.summoners.id, 1)
  })
  return summoner;
}

export async function deleteSummoners(): Promise<void> {
  await db.delete(schema.summoners);
}

/** DB TYPES */
export interface Summoner {
  accountId: number;
  displayName: string;
  gameName: string;
  internalName: string;
  profileIconId: number;
  puuid: string;
  summonerId: number;
  summonerLevel: number;
  tagLine: string;
  backgroundSkinId: number;
  bannerTheme: string;
  bannerLevel: number;
}
