import React from "react"
import PlayerCard from "./playercard"
import { SocketProviderContext } from "./providers"
import { Button } from "./buttons"
import { cn } from "../lib/utils"

interface GameProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const Game = ({ className, ...props }: GameProps) => {
  const { game, windowHeight } = React.useContext(SocketProviderContext)
  console.log('game:', game)

  return (
    <div style={{ height: windowHeight }} className={cn(className, "flex flex-col flex-grow")} {...props}>
      <div className="w-full border-b border-border flex gap-1 h-[2rem] text-lg px-2">
        <span className="font-beaufort-bold">Custom</span>
        <span className="font-beaufort-bold">Summoner's Rift 5v5</span>
      </div>
      <div className="w-full h-full flex justify-center items-center content-center">

            <div className="flex flex-col items-end gap-2 w-full">
              <p className="font-beaufort-bold text-2xl text-blue-500">Blue Team</p>
              {Object.keys(game.blue).map((key) => 
                <PlayerCard className="max-w-md bg-neutral-800 border border-border shadow rounded-none" player={game.blue[key]} />
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="font-beaufort-bold text-2xl text-red-500">Red Team</p>
              {Object.keys(game.red).map((key) => 
                <PlayerCard className="max-w-md bg-neutral-800 border border-border shadow rounded-none" player={game.red[key]} />
              )}
            </div>

      </div>
      <div className="w-full border-t border-border flex gap-2 justify-center items-center h-[5rem]">
        <Button>Join Lobby</Button>
        <Button>Draft Link</Button>
      </div>
    </div>
  )
}

export default Game