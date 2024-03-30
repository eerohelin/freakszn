import type { Socket } from "socket.io-client";
import { Button } from "./buttons";

interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket | null;
  state: Record<string, string[]>;
}

export function Queue({ socket, state, className, ...props }: QueueProps) {
  function handleQueue(role: string){
    socket?.emit("queue", role)
  }
  function handleDeQueue(){
    socket?.emit("dequeue")
  }

  return (
    <div className={`${className} w-full flex`} {...props}>
      <div className="flex flex-col gap-2">
        <Button onClick={() => handleDeQueue()}>Leave</Button>

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
