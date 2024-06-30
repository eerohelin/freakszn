import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import { Queue } from "../components/queue";
import { Users } from "../components/users";
import QueuePop from "../components/queuePop";
import { useSummonerSplash } from "../hooks/useSummonerSplash";
import { motion, AnimatePresence } from "framer-motion"
import useTransitionDirection from "../hooks/usePreviousRoute";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state, queuePop, summoner } = React.useContext(SocketProviderContext);
  const { i } = useSummonerSplash(Number(summoner?.backgroundSkinId));
  const { transitionDirection } = useTransitionDirection()

  return (
    <AnimatePresence>
      <motion.div
        key={"page-index"}
        initial={{ opacity: 0, x: transitionDirection === "left" ? -2 : 2 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: transitionDirection === "left" ? 2 : -2 }}
        transition={{ ease: "easeInOut" }}
        className="w-full h-full absolute"
      >
        <div className="w-full h-full flex">
          <div className="w-[24rem] h-full border-r border-border">
            {/** User banner card + name */}
            <div className="relative saturate-[110%] aspect-video">
              <img
                className="absolute w-full h-full"
                alt="profile splash art"
                src={i}
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
      </motion.div>
    </AnimatePresence>
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
