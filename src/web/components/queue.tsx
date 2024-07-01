import { io, type Socket } from "socket.io-client";
import { Button, Button2 } from "./buttons";

interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket | null;
  state: Record<string, string[]>;
}

export function Queue({ socket, state, className, ...props }: QueueProps) {

  function handleQueue(role: string) {
    socket?.emit("queue", role);
  }
  function handleDeQueue() {
    socket?.emit("dequeue");
  }
  function handleMockQue() {
    const s = io("ws://localhost:3000", { autoConnect: true, secure: false });
    s?.emit("set-name", `iirou.${crypto.randomUUID().substring(0, 3)}`);
    s?.emit("set-tagline", "1234")
    s?.emit(
      "set-icon-id",
      Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
    );
    s?.emit("set-summoner-level", 300)
    s?.emit("set-summoner-rank", {rank: "Diamond", division: "1", lp: 80})
    s?.emit("queue", "fill");
    s?.on("duo-request", (data) => {
      console.log('dataaa :D', data)
      s?.emit("duo-accept")
    })
  }
  function handleMockAcce() {
    socket?.emit("mock-accept-all");
  }

  function handleJoin() {
    socket?.emit("join-lobby");
  }

  return (
    <div className={`${className} w-full flex`} {...props}>
      <div className="flex flex-col gap-2">
        <Button2 onClick={() => handleMockQue()}>mockque</Button2>
        <Button2 onClick={() => handleMockAcce()}>mockacce</Button2>
        <Button2 onClick={() => handleDeQueue()}>Leave</Button2>
        <Button2 onClick={() => handleJoin()}>join c:</Button2>

        {/** Map Queue buttons and queue members */}
        {Object.keys(state.state).map((role: string, idx: number) => (
          <div key={role} className="flex items-center gap-2 w-[14rem]">
            <Button2 onClick={() => handleQueue(role)} className="text-xs">
              {role}
            </Button2>
            <div className="w-full flex items-center gap-2">
              {(state.state[role as any] as any).map((name: string) => (
                <div key={name}>{name}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
