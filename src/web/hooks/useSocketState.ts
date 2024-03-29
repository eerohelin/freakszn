import React from "react";
import { io, type Socket } from "socket.io-client";

const socket = io("ws://localhost:3000");

function getSocket() {
  return socket;
}

export function useSocketState() {
  const [socket, setSocket] = React.useState<Socket>(getSocket);
}
