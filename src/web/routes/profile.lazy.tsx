import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile" as never)({
  component: Profile,
});

function Profile () {
  return (
    <div>Profile</div>
  )
}