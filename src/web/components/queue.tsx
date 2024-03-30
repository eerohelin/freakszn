import type { Socket } from "socket.io-client";

interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket | null;
  state: Record<string, string[]>;
}

export function Queue({ socket, state, className, ...props }: QueueProps) {
  return (
    <div className={`${className} w-full flex`} {...props}>
      <div className="flex flex-col gap-2">
        {["top", "jungle", "mid", "adc", "support"].map((role: string, idx: number) => 
          <div className="flex items-center gap-2">
            <button className="rounded px-3 py-2 border bg-card border-indigo-300 w-20" type="button">{role}</button>
            <p>nimet</p>
          </div>
        )}
      </div>
     
    </div>
  );
}
