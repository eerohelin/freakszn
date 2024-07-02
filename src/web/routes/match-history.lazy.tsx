import { createLazyFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import useTransitionDirection from "../hooks/usePreviousRoute";

export const Route = createLazyFileRoute("/" as never)({
  component: Component,
});

function Component() {
  const { transitionDirection } = useTransitionDirection();

  return (
    <AnimatePresence>
      <motion.div
        key={"page-index"}
        initial={{ opacity: 0, x: transitionDirection === "left" ? -2 : 2 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: transitionDirection === "left" ? 2 : -2 }}
        transition={{ ease: "easeInOut" }}
        className="w-full h-full absolute"
      >
        <div>Match History :)</div>
      </motion.div>
    </AnimatePresence>
  );
}
