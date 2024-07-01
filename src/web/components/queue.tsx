import { io, type Socket } from "socket.io-client";
import { ButtonFszn } from "./buttons";
import QueueMemberCard from "./queueMemberCard";

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
    s?.emit("queue", ["top", "jungle", "mid", "adc", "support", "fill"][Math.floor(Math.random() * 6)]);
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
        <div className="flex gap-2 text-xs">
          <ButtonFszn className="" onClick={() => handleMockQue()}>mockque</ButtonFszn>
          <ButtonFszn onClick={() => handleMockAcce()}>mockacce</ButtonFszn>
          <ButtonFszn onClick={() => handleDeQueue()}>Leave</ButtonFszn>
          <ButtonFszn onClick={() => handleJoin()}>join c:</ButtonFszn>
        </div>

        {/** Map Queue buttons and queue members */}
        {Object.keys(state.state).map((role: string, idx: number) => (
          <div key={role} className="flex items-center w-full gap-2 h-9">
            <ButtonFszn
              onClick={() => handleQueue(role)}
              className="text-xl w-24 h-8"
            >
              {role}
            </ButtonFszn>
            <div className="flex items-center gap-3">
              {(state.state[role as any] as any).map((name: string) => (
                <QueueMemberCard
                  playerName={name}
                  key={name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
