import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SocketProviderContext } from "../components/providers";
import t from "@src/shared/config";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const { socket, state } = React.useContext(SocketProviderContext)
  console.log('state:', state)

  const utils = t.useUtils();
  const { mutate: storeSummoner } = t.lol.setSummoner.useMutation({
    onSuccess: () => { utils.lol.getSummoner.invalidate() }
  })
  const { mutate: deleteSummoners } = t.lol.deleteSummoners.useMutation({
    onSuccess: () => { utils.lol.getSummoner.invalidate() }
  })
  const { data: summoner } = t.lol.getSummoner.useQuery()

  return (
    <div className="container mx-auto w-full h-full flex flex-col gap-4">
      <button type="button" onClick={() => storeSummoner()}>
        test
      </button>
      <button type="button" onClick={() => deleteSummoners()}>
        delete all summoners
      </button>
        {JSON.stringify(summoner)}

      <div className="mt-20">
      </div>
    </div>
  );
}
