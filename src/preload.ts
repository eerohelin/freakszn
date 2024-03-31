// once this file is loaded , the electron-trpc ipcLink can
import { contextBridge, ipcRenderer } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";

// then be exposed
process.once("loaded", () => {
  exposeElectronTRPC();
  // @ts-ignore
  contextBridge.exposeInMainWorld("electronAPI", {
    onConnectionChange: (callback: any) =>
      ipcRenderer.on("connection-change", (_event, value) => callback(value)),
    didReceive: () => ipcRenderer.send("did-receive-connection-change"),
    onSendLobbyId: (callback: any) => ipcRenderer.on("send-lobby-id", (_event, value) => callback(value))
  });
});
