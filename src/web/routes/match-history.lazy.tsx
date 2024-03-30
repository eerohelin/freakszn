import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/" as never)({
  component: Component,
});

function Component(){
  <div>Match history</div>
}