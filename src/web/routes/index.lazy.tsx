import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import { getProfileSplashUrl } from "../lib/utils";
import { Queue } from "../components/queue";
import { Users } from "../components/users";
import Game from "../components/game";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state, summoner } = React.useContext(SocketProviderContext);
  console.log('State:', state)

  return (
    <div className="w-full flex h-screen content-center text-text">
      {/** Top left parts (banner and users list) */}
      <div className="w-[14rem] border-r border-border">
        <div className="relative h-32 min-h-32 min-w-full saturate-[110%]">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-[65%] to-background z-20" />
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-[65%] to-background z-20" />
          <div className="absolute w-full flex flex-col items-center justify-center content-center h-full text-lg text-center z-20">
            <div className="font-beaufort-bold" style={{ textShadow: "2px 2px black" }}>{summoner?.displayName}</div>
            <div className="-mt-2" style={{ textShadow: "2px 2px black" }}>#{summoner?.tagLine}</div>
          </div>
          <img className="absolute" alt="profile splash art" src={getProfileSplashUrl(summoner?.backgroundSkinId)} />
        </div>

        <div>
          <Users users={[]} />
        </div>
      </div>

      {/** Queue */}
      <div className="flex-1 p-2">
        <Queue socket={socket} state={state} />
      </div>

      {/** Game */}
      <div>
        <Game game={state.game} />
      </div>
    </div>
  );
}

// Clash banner...
/**
  <div className="">
    <div className='relative'>
      <div className='bg-gradient-to-t from-transparent to-background absolute z-10 w-full'>&nbsp;</div>
      <img className='absolute' alt='banner' src={getProfileClashBannerUrl(summoner?.bannerTheme, summoner?.bannerLevel)} />
    </div>
  </div>
*/