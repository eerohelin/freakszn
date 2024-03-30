import type { Socket } from "socket.io-client";
import { Button } from "./buttons";

interface QueueProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket | null;
  state: Record<string, string[]>;
}

export function Queue({ socket, state, className, ...props }: QueueProps) {
  return (
    <div className={`${className} w-full flex`} {...props}>
      <div className="flex flex-col gap-2">
        {["top", "jungle", "mid", "adc", "support"].map(
          (role: string, idx: number) => (
            <div key={role} className="flex items-center gap-2">
              <Button className="text-xs">{role}</Button>
              <p>nimet</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
