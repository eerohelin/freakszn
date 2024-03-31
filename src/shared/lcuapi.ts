import { WebSocket } from "ws";
import type { DraftMode, LobbyPosition } from "./types";
import { BrowserWindow } from "electron";

export class LCUApi {
  private address: string | undefined = undefined;
  private port: number | undefined = undefined;
  private password: string | undefined = undefined;
  private url = () => `https://${this.address}:${this.port}`;
  private mainWindow: BrowserWindow

  constructor(address: string, port: number, password: string, mainWindow: BrowserWindow) {
    this.address = address;
    this.port = port;
    this.password = password;
    this.mainWindow = mainWindow
  }

  public getSummonerId = async (summonerName: string, tagLine: string) => {
    const summonerInfo = await fetch(
      `${this.url()}/lol-summoner/v1/alias/lookup?gameName=${summonerName}&tagLine=${tagLine}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );
    const info = await summonerInfo.json();
    if (info.puuid) {
      const request1 = await fetch(
        `${this.url()}/lol-summoner/v2/summoners/puuid/${info.puuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Basic ${Buffer.from(
              `riot:${this.password}`,
            ).toString("base64")}`,
          },
        },
      );
      const summonerData = await request1.json();
      if (summonerData.summonerId) {
        return summonerData.summonerId;
      }
    }
    return 0;
  };

  public async switchTeam(team: LobbyPosition) {
    const request = await fetch(
      `${this.url()}/lol-lobby/v1/lobby/custom/switch-teams?team=${team}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );
  }

  public async invitePlayers(summonerIds: number[]) {
    const request = await fetch(
      `${this.url()}/lol-lobby/v2/lobby/invitations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
        body: JSON.stringify(
          summonerIds.map((s: number) => {
            return { toSummonerId: s };
          }),
        ),
      },
    );
  }

  public async createLobby(
    lobbyName: string,
    lobbyPass: string,
    draftMode: DraftMode,
  ) {
    const request = await fetch(`${this.url()}/lol-lobby/v2/lobby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
          "base64",
        )}`,
      },
      body: JSON.stringify({
        isCustom: true,
        customGameLobby: {
          lobbyName: lobbyName,
          lobbyPassword: lobbyPass,
          configuration: {
            mapId: 11,
            gameMode: "CLASSIC",
            mutators: {
              id: draftMode,
            },
            spectatorPolicy: "AllAllowed",
            teamSize: 5,
          },
        },
      }),
    });
  }

  public async joinLobby(lobbyID: number, lobbyPass: string) {
    const request = await fetch(
      `${this.url()}/lol-lobby/v1/custom-games/${lobbyID}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
        body: JSON.stringify({
          password: lobbyPass,
        }),
      },
    );
  }

  public async getPostScreenStats() {
    const request = await fetch(
      `${this.url()}/lol-end-of-game/v1/eog-stats-block`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );

    return request.json();
  }

  public async getSummonerIcon(id: string | number) {
    const response = await fetch(
      `${this.url()}/lol-game-data/assets/v1/profile-icons/${id}.jpg`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    return buffer
  }

  public async getCurrentSummoner() {
    const request = await fetch(
      `${this.url()}/lol-summoner/v1/current-summoner`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );

    const request2 = await fetch(
      `${this.url()}/lol-summoner/v1/current-summoner/summoner-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );
    const data = await request.json()
    const dataProfile = await request2.json()

    return {
      ...data,
      ...dataProfile
    }
    
  }

  public getCurrentLobby = async () => {
    const request2 = await fetch(
      `${this.url()}/lol-lobby/v1/custom-games/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );

    const request = await fetch(
      `${this.url()}/lol-lobby/v1/custom-games`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
            "base64",
          )}`,
        },
      },
    );

    

    return request.json()
  }

  public request = async () => {
    const socket = new WebSocket(`wss://${this.address}:${this.port}/`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`riot:${this.password}`).toString(
          "base64",
        )}`,
      },
    });

    socket.on("open", () => {
      // OnJsonApiEvent_lol-gameflow_v1_gameflow-phase <--- DETECTS END OF GAME EVENT
      const temp = "OnJsonApiEvent_lol-lobby_v2_lobby";
      socket.send(JSON.stringify([5, "OnJsonApiEvent_lol-lobby_v2_lobby"]));
    });

    socket.on("message", async (e) => {
      const data = await this.getCurrentLobby()
      for(let i=0; i<data.length; i++) {
        if (Object.values(data[i]).includes("freakszn")) {
          this.mainWindow.webContents.send("send-lobby-id", data[i]["id"])
        }
      }
      return
      const xd = JSON.parse(JSON.stringify(e.toString(), null, 2));
      const today = new Date();
      console.log(
        `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} => ${xd}`,
      );
    });
  };
}
