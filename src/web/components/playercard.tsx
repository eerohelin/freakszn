import type React from "react"
import { cn } from "../lib/utils"
import { useSummonerIcon } from "../hooks/useSummonerIcon"

interface PlayerCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  player: {
    name: string
    iconId: number | string
  }
}

const PlayerCard = ({ player, className, onClick, ...props }: PlayerCardProps) => {
  const { i } = useSummonerIcon(Number(player.iconId))

  return (
    <div
      { ...props }
      onClick={onClick}
      className={cn("w-full py-1 px-2 rounded-md", className)}
    >
      <div className="w-full flex gap-2 items-center">
        <img className="w-16 h-16" alt="summoner icon" src={i} />
        <p className="text-2xl font-beaufort">
          {player.name}
        </p>
      </div>
    </div>
  )
}

export default PlayerCard