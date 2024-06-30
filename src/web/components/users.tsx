import React from "react";
import { SocketProviderContext } from "./providers";
import { useSummonerIcon } from "../hooks/useSummonerIcon";

interface UsersProps {
  users: { name: string; iconId: number }[];
}

export function Users({ users }: UsersProps) {
  const { windowHeight } = React.useContext(SocketProviderContext);
  return (
    <div className="mt-1">
      <div className="font-beaufort-bold px-[0.9rem] text-lg -mb-1">Freaks</div>
      <div className="relative">
        <div className="absolute w-full bg-gradient-to-t from-transparent from-[65%] to-background z-20 top-0 h-4" />
        <div
          className="absolute overflow-y-scroll pb-28 px-2 w-full mt-1"
          style={{ height: windowHeight - 100 }}
        >
          {users.length > 0 && users?.map((u) => (
            <UserCard key={u.name} user={u} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface UserCard {
  user: { name: string; iconId: string | number };
}

function UserCard({ user }: UserCard) {
  const { i } = useSummonerIcon(Number(user.iconId));
  const { i: placeholder } = useSummonerIcon(29);

  return (
    <div className="flex gap-2 items-center px-[0.53rem] hover:bg-league-button py-2">
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
