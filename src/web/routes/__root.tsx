import type React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "../components/layout";
import SideNav from "../components/sidenav";

/** This is not needed but it's just one simple way to add margin to all pages for example */
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full overflow-y-scroll no-scrollbar">{children}</div>
);

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <div className="flex border-t border-border h-full w-full">
        <div className="px-3 gap-3 flex flex-col w-[10rem] border-r border-border">
          <SideNav />
        </div>
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </div>
      <TanStackRouterDevtools />
    </Layout>
  ),
});
