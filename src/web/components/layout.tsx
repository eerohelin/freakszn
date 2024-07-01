import React, { useContext, useState } from "react";
import type { Theme } from "../lib/types";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { SocketProviderContext, useTheme } from "./providers";
import { Minus, Square, X } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { DUO_INVITE_TITLES, THEMES } from "../lib/constants";
import { ButtonFszn } from "./buttons";
import { UserCard } from "./userCard";
import QueuePop from "./queuePop";
import SideNav from "./sidenav";
import t from "@shared/config";
import LoadingDots from "./loadingDots";

type LayoutProps = {
  children?: React.ReactNode;
};

const CustomTopBar = () => {
  const { theme, setTheme } = useTheme();
  const { data: appVer } = t.version.useQuery();
  const { data: lcuExists } = t.lol.isClientOpen.useQuery();
  const { mutate: minimizeWindow } = t.window.minimize.useMutation();
  const { mutate: maximizeWindow } = t.window.maximize.useMutation();
  const { mutate: closeWindow } = t.window.closeWindow.useMutation();
  const { socket } = React.useContext(SocketProviderContext);
  const [isConnected, setIsConnected] = useState(lcuExists);

  React.useEffect(() => {
    socket?.off("create-lobby")
    socket?.off("join-lobby")
    socket?.on("join-lobby", (data): any => { window.electronAPI.joinLobby(data);});
    socket?.on("create-lobby", (data) => { window.electronAPI.createLobby(data);});
    window.electronAPI.offConnectionChange();
    window.electronAPI.onConnectionChange((value: any) => {
      window.electronAPI.didReceive();
      setIsConnected(value);
      socket?.emit("set-client-open", value)
      console.log("connected");
    });
  }, [socket?.emit, socket?.off, socket?.on]);

  return (
    <div className="flex w-full min-h-10 h-10 items-center border-b border-border">
      <div id="drag-region" className="flex items-center px-3 w-full">
        <span className="font-bold">
          😈Freakszn <span className="font-extralight text-sm">{appVer}</span>
        </span>

        <div className="flex gap-1 items-center ml-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          >
            &nbsp;
          </div>
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="flex mr-2">
        <div className="flex items-center bg-card rounded-md pl-2 hover:bg-bgHover px-1 mr-2">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <title>theme</title>
            <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z" />
          </svg>
          <select
            defaultValue={theme}
            className="bg-transparent outline-none flex items-center gap-[.1rem] px-2 py-1 truncate"
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            {THEMES.map((t: Theme) => (
              <option className="bg-card" key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="px-2 py-1 rounded-md hover:bg-bgHover"
          onClick={() => minimizeWindow()}
        >
          <Minus />
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded-md hover:bg-bgHover"
          onClick={() => maximizeWindow()}
        >
          <Square />
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded-md hover:bg-bgHover hover:outline-rose-600 hover:outline hover:outline-1"
          onClick={() => closeWindow()}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

interface DuoRequest {
  requesterRole: string,
  yourRole: string,
  requester: {
    name: string,
    iconId: number,
    summonerLevel: number,
    tagline: string,
    rankData: {
      division: string,
      lp: number,
      rank: string
    }
  }
}

interface PendingDuoRequest {
  duoPlayer: {
    iconId: number,
    name: string,
    rankData: { rank: string, division: string, lp: number },
    summonerLevel: number,
    tagline: string
  },
  duoRole: string,
  myRole: string,
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { socket } = React.useContext(SocketProviderContext);
  const [pendingDuoRequest, setPendingDuoRequest] = React.useState<PendingDuoRequest>()
  const [showPendingDuoRequest, setShowPendingDuoRequest] = React.useState<boolean>(false)
  const [showDuoInvite, setShowDuoInvite] = React.useState<boolean>(false);
  const [duoRequest, setDuoRequest] = React.useState<DuoRequest>({
    requester: {
        iconId: 5021,
        name: "Kalevan Canyon",
        rankData: {
            division: "I",
            lp: 26,
            rank: "DIAMOND"
        },
        summonerLevel: 83,
        tagline: "EUW"
    },
    requesterRole: "top",
    yourRole: "jungle"
  })

  socket?.on("duo-request", (duoRequest: DuoRequest) => {
    setDuoRequest(duoRequest)
    setShowDuoInvite(true)
  })
  socket?.on("duo-request-sent", (pendingDuoRequest: PendingDuoRequest) => {
    setPendingDuoRequest(pendingDuoRequest)
    setShowPendingDuoRequest(true)
  })
  socket?.on("game-start", (game) => {
    router.navigate({
      to: "/game",
    }); 
  });

  React.useEffect(() => {
    /** Navigate to default route on first launch (production) 
    TODO: Find a better solution than this... */
    if (
      router.state.location.pathname.toString().includes("renderer/index.html")
    ) {
      router.navigate({ to: "/" });
    }
  }, [router.navigate, router.state.location.pathname]);

  return (
    <>
      <CustomTopBar />
      {/* <QueuePop /> */}
      <div className="w-full">
        <ButtonFszn
            className="fixed ml-[40rem] mt-1"
            onClick={() => setShowDuoInvite(!showDuoInvite)}>
            showDuoInvite
        </ButtonFszn>
        <SideNav />
        <DuoInvitePopup showDuoInvite={showDuoInvite} setShowDuoInvite={setShowDuoInvite} duoRequest={duoRequest} />
        <PendingDuoRequestPopup pendingDuoRequest={pendingDuoRequest} showPendingDuoRequest={showPendingDuoRequest} setShowPendingDuoRequest={setShowPendingDuoRequest} />
        {children}
      </div>
    </>
  );
}

interface DuoInviteModalProps {
  duoRequest: DuoRequest 
  showDuoInvite: boolean
  setShowDuoInvite: React.Dispatch<React.SetStateAction<boolean>>
}

const PendingDuoRequestPopup = ({ pendingDuoRequest, showPendingDuoRequest, setShowPendingDuoRequest }: { pendingDuoRequest?: PendingDuoRequest, showPendingDuoRequest: boolean, setShowPendingDuoRequest: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <AnimatePresence>
      {showPendingDuoRequest && pendingDuoRequest && <PendingDuoRequestPopupMotionDiv pendingDuoRequest={pendingDuoRequest} setShowPendingDuoRequest={setShowPendingDuoRequest} />}
    </AnimatePresence>
  )
}

function PendingDuoRequestPopupMotionDiv (props: { pendingDuoRequest: PendingDuoRequest, setShowPendingDuoRequest: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { pendingDuoRequest, setShowPendingDuoRequest } = props;
  const { socket } = useContext(SocketProviderContext)
  const isPresent = useIsPresent();

  return (
    <motion.div
      style={{ position: isPresent ? "absolute" : "absolute" }}
      key={"duo-request-card"}
      initial={{ opacity: 0, bottom: -12 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -12 }}
      transition={{ ease: "easeInOut" }}
      className="flex items-center right-0 bg-gradient-to-tr from-gray-600 to-gray-500 p-[0.055rem] m-3 rounded-[0.3rem] z-50 w-full max-w-xs"
    >
      <div className="w-full h-full bg-card p-5 rounded-[0.15rem]">
        <div className="h-full w-full">
          <p className="text-2xl font-beaufort flex items-center">Duo request pending <LoadingDots className="mt-1 ml-1" /></p>
          <UserCard
            className="pointer-events-none"
            roundedIcon={false}
            user={pendingDuoRequest.duoPlayer}
            iconStyles={"from-purple-400 to-purple-500 p-[0.06rem]"}
            statusStyles={"text-purple-400"}
          />
        </div>

        <div className="h-full w-full text-sm">
          <div className="">
            Your role: <span>{pendingDuoRequest.myRole}</span>
          </div>  
          <div>
            {pendingDuoRequest.duoPlayer.name}'s role: <span>{pendingDuoRequest.duoRole}</span>
          </div>
        </div>
        <div className="flex items-center gap-[0.4rem] mt-4">
          <ButtonFszn
            onClick={() => {
              socket?.emit("duo-cancel")
              setShowPendingDuoRequest(false)
            }}
            className="border-red-500 text-red-500 bg-black/20 w-full">
            Cancel request
          </ButtonFszn>
        </div>  
      </div>
    </motion.div>
  )
}

const DuoInvitePopup = ({ showDuoInvite, setShowDuoInvite, duoRequest }: DuoInviteModalProps) => {
  const title = DUO_INVITE_TITLES[Math.floor(Math.random() * DUO_INVITE_TITLES.length)]
  return (
    <AnimatePresence> 
      { showDuoInvite && <DuoInvitePopupMotionDiv duoRequest={duoRequest} setShowDuoInvite={setShowDuoInvite} title={title} />}
    </AnimatePresence>
  )
}

function DuoInvitePopupMotionDiv (props: { duoRequest: DuoRequest, setShowDuoInvite: React.Dispatch<React.SetStateAction<boolean>>, title: string }) {
  const { duoRequest, setShowDuoInvite, title } = props;
  const { socket } = useContext(SocketProviderContext)
  const isPresent = useIsPresent();

  return (
    <motion.div
      style={{ position: isPresent ? "absolute" : "absolute" }}
      key={"duo-request-card"}
      initial={{ opacity: 0, bottom: -12 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -12 }}
      transition={{ ease: "easeInOut" }}
      className="flex items-center right-0 bg-gradient-to-tr from-gray-600 to-gray-500 p-[0.055rem] m-3 rounded-[0.3rem] z-50 w-full max-w-xs"
    >
      <div className="w-full h-full bg-card p-5 rounded-[0.15rem]">
        <div className="h-full w-full">
          <p className="text-2xl font-beaufort">Duo invite from</p>
          <UserCard
            className="pointer-events-none"
            roundedIcon={false}
            status={title}
            user={duoRequest.requester}
            iconStyles={"from-purple-400 to-purple-500 p-[0.06rem]"}
            statusStyles={"text-purple-400"}
          />
        </div>

        <div className="h-full w-full text-sm">
          <div className="">
            Your role: <span>{duoRequest.yourRole}</span>
          </div>  
          <div>
            {duoRequest.requester.name}'s role: <span>{duoRequest.requesterRole}</span>
          </div>
        </div>
        <div className="flex items-center gap-[0.4rem] mt-4">
          <ButtonFszn
            onClick={() => {
              socket?.emit("duo-accept")
              setShowDuoInvite(false)
            }}
            className="border-green-500 text-green-500 bg-black/20 w-full">
            Accept
          </ButtonFszn>
          <ButtonFszn
            onClick={() => {
              socket?.emit("duo-decline")
              setShowDuoInvite(false)
            }}
            className="border-red-500 text-red-500 bg-black/20 w-full">
            Reject
          </ButtonFszn>
        </div>  
      </div>
    </motion.div>
  )
}