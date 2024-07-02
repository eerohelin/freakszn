import React from "react";
import { SocketProviderContext } from "./providers";
import { DuoRequestModal } from "./duoRequestModal";
import { UserCard } from "./userCard";

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
        <div className="font-beaufort-bold px-[0.9rem] text-lg -mb-1 mx-[0.15rem]">
          Freaks
        </div>
        <div className="relative">
          <div className="absolute w-full bg-gradient-to-t from-transparent from-[65%] to-background z-20 top-0 h-4" />
          <div
            className="absolute overflow-y-scroll pb-64 px-[1rem] w-full mt-1"
            style={{ height: windowHeight - 100 }}
          >
            {users.length > 0 &&
              users?.map((u) => (
                <UserCard
                  key={u.name}
                  user={u}
                  onClick={() => {
                    setModalUser(u);
                    setShowModal(true);
                  }}
                />
              ))}
          </div>
          <DuoRequestModal
            setShow={setShowModal}
            player={modalUser}
            show={showModal}
          />
        </div>
      </div>
    </>
  );
}
