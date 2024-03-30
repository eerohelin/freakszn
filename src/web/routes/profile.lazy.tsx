import t from "@src/shared/config";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile" as never)({
  component: Profile,
});

function Profile() {
  const utils = t.useUtils();
  const { data: s } = t.lol.getSummoner.useQuery();
  const { mutate: storeSummoner } = t.lol.setSummoner.useMutation({
    onSuccess: () => {
      utils.lol.getSummoner.invalidate();
    },
  });

  return (
    <div className="p-2">
      <p className="text-4xl">Summoner</p>
      <hr className="border-border my-2 w-full max-w-md" />
      <div>
        {s && (
          <p className="font-semibold text-3xl">
            {s.displayName}#{s.tagLine}
          </p>
        )}
      </div>
      <button
        className="px-3 py-2 mt-3 text-center bg-green-500 rounded-lg text-black"
        type="button"
        onClick={() => storeSummoner()}
      >
        Load Summoner
      </button>
    </div>
  );
}
