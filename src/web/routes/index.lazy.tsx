import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import { Queue } from "../components/queue";
import { Users } from "../components/users";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state } = React.useContext(SocketProviderContext);

  return (
    <div className="container w-full h-full flex flex-col content-center">
      <div className="flex h-screen">
        <div className="w-1/5">
          <div className="h-32 w-full bg-black p-1">banner</div>
          <div className="p-1">
            <Users />
          </div>
        </div>
        <div className="flex-1 p-2">
          <Queue socket={socket} state={state} />
        </div>
      </div>
    </div>
  );
}
