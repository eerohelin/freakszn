import { createLazyFileRoute } from "@tanstack/react-router";
import Game from "../components/game";

export const Route = createLazyFileRoute("/game" as never)({
  component: Component,
});

function Component() {
  return <Game />;
}
