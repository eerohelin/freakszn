import { io, type Socket } from "socket.io-client";
import { Button } from "./buttons";
import t from "@src/shared/config";
import { useState } from "react";

interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket | null;
  state: Record<string, string[]>;
}

export function Queue({ socket, state, className, ...props }: QueueProps) {

  const [lobbyId, setLobbyId] = useState<number>(0)

  const { data: id } = t.lol.joinLobby.useQuery({id: lobbyId?.toString()}, {enabled: lobbyId !== 0});
  const { refetch } = t.lol.createLobby.useQuery(undefined, {enabled: false});

  function handleQueue(role: string){
    socket?.emit("queue", role)
  }
  function handleDeQueue(){
    socket?.emit("dequeue")
  }
  function handleMockQue(){
    const s = io("ws://localhost:3000", { autoConnect: true, secure: false });
    s?.emit("set-name", `iirou.${crypto.randomUUID().substring(0,3)}`)
    s?.emit("queue", "fill")
  }
  function handleMockAcce(){
    socket?.emit("mock-accept-all")
  }

  function handleJoin() {
    socket?.emit("join-lobby")
  }

  function handleAutoJOin() {
    // TODO
  }

  socket?.on("join-lobby", (data) => {
    setLobbyId(data)
  })

  socket?.on("create-lobby", () => {
    refetch()
  })

  // @ts-ignore
  window.electronAPI.onSendLobbyId((value) => {
    socket?.emit("set-current-lobby-id", value)
  })

  return (
    <div className={`${className} w-full flex`} {...props}>
      <div className="flex flex-col gap-2">
        <Button onClick={() => handleMockQue()}>mockque</Button>
        <Button onClick={() => handleMockAcce()}>mockacce</Button>
        <Button onClick={() => handleDeQueue()}>Leave</Button>
        <Button onClick={() => handleJoin()}>join c:</Button>

        {/** Map Queue buttons and queue members */}
        {Object.keys((state.state)).map(
          (role: string, idx: number) => (
            <div key={role} className="flex items-center gap-2 w-[14rem]">
              <Button onClick={() => handleQueue(role)} className="text-xs">
                {role}
              </Button>
              <div className="w-full flex items-center gap-2">
                {state.state[role].map((name: string) => 
                  <div key={name}>{name}</div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
