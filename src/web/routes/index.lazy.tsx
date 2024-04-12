import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import { getProfileSplashUrl } from "../lib/utils";
import { Queue } from "../components/queue";
import { Users } from "../components/users";
import QueuePop from "../components/queuePop";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state, queuePop, summoner } = React.useContext(SocketProviderContext);
  return (
    <div className="w-full h-full absolute">
      <div className="w-full h-full flex">
        <div className="w-[17rem] h-full border-r border-border">
          {/** User banner card + name */}
          <div className="relative saturate-[110%] aspect-video">
            <img
              className="absolute w-full h-full"
              alt="profile splash art"
              src={getProfileSplashUrl(summoner?.backgroundSkinId)}
            />
            <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-[65%] to-background z-20" />
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-[65%] to-background z-20" />
            <div
              className="absolute w-full h-full flex flex-col items-center justify-center"
              style={{ textShadow: "2px 2px black" }}
            >
              <p>{summoner?.gameName}</p>
              <p className="-mt-2">#{summoner?.tagLine}</p>
            </div>
          </div>

          <Users users={state.onlinePlayers} />
        </div>

        <Queue className="p-4" socket={socket} state={state} />
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
