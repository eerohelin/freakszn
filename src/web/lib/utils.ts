import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { NAV_ITEMS_ORDER } from "./constants";

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
  const bt = bannerTheme.toLowerCase();
  const clashBannerUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summonerbanners/flags/${bt}/leagueclient/flag_${bt}_${level}_inventory.png`;
  return clashBannerUrl;
}

export function getMulti(team: any) {
  let multi = "";

  for (const player of Object.values(team)) {
    // @ts-ignore
    let tagline = player.tagline;
    if (tagline[0] !== "#") {
      tagline = `#${tagline}`;
    }
    // @ts-ignore
    multi += `${player.name}${tagline},`;
  }

  const final = `https://www.op.gg/multisearch/euw?summoners=${encodeURIComponent(
    multi,
  )}`;
  console.log("finaalibro:", final);
  return final;
}

export function getOPGG(player: any) {
  return `https://www.op.gg/summoners/euw/${player.name}-${player.tagline}`;
}

export function getPageTransitionDirection(
  prevPathname?: string,
  pathname?: string,
): "left" | "right" {
  if (!prevPathname || !pathname) {
    return "right";
  }
  if (
    NAV_ITEMS_ORDER.indexOf(prevPathname) > NAV_ITEMS_ORDER.indexOf(pathname)
  ) {
    return "right";
  }
  return "left";
}
