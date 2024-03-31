import React from "react";
import { THEMES } from "../lib/constants";
import { io, type Socket } from "socket.io-client";
import type { Theme } from "../lib/types";
import t from "@src/shared/config";
import type { Summoner } from "@src/shared/db";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext =
  React.createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...THEMES);
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

interface SocketProviderProps {
  children: React.ReactNode;
}

type SocketProviderState = {
  socket: Socket | null;
  state: any;
  summoner: Summoner | undefined
};

export const SocketProviderContext = React.createContext<SocketProviderState>({
  socket: null,
  state: {},
  summoner: undefined,
});

const s = io("ws://localhost:3000", { autoConnect: true, secure: false });
export function SocketProvider({ children }: SocketProviderProps) {
  const { data: summoner } = t.lol.getSummoner.useQuery()
  const [socket, setSocket] = React.useState<Socket>(s);
  const [state, setState] = React.useState<any>();

  React.useEffect(() => {
    if(socket.connected){
      socket.emit("set-name", summoner?.displayName)
      socket.emit("set-icon-id", summoner?.profileIconId)
    }
  }, [socket.connected, socket.emit, summoner?.displayName])

  socket.on("state", (s: any) => {
    setState(s);
  });

  return (
    <SocketProviderContext.Provider value={{ socket, state, summoner }}>
      {children}
    </SocketProviderContext.Provider>
  );
}
