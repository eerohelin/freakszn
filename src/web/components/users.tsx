import t from "@src/shared/config";
import React from "react";
import { SocketProviderContext } from "./providers";
import { useSummonerIcon } from "../hooks/useSummonerIcon";

interface UsersProps {
  users: { name: string, iconId: number }[]
}

const mockUsers = [
  {
    name: "H0laa",
    profileIconId: 1,
  },
  {
    name: "User1",
    profileIconId: 2,
  },
  {
    name: "User2",
    profileIconId: 3,
  },
  {
    name: "User3",
    profileIconId: 4,
  },
  {
    name: "User4",
    profileIconId: 5,
  },
  {
    name: "User5",
    profileIconId: 6,
  },
  {
    name: "User6",
    profileIconId: 7,
  },
  {
    name: "User7",
    profileIconId: 8,
  },
  {
    name: "User8",
    profileIconId: 9,
  },
  {
    name: "User9",
    profileIconId: 10,
  },
];

export function Users({ users }: UsersProps) {
  const { windowHeight } = React.useContext(SocketProviderContext)
  return (
    <div>
      <div className="font-beaufort-bold px-1">Freaks</div>
      <div className="relative">
        <div className="absolute w-full bg-gradient-to-t from-transparent from-[65%] to-background z-20 top-0 h-4" />
        <div className="absolute overflow-y-scroll pb-28 w-full" style={{ height: windowHeight - 100 }}>
          {users.map((u) => 
            <UserCard key={u.name} user={u} />     
          )}
        </div>
      </div>
    </div>
  )
}

interface UserCard {
  user: { name: string, iconId: string | number }
}

function UserCard({ user }: UserCard) {
  const { i } = useSummonerIcon(Number(user.iconId))
  const { i: placeholder } = useSummonerIcon(29)

  return (
    <div className="flex gap-2 items-center border-b border-border py-1 px-2">
      <div className="flex items-center">
        <div className="bg-gradient-to-b from-league-border 
        to-league-borderdarker p-[0.125rem] rounded-full">
          <img className="w-10 rounded-full" src={i.length > 1000 ? i : placeholder} alt="avatar" />
        </div>
      </div>
      <div>
        <p className="text-[#9f9a8b]">{user.name}</p>
        <div className="text-[#029f3f] text-sm">Online</div>
      </div>
    </div> 
  )
}