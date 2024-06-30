import React, { useContext } from "react";
import { SocketProviderContext } from "./providers";
import { useSummonerIcon } from "../hooks/useSummonerIcon";
import { Button } from "./buttons";
import { ROLES } from "../lib/constants";
import { cn } from "../lib/utils";

interface UsersProps {
  users: { name: string; iconId: number }[];
}

export function Users({ users }: UsersProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalUser, setModalUser] = React.useState<any>();
  const { windowHeight } = React.useContext(SocketProviderContext);
  
  return (
    <>
      <div className="mt-1">
        <div className="font-beaufort-bold px-[0.9rem] text-lg -mb-1">Freaks</div>
        <div className="relative">
          <div className="absolute w-full bg-gradient-to-t from-transparent from-[65%] to-background z-20 top-0 h-4" />
          <div
            className="absolute overflow-y-scroll pb-28 px-2 w-full mt-1"
            style={{ height: windowHeight - 100 }}
          >
            {users.length > 0 && users?.map((u) => (
              <UserCard 
                key={u.name} user={u}
                onClick={() => {
                  setModalUser(u)
                  setShowModal(true)
                }}
              />
            ))}
          </div>
          <PlayerModal show={showModal} setShow={setShowModal} player={modalUser} />
        </div>
      </div>
    </>
  );
}

interface UserCard extends React.HTMLAttributes<HTMLDivElement> {
  user: { name: string; iconId: string | number };
}

function UserCard({ user, ...props }: UserCard) {
  const { i } = useSummonerIcon(Number(user.iconId));
  const { i: placeholder } = useSummonerIcon(29);

  return (
    <div {...props} className="flex gap-2 items-center px-[0.53rem] hover:bg-league-button py-2 cursor-pointer">
      <div className="flex items-center">
        <div
          className="bg-gradient-to-b from-league-border 

        to-league-borderdarker p-[0.125rem] rounded-full"
        >
          <img
            className="w-10 rounded-full"
            src={i.length > 1000 ? i : placeholder}
            alt="avatar"
          />
        </div>
      </div>
      <div>
        <p className="text-[#9f9a8b]">{user.name}</p>
        <div className="text-[#029f3f] text-sm -mt-[0.25rem]">Online</div>
      </div>
    </div>
  );
}

interface PlayerModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  player: any
}

const PlayerModal = ({ player, show, setShow }: PlayerModalProps) => {
  const { socket } = useContext(SocketProviderContext);
  const { i } = useSummonerIcon(Number(player?.iconId));
  const { i: placeholder } = useSummonerIcon(29);
  const [myRole, setMyRole] = React.useState<string>()
  const [hisRole, setHisRole] = React.useState<string>()
  const [showMyRolePicker, setShowMyRolePicker] = React.useState(false);
  const [showHisRolePicker, setShowHisRolePicker] = React.useState(false);

  function clearFields() {
    setMyRole(undefined)
    setHisRole(undefined)
    setShowMyRolePicker(false)
    setShowHisRolePicker(false)
  }

  return (
    <> { show &&
      <div className="fixed inset-0 w-full h-full flex flex-col items-center content-center justify-center bg-black backdrop-blur-sm bg-opacity-30 z-[1000]">
        <div className="w-full max-w-md bg-card p-6">


          {/** PLAYER INFO */}
          <div className="flex gap-2 items-center pb-4">
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
            <Button
              className={cn((showMyRolePicker || showHisRolePicker) && "hidden")}
              onClick={() => {
                setShowHisRolePicker(false);
                setShowMyRolePicker(true);
            }}>
              Your role ({myRole})
            </Button>
            { showMyRolePicker &&
              <>
                <span>Your role</span>
                <div className="flex items-center gap-2">
                  {ROLES.map((r: string) => 
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    key={r}
                    onClick={() => {
                      setMyRole(r.toLowerCase())
                      setShowMyRolePicker(false);
                    }}
                    className={cn(
                    hisRole === r && "pointer-events-none grayscale",
                    "bg-league-button text-league-text border border-league-border px-2 cursor-pointer w-full text-center"
                  )}>
                    {r}
                  </div>)}
                </div>
              </>
            }
            
            <Button
              className={cn((showMyRolePicker || showHisRolePicker) && "hidden")}
              onClick={() => {
                setShowMyRolePicker(false);
                setShowHisRolePicker(true);
            }}>
              Your duos role ({hisRole})
            </Button >
            { showHisRolePicker &&
              <>
                <span>Your duos role</span>
                <div className="flex items-center gap-2">
                  {ROLES.map((r: string) => 
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    key={r}
                    onClick={() => {
                      setHisRole(r.toLowerCase())
                      setShowHisRolePicker(false);
                    }}
                    className={cn(
                    myRole === r && "pointer-events-none grayscale",
                    "bg-league-button text-league-text border border-league-border px-2 cursor-pointer w-full text-center"
                  )}>
                    {r}
                  </div>)}
                </div>
              </>
            }
          </div>

          {/** BUTTONS ROW */}
          <div className="flex items-center gap-2 mt-6">
            <Button
              disabled={myRole === hisRole || myRole === undefined || hisRole === undefined}
              className={cn((myRole === hisRole || myRole === undefined || hisRole === undefined) && "pointer-events-none grayscale")}
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
            </Button>
            <Button onClick={() => {
              clearFields()
              setShow(false)
            }}>
              Close
            </Button>
          </div>
        </div>
      </div>
    }
    </>
  )
}