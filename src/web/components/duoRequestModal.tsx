import React, { useContext } from "react";
import { SocketProviderContext } from "./providers";
import { useSummonerIcon } from "../hooks/useSummonerIcon";
import { ButtonFszn } from "./buttons";
import { ROLES } from "../lib/constants";
import { cn } from "../lib/utils";
import { AnimatePresence, useIsPresent, motion } from "framer-motion";
import { UserCard } from "./userCard";

interface DuoRequestModalProps {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    player: any
  }

export const DuoRequestModal = ({ player, show, setShow }: DuoRequestModalProps) => {
    const { socket } = useContext(SocketProviderContext);
    const { i } = useSummonerIcon(Number(player?.iconId));
    const { i: placeholder } = useSummonerIcon(29);
    const [myRole, setMyRole] = React.useState<string>()
    const [hisRole, setHisRole] = React.useState<string>()
    const [showMyRolePicker, setShowMyRolePicker] = React.useState(false);
    const [showHisRolePicker, setShowHisRolePicker] = React.useState(false);
    const [showDuoInvitePendingPopup, setShowDuoInvitePendingPopup] = React.useState(false);
  
    function clearFields() {
      setMyRole(undefined)
      setHisRole(undefined)
      setShowMyRolePicker(false)
      setShowHisRolePicker(false)
    }
  
    return (
        <> { show &&
        <div className={cn(
            "fixed inset-0 w-full h-full flex flex-col items-center content-center",
            "justify-center bg-black backdrop-blur-sm bg-opacity-30 z-[1000]"
        )}>
        <div className="bg bg-gradient-to-tr from-gray-600 to-gray-500 p-[0.065rem] rounded-[0.3rem]">
            <div className="p-6 rounded-[0.15rem] bg-card">
                {/** PLAYER INFO */}
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col items-center content-center justify-center w-full">
                    <div className="flex items-center">
                        <div
                        className="bg-gradient-to-b from-league-border 

                        to-league-borderdarker p-[0.05rem]"
                        >
                        <img
                            className="w-24"
                            src={i.length > 1000 ? i : placeholder}
                            alt="avatar"
                        />
                        </div>
                    </div>
                    <h1 className="text-2xl mt-1">Ask {player.name} to duo</h1>
                    </div>
                </div>

                <div className="pb-4 flex flex-col gap-2">
                    <ButtonFszn
                    className={cn((showMyRolePicker || showHisRolePicker) && "hidden", "bg-white/20 border-white/30")}
                    onClick={() => {
                        setShowDuoInvitePendingPopup(true);
                        setShowHisRolePicker(false);
                        setShowMyRolePicker(true);
                    }}>
                    Your role ({myRole})
                    </ButtonFszn>
                    { showMyRolePicker &&
                    <>
                        <span>Your role</span>
                        <div className="flex items-center gap-2">
                        {ROLES.map((r: string) => 
                        <ButtonFszn
                            key={r}
                            onClick={() => {
                            setMyRole(r.toLowerCase())
                            setShowMyRolePicker(false);
                            }}
                            className={cn(
                            hisRole?.toLowerCase() === r.toLowerCase() && "pointer-events-none grayscale", "bg-white/20 border-white/30"
                        )}>
                            {r}
                        </ButtonFszn>)}
                        </div>
                    </>
                    }
                    
                    <ButtonFszn
                    className={cn((showMyRolePicker || showHisRolePicker) && "hidden", "bg-white/20 border-white/30")}
                    onClick={() => {
                        setShowMyRolePicker(false);
                        setShowHisRolePicker(true);
                    }}>
                    Your duos role ({hisRole})
                    </ButtonFszn>
                    { showHisRolePicker &&
                    <>
                        <span>Your duos role</span>
                        <div className="flex items-center gap-2">
                        {ROLES.map((r: string) => 
                        <ButtonFszn
                            key={r}
                            onClick={() => {
                            setHisRole(r.toLowerCase())
                            setShowHisRolePicker(false);
                            }}
                            className={cn(
                            myRole?.toLowerCase() === r.toLowerCase() && "pointer-events-none grayscale", "bg-white/20 border-white/30"
                        )}>
                            {r}
                        </ButtonFszn>)}
                        </div>
                    </>
                    }
                </div>

                {/** BUTTONS ROW */}
                <div className="flex items-center gap-2 mt-6">
                    <ButtonFszn
                    disabled={myRole === hisRole || myRole === undefined || hisRole === undefined}
                    className={cn(
                        "bg-white/20 border-white/30",
                        (myRole === hisRole || myRole === undefined || hisRole === undefined) && 
                        "pointer-events-none bg-black/30 text-white/20",
                    )}
                    onClick={() => {
                        socket?.emit("duo-queue", {
                        duoName: player.name,
                        duoTagline: player.tagline,
                        myRole: myRole,
                        duoRole: hisRole,
                        })
                        clearFields()
                        setShow(false)
                    }}>
                    Ask to duo
                    </ButtonFszn>
                    <ButtonFszn className="bg-white/20 border-white/30" onClick={() => {
                    clearFields()
                    setShow(false)
                    }}>
                    Close
                    </ButtonFszn>
                </div>
            </div>
            </div>
        </div>
        }
        </>
    )
}