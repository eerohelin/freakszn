import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProfileSplashUrl(backgroundSkinId?: number): string {
  if(!backgroundSkinId){ return "" }
  const championId = backgroundSkinId.toString().slice(0, -3)
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${backgroundSkinId}.jpg`
}