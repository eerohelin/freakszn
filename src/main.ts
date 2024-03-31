import LCUConnector from "lcu-connector";
import { appRouter } from "@src/shared/routers/_app";
import { createContext } from "@src/shared/context";
import { createIPCHandler } from "electron-trpc/main";
import { BrowserWindow, app, ipcMain } from "electron";
import { LCUApi } from "./shared/lcuapi";
import { join } from "node:path";

// set the app name independent of package.json name
app.setName("freakszn");
let lcu: LCUApi | undefined;
let uiLoaded = false;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    frame: false, // Set to true if you want to use the default frame
    width: 1280,
    height: 720,
    webPreferences: {
      devTools: true,
      sandbox: false,
      preload: join(__dirname, "../preload/preload.js"),
    },
  });

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.show;
  });

  if (import.meta.env.DEV) {
    mainWindow.loadURL("http://localhost:5173/");
  } else {
    const path = `file://${app.getAppPath()}/dist/renderer/index.html#/`;
    mainWindow.loadURL(path);
  }

  /** Devtools */
  mainWindow.webContents.openDevTools({ mode: "detach" });
  return mainWindow;
};

app.whenReady().then(() => {
  const mainWindow = createWindow();

  // create and attach the ipc handler
  // appRouter is defined in src/shared/routers/_app.ts
  // this is the root and all routers will be attached
  // to that
  createIPCHandler({
    router: appRouter,
    windows: [mainWindow],
    createContext,
  });

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const connector = new LCUConnector();

  connector.on("connect", async ({ address, password, port }) => {
    lcu = new LCUApi(address, port, password, mainWindow);

    mainWindow.webContents.on("did-finish-load", () => {
      uiLoaded = true;
    });

    const loadedCheck = setInterval(async (): Promise<any> => {
      if (lcu && (await lcu.isLoaded())) {
        loaded(mainWindow);
        lcu.startListener();
        clearInterval(loadedCheck);
        return;
      }
    }, 1000);
  });

  connector.on("disconnect", async () => {
    mainWindow.webContents.send("connection-change", false);
    lcu?.stopListener();
    lcu = undefined;
  });

  connector.start();
});

function loaded(mainWindow: BrowserWindow) {
  let didReceive = false;

  ipcMain.on("did-receive-connection-change", () => {
    didReceive = true;
  });

  const connectionDelay = setInterval(() => {
    if (uiLoaded) {
      mainWindow.webContents.send("connection-change", true);
    }
    if (didReceive) {
      clearInterval(connectionDelay);
    }
  }, 1000);
}

app.once("window-all-closed", () => app.quit());

export function getLCU() {
  return lcu;
}
