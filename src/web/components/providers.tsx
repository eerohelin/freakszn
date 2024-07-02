import React from "react";
import t from "@src/shared/config";
import { THEMES } from "../lib/constants";
import { io, type Socket } from "socket.io-client";
import type { Summoner } from "@src/shared/db";
import type { Theme } from "../lib/types";

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
  summoner: Summoner | undefined;
  game: any;
  queuePop: any;
  windowHeight: number;
};

export const SocketProviderContext = React.createContext<SocketProviderState>({
  socket: null,
  state: {},
  summoner: undefined,
  game: {},
  queuePop: {},
  windowHeight: window.innerHeight - 40,
});

const s = io("ws://localhost:3000", { autoConnect: true, secure: false });

export function SocketProvider({ children }: SocketProviderProps) {
  const { data: summoner } = t.lol.getSummoner.useQuery();
  const [windowHeight, setWindowHeight] = React.useState<number>(
    window.innerHeight - 40,
  );
  const [socket, setSocket] = React.useState<Socket>(s);
  const [state, setState] = React.useState<any>();
  const [game, setGame] = React.useState({});
  const [queuePop, SetQueuePop] = React.useState();

  React.useEffect(() => {
    if (socket.connected) {
      socket.emit("set-name", summoner?.gameName);
      socket.emit("set-tagline", summoner?.tagLine);
      socket.emit("set-icon-id", summoner?.profileIconId);
      socket.emit("set-summoner-level", summoner?.summonerLevel);
      socket.emit("set-summoner-rank", {
        rank: summoner?.rank,
        division: summoner?.division,
        lp: summoner?.lp,
      });
    }
  }, [
    socket.connected,
    socket.emit,
    summoner?.gameName,
    summoner?.profileIconId,
    summoner?.division,
    summoner?.lp,
    summoner?.rank,
    summoner?.summonerLevel,
    summoner?.tagLine,
  ]);

  React.useEffect(() => {
    addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
    window.electronAPI.offSendLobbyId();
    window.electronAPI.offLobbyDidNotExist();
    window.electronAPI.offCurrentLobbyName();
    window.electronAPI.offUpdateInLobby();
    window.electronAPI.offEndOfGame();

    window.electronAPI.onSendLobbyId((value: any) => {
      socket?.emit("set-current-lobby-id", value);
      window.electronAPI.onDidReceiveLobbyId();
    });

    window.electronAPI.onUpdateInLobby((value: any) => {
      socket.emit("update-in-lobby", value);
    });

    window.electronAPI.onEndOfGame((value: any) => {
      socket.emit("end-of-game", value);
    });

    window.electronAPI.onCurrentLobbyName((value: any) => {
      socket.emit("current-lobby-name", value);
    });

    window.electronAPI.onLobbyDidNotExist((value: any) => {
      socket.emit("lobby-did-not-exist");
    });
  }, [socket?.emit]);

  socket.on("state", (s) => {
    setState(s);
  });
  socket.on("queue-pop", (qp) => {
    SetQueuePop(qp);
  });
  socket.on("game-start", (game) => setGame(game));
  socket.on("game-update", (game) => setGame(game));
  socket.on("open-draft", (draft) => {
    window.electronAPI.openLink(draft);
  });
  socket.off("open-draft");

  return (
    <SocketProviderContext.Provider
      value={{ socket, state, queuePop, summoner, game, windowHeight }}
    >
      {children}
    </SocketProviderContext.Provider>
  );
}
