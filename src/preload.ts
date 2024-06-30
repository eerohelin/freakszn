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
    offConnectionChange: (callback: any) =>
      ipcRenderer.removeAllListeners("connection-change"),
    didReceive: () => ipcRenderer.send("did-receive-connection-change"),
    onSendLobbyId: (callback: any) =>
      ipcRenderer.on("send-lobby-id", (_event, value) => callback(value)),
    onDidReceiveLobbyId: () => ipcRenderer.send("did-receive-lobby-id"),
    offSendLobbyId: (callback: any) =>
      ipcRenderer.removeAllListeners("send-lobby-id"),
    onUpdateInLobby: (callback: any) => ipcRenderer.on("update-in-lobby", (_event, value) => callback(value)),
    offUpdateInLobby: (callback: any) => ipcRenderer.removeAllListeners("update-in-lobby"),
    onCurrentLobbyName: (callback: any) => ipcRenderer.on("current-lobby-name", (_event, value) => callback(value)),
    offCurrentLobbyName: (callback: any) => ipcRenderer.removeAllListeners("current-lobby-name"),
    onLobbyDidNotExist: (callback: any) => ipcRenderer.on("lobby-did-not-exist", (_event, value) => callback(value)),
    offLobbyDidNotExist: (callback: any) =>
      ipcRenderer.removeAllListeners("lobby-did-not-exist"),
    createLobby: (value: any) => ipcRenderer.send("create-lobby", value),
    joinLobby: (value: any) => ipcRenderer.send("join-lobby", value),
    openLink: (value: any) => ipcRenderer.send("open-link", value),
  });
});
