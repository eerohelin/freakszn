// once this file is loaded , the electron-trpc ipcLink can
import { exposeElectronTRPC } from "electron-trpc/main";

// then be exposed
process.once("loaded", () => {
  exposeElectronTRPC();
});
