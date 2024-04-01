import type React from "react";
import { cn } from "../lib/utils";
import { useSummonerIcon } from "../hooks/useSummonerIcon";
import { Tag } from "./tag";

interface Player {
name: string;
iconId: number | string;
summonerLevel: number;
rankData: {
  rank: string,
  division: string
  lp: number,
}
};

interface PlayerCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  player: Player
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
      className={cn("w-full py-1 px-1 rounded-md flex", className)}
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
              <div className="absolute bg-black/50 border border-black w-4 h-4 right-0 bottom-0" />
            </div>
          </div>
        )}
        {side === "red" && (
          <div className="w-full h-full flex items-center gap-3">
            <div className="relative w-full h-full">
              <Tag>asd</Tag>
              <div className="absolute bg-black/50 border border-black w-4 h-4 left-0 bottom-0" />
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

function PlayerDetails({ player, side }: { player: Player, side: "blue" | "red" }){
  return (
    <div className={cn("w-full", side === "red" && "text-right")}>
      <p className="text-2xl font-beaufort">{player.name}</p>
      <div className="text-sm">
        <span>{player?.rankData?.rank} {player?.rankData?.division}</span>
        <span className="ml-1 text-neutral-400">{player?.rankData?.lp} LP</span>
      </div>
      <p className="text-xs">level {player.summonerLevel}</p>
    </div>
  )
}

export default PlayerCard;
