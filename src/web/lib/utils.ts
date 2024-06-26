import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProfileClashBannerUrl(
  bannerTheme?: string,
  level?: number,
): string {
  if (!bannerTheme || !level) {
    return "";
  }
  /*
  const response = await fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-banners.json")
  const clashBannerData = await response.json()
  */
  const bt = bannerTheme.toLowerCase();
  const clashBannerUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summonerbanners/flags/${bt}/leagueclient/flag_${bt}_${level}_inventory.png`;
  console.log("banner:", clashBannerUrl);
  return clashBannerUrl;
}
