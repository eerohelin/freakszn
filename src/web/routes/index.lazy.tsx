import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import { Queue } from "../components/queue";
import { Users } from "../components/users";
import { getProfileSplashUrl } from "../lib/utils";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state, summoner } = React.useContext(SocketProviderContext);
  console.log('State:', state)

  return (
    <div className="container w-full h-full flex flex-col content-center text-text">
      <div className="flex h-screen">
        <div className="w-1/5">
          <div className="h-32 w-full bg-black relative saturate-[110%]">
           <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-[65%] to-background z-20" />
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-[65%] to-background z-20" />
            <div className="absolute flex w-full content-center items-center h-full justify-center z-30">
              <div className="text-lg">
                <div className="font-beaufort-bold ">{summoner?.displayName}</div>
                <div className="-mt-2">#{summoner?.tagLine}</div>
              </div>
            </div>
            <img className="absolute" alt="profile splash art" src={getProfileSplashUrl(summoner?.backgroundSkinId)} />
          </div>
          <div className="p-1">
            <Users />
          </div>
        </div>
        <div className="flex-1 p-2">
          <Queue socket={socket} state={state} />
        </div>
      </div>
    </div>
  );
}
