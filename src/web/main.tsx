import "./index.css";
import React from "react";
import t, { queryClient, trpcClient } from "@shared/config";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/providers";
import { createRoot } from "react-dom/client";
import { type Socket, io } from "socket.io-client";
import { routeTree } from "./routeTree.gen";

/** Provider routing */
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/** Provide socket */
const SocketContext = React.createContext<Socket | undefined>(undefined);

/** Declare providers here. Can be moved to separate Providers.tsx later */
createRoot(document.getElementById("app") as Element).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SocketContext.Provider value={io("ws//localhost:3000")}>
        <t.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </t.Provider>
      </SocketContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
