import "./index.css";
import React from "react";
import t, { queryClient, trpcClient } from "@shared/config";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider, ThemeProvider } from "./components/providers";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";

/** Provider routing */
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/** Declare providers here. Can be moved to separate Providers.tsx later */
createRoot(document.getElementById("app") as Element).render(
  <React.StrictMode>
    <t.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">  
            <RouterProvider router={router} />
          </ThemeProvider>
        </SocketProvider>
      </QueryClientProvider>
    </t.Provider>
  </React.StrictMode>,
);
