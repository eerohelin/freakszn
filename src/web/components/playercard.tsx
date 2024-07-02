import type React from "react";
import { cn, getOPGG } from "../lib/utils";
import { useSummonerIcon } from "../hooks/useSummonerIcon";
import { Tag } from "./tag";

interface Player {
  name: string;
  iconId: number | string;
  summonerLevel: number;
  ready: boolean;
  inGameLobby: boolean;
  rankData: {
    rank: string;
    division: string;
    lp: number;
  };
  availability: boolean;
}

interface PlayerCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  player: Player;
  side: "blue" | "red";
}

const PlayerCard = ({
  player,
  side,
  className,
  onClick,
  ...props
}: PlayerCardProps) => {
  const { i } = useSummonerIcon(Number(player.iconId));
  const { i: placeholder } = useSummonerIcon(29);
  return (
    <div
      {...props}
      onClick={onClick}
      className={cn(
        "w-full py-1 px-1 rounded-md flex shadow-sm shadow-black/80",
        className,
      )}
    >
      <div
        className={cn(
          "w-full flex gap-4 items-center",
          side === "red" ? "justify-end" : "",
        )}
      >
        {side === "blue" && (
          <div className="w-full h-full flex items-center gap-3">
            <img
              className="w-16 h-16"
              alt="summoner icon"
              src={i.length > 1000 ? i : placeholder}
            />
            <PlayerDetails side={side} player={player} />

            <div className="relative w-full h-full">
              <div className="absolute flex gap-1 items-center right-0 bottom-0 h-4">
                <Tag
                  className={cn(
                    "text-xs bg-black/30 border border-border w-[5.5rem] text-center truncate shadow",
                    player?.availability === true
                      ? "text-text"
                      : "text-stone-500",
                    player?.inGameLobby && "text-text",
                  )}
                >
                  {player.inGameLobby
                    ? "In lobby"
                    : player?.availability === true
                      ? "Available"
                      : "Unavailable"}
                </Tag>
                <div className="relative w-4 h-4 flex flex-col items-center justify-center content-center">
                  {player.ready && (
                    <svg
                      className="absolute w-3 h-3 z-10 fill-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      height="800px"
                      width="800px"
                      viewBox="0 0 512 512"
                    >
                      <title>check</title>
                      <style type="text/css" />
                      <g>
                        <polygon points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945" />
                      </g>
                    </svg>
                  )}
                  <div className="absolute bg-black/60 border border-black/50 h-full w-4" />
                </div>
              </div>
            </div>
          </div>
        )}
        {side === "red" && (
          <div className="w-full h-full flex items-center gap-3">
            <div className="relative w-full h-full">
              <div className="absolute flex gap-1 items-center left-0 bottom-0 h-4">
                <div className="relative w-4 h-4 flex flex-col items-center justify-center content-center">
                  {player.ready && (
                    <svg
                      className="absolute w-3 h-3 z-10 fill-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      height="800px"
                      width="800px"
                      viewBox="0 0 512 512"
                    >
                      <title>check</title>
                      <style type="text/css" />
                      <g>
                        <polygon points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945" />
                      </g>
                    </svg>
                  )}
                  <div className="absolute bg-black/60 border border-black/50 h-full w-4" />
                </div>
                <Tag
                  className={cn(
                    "text-xs bg-black/30 border border-border w-[5.5rem] text-center truncate shadow",
                    player?.availability === true
                      ? "text-text"
                      : "text-stone-500",
                    player?.inGameLobby && "text-purple-400",
                  )}
                >
                  {player.inGameLobby
                    ? "In Lobby 😈"
                    : player?.availability === true
                      ? "Available"
                      : "Unavailable"}
                </Tag>
              </div>
            </div>

            <PlayerDetails side={side} player={player} />
            <img
              className="w-16 h-16"
              alt="summoner icon"
              src={i.length > 1000 ? i : placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

function PlayerDetails({
  player,
  side,
}: { player: Player; side: "blue" | "red" }) {
  return (
    <div className={cn("w-full", side === "red" && "text-right")}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <p
        className="text-2xl font-beaufort cursor-pointer hover:underline"
        onClick={() => window.electronAPI.openLink(getOPGG(player))}
      >
        {player.name}
      </p>
      <div className="text-sm w-full">
        <div className="truncate">
          {player?.rankData?.rank} {player?.rankData?.division}
          <span className="truncate text-neutral-400 ml-1">
            {player?.rankData?.lp} LP
          </span>
        </div>
      </div>
      <p className="text-xs">level {player.summonerLevel}</p>
    </div>
  );
}

export default PlayerCard;
