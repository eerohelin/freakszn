import React from "react";
import { useLocation } from "@tanstack/react-router";
import { getPageTransitionDirection } from "../lib/utils";

const useTransitionDirection = () => {
  const { pathname, href } = useLocation();
  const params = new URLSearchParams(href.split("?")[1]);
  const previousRoute = params.get("previousRoute") || undefined;
  const transitionDirection = getPageTransitionDirection(
    previousRoute,
    pathname,
  );
  return { transitionDirection };
};

export default useTransitionDirection;
