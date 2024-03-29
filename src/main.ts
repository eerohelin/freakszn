import { join } from "node:path";
import { appRouter } from "@src/shared/routers/_app";
import { createContext } from "@src/shared/context";
import { createIPCHandler } from "electron-trpc/main";
import { BrowserWindow, app } from "electron";
import LCUConnector from "lcu-connector";
import { LCUApi } from "./shared/lcuapi";

// set the app name independent of package.json name
app.setName("freakszn");

let lcu: LCUApi | undefined

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

  // create and attach the ipc handler
  // appRouter is defined in src/shared/routers/_app.ts
  // this is the root and all routers will be attached
  // to that
  createIPCHandler({
    router: appRouter,
    windows: [mainWindow],
    createContext,
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
  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const connector = new LCUConnector();

  connector.on("connect", async ({ address, password, port }) => {
    lcu = new LCUApi(address, port, password)
  }); 

  connector.start();
});

app.once("window-all-closed", () => app.quit());

export function getLCU(){
  return lcu
}