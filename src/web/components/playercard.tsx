import type React from "react";
import { cn } from "../lib/utils";
import { useSummonerIcon } from "../hooks/useSummonerIcon";

interface PlayerCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  player: {
    name: string;
    iconId: number | string;
    summonerLevel: number;
    rankData: {
      rank: string,
      division: string
      lp: number,
    }
  };
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
      className={cn("w-full py-1 px-2 rounded-md", className)}
    >
      <div
        className={cn(
          "w-full flex gap-4 items-center",
          side === "red" ? "justify-end" : "",
        )}
      >
        {side === "blue" && (
          <>
            <img
              className="w-16 h-16"
              alt="summoner icon"
              src={i.length > 1000 ? i : placeholder}
            />
            <div>
              <p className="text-2xl font-beaufort">{player.name}</p>
              <div className="text-sm">
                <span>{player?.rankData?.rank} {player?.rankData?.division}</span>
                <span className="ml-1 text-neutral-400">{player?.rankData?.lp} LP</span>
              </div>
              <p className="text-xs">level {player.summonerLevel}</p>
            </div>
          </>
        )}
        {side === "red" && (
          <>
            <div>
              <p className="text-2xl font-beaufort text-end">{player.name}</p>
              <span>{player?.rankData?.rank}</span>
            </div>
            <img
              className="w-16 h-16"
              alt="summoner icon"
              src={i.length > 1000 ? i : placeholder}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
