import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import * as schema from "./schema/index";

const sqlite = new Database(`${app.getPath("userData")}/db.sqlite`);
export const db = drizzle(sqlite, { schema });

/** DB ACTIONS */
export async function updateSummoner(summoner: Summoner): Promise<void> {
  try {
    await db
      .insert(schema.summoners)
      .values({
        id: 1,
        ...summoner,
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
        },
      });
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getSummoner(): Promise<Summoner[]> {
  const summoners = await db.select().from(schema.summoners);
  return summoners;
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
}
