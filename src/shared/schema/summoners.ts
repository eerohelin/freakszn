import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const summoners = sqliteTable("summoners", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  accountId: integer("accountId").notNull(),
  displayName: text("displayName").notNull(),
  gameName: text("gameName").notNull(),
  internalName: text("internalName").notNull(),
  profileIconId: integer("profileIconId").notNull(),
  puuid: text("puuid").notNull(),
  summonerId: integer("summonerId").notNull(),
  summonerLevel: integer("summonerLevel").notNull(),
  tagLine: text("tagLine").notNull(),
  backgroundSkinId: integer("backgroundSkinId").notNull(),
  bannerTheme: text("bannerTheme").notNull(),
  bannerLevel: integer("bannerLevel").notNull(),
  rank: text("rank").notNull(),
  division: text("division").notNull(),
  lp: integer("lp").notNull()
});
