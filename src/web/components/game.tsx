import React from "react";
import PlayerCard from "./playercard";
import { SocketProviderContext } from "./providers";
import { Button } from "./buttons";
import { cn } from "../lib/utils";

interface GameProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Game = ({ className, ...props }: GameProps) => {
  const { game, state, windowHeight, socket } = React.useContext(SocketProviderContext);
  const [ready, setReady] = React.useState<boolean>(game?.me?.ready)

  React.useEffect(() => {
    if(game !== undefined){
      setReady(game?.me?.ready)
    }
  }, [game])

  function getHowManyNeeded(){
    let howManyNeeded = 10;
    for (const role of Object.keys(state.state)) {
      const arr = state.state[role];
      howManyNeeded -= role !== "fill" ? Math.min(arr.length, 2) : arr.length;
    }
    return howManyNeeded;
  }
  function handleReady(){
    socket?.emit("set-ready", !ready)
  }
  function handleJoin() {
    socket?.emit("join-lobby");
  }

  if (game === undefined || Object.keys(game).length < 1) {
    return (
      <div className="flex flex-col flex-grow justify-center content-center h-full items-center">
        <p className="font-beaufort text-2xl text-center">
          You have no active game, <br /> go queue +{getHowManyNeeded()}
        </p>
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cn(className, "")}
      style={{ height: windowHeight }}
    >
      <div className="w-full flex flex-col content-center items-center justify-center gap-1 h-[4rem] text-lg px-2">
        <div className="bg-card w-full flex justify-center max-w-xl">
          {game?.statusMessages 
            ? game?.statusMessages?.map((message: string) => <p className="font-beaufort">{message}</p>)
            : <p className="font-beaufort">Waiting</p>
          }
        </div>
      </div>

      <div className="w-full flex justify-center" style={{ height: windowHeight - 150 }}>
        <div className="w-full max-w-5xl">
          <div className="flex w-full px-1">
            <div className="w-full flex justify-start text-cyan-500 font-semibold">Blue Team</div>
            <div className="w-full flex justify-end text-red-500 font-semibold">Red Team</div>
          </div>
          <div className="w-full flex gap-10">
            <div className="flex flex-col items-end gap-2 w-full">
              {Object.keys(game.blue).map((key) => (
                <PlayerCard
                  key={key}
                  side="blue"
                  className="max-w-md bg-neutral-800 border border-border shadow rounded-none"
                  player={game.blue[key]}
                />
              ))}
            </div>

            <div className="text-4xl flex flex-col gap-3 justify-center items-center">
              <div className="border-l block h-32" />
              <div className="font-beaufort">VS</div>
              <div className="border-l block h-32" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              {Object.keys(game.red).map((key) => (
                <PlayerCard
                  key={key}
                  side="red"
                  className="max-w-md bg-neutral-800 border border-border shadow rounded-none"
                  player={game.red[key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full flex gap-2 justify-center items-center h-[5rem]">
        <Button onClick={() => handleJoin()} className={cn("w-44", (game.me.availability === false || game.me.autoJoining === true) && 'grayscale pointer-events-none')} disabled={game.me.availability === false || game.me.autoJoining === true}>Join Lobby</Button>
        <Button onClick={() => handleReady()} className={cn("w-64", 
          (game.me.availability === false || game.me.autoJoining === true) && 'grayscale pointer-events-none',
          game.me.ready && 'bg-gradient-to-b from-green-500 to-green-900'
        )} disabled={game.me.availability === false || game.me.autoJoining === true}>Ready</Button>
        <Button className="w-44">Draft Link</Button>
      </div>
    </div>
  );
};

export default Game;
