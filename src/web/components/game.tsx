import React from "react";
import StatusBar from "./statusBar";
import PlayerCard from "./playercard";
import { SocketProviderContext } from "./providers";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { cn, getMulti } from "../lib/utils";
import { Button } from "./buttons";

interface GameProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Game = ({ className, ...props }: GameProps) => {
  const { game, state, socket } = React.useContext(SocketProviderContext);
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
  function handleOpenDraft() {
    socket?.emit("open-draft");
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

  console.log('game:', game);

  return (
    <div
      {...props}
      className={cn(className, "h-full")}
    >
      <div className="w-full flex flex-col content-center items-center justify-center h-[4rem] px-2">
        <div className="w-full flex justify-center max-w-xl">
          <StatusBar statusMessages={game?.statusMessages} />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl">

          <div className="flex justify-between w-full px-1">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              // @ts-ignore
              onClick={() => window.electronAPI.openLink(getMulti(game.blue))}
              className="w-min truncate flex justify-start text-cyan-500 font-semibold items-center cursor-pointer hover:underline">
              Blue Team 
              <span className="text-xs font-beaufort font-light ml-1 flex items-center">
                multi <ArrowSquareOut size={12} />
              </span>
            </div>

            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              // @ts-ignore
              onClick={() => window.electronAPI.openLink(getMulti(game.red))}
              className="w-min truncate flex justify-end text-red-500 font-semibold items-center cursor-pointer hover:underline">
              <span className="text-xs font-beaufort font-light mr-1 flex items-center">
                multi <ArrowSquareOut size={12} />
              </span> 
              Red Team
            </div>
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
      
      <div className="w-full flex gap-2 justify-center items-center mt-6">
        {/* <Button onClick={() => handleJoin()} className={cn("w-44", (game.me.availability === false || game.me.autoJoining === true) && 'grayscale pointer-events-none')} disabled={game.me.availability === false || game.me.autoJoining === true}>
          Join Lobby
        </Button> */}
        <div className="w-64 flex flex-col gap-2">
          <Button onClick={() => handleReady()} className={cn("", 
            (game.me.availability === false || game.me.autoJoining === true) && 'grayscale pointer-events-none',
            game.me.ready && 'bg-gradient-to-b from-green-500 to-green-900'
          )} disabled={game.me.availability === false || game.me.autoJoining === true}>Ready</Button>
          <Button onClick={() => handleOpenDraft()}className="">Draft Link</Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
