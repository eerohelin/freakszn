import React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { SocketProviderContext } from "../components/providers";
import Layout from "../components/layout";

/** This is not needed but it's just one simple way to add margin to all pages for example */
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { windowHeight } = React.useContext(SocketProviderContext)
  return (
    <div
      className="overflow-hidden relative w-full" 
      style={{ height: windowHeight }}
    >
      {children}
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
      <TanStackRouterDevtools />
    </Layout>
  ),
});

