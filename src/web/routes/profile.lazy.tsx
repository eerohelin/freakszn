import t from "@src/shared/config";
import { createLazyFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion"
import useTransitionDirection from "../hooks/usePreviousRoute";

export const Route = createLazyFileRoute("/profile" as never)({
  component: Profile,
});

function Profile() {
  const utils = t.useUtils();
  const { data: s } = t.lol.getSummoner.useQuery();
  const { transitionDirection } = useTransitionDirection()
  const { mutate: storeSummoner } = t.lol.setSummoner.useMutation({
    onSuccess: () => {
      utils.lol.getSummoner.invalidate();
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        key={"page-profile"}
        initial={{ opacity: 0, x: transitionDirection === "left" ? -2 : 2 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: transitionDirection === "left" ? 2 : -2 }}
        transition={{ ease: "easeInOut" }}
        className="w-full h-full absolute"
      >
        <div className="p-2">
          <p className="text-4xl">Summoner</p>
          <hr className="border-border my-2 w-full max-w-md" />
          <div>
            {s && (
              <p className="font-semibold text-3xl">
                {s.gameName}#{s.tagLine}
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
      </motion.div>
    </AnimatePresence >
  );
}
