import Game from "../components/game";
import useTransitionDirection from "../hooks/usePreviousRoute";
import { createLazyFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createLazyFileRoute("/game" as never)({
  component: Component,
});

function Component() {
  const { transitionDirection } = useTransitionDirection();

  return (
    <AnimatePresence>
      <motion.div
        key={"page-game"}
        initial={{ opacity: 0, x: transitionDirection === "left" ? -2 : 2 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: transitionDirection === "left" ? 2 : -2 }}
        transition={{ ease: "easeInOut" }}
        className="w-full h-full absolute"
      >
        <Game />
      </motion.div>
    </AnimatePresence>
  );
}
